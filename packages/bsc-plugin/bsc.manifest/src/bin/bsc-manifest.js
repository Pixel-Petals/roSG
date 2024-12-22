import fsExtra from 'fs-extra'
import path from 'path'

export function plugin() {
  return {
    name: 'bsc-manifest',
    afterPrepublish: (builder) => {

      const manifest = mergeManifests([
        formatSourceManifest(builder),
        formatBscManifest(builder),
        formatBscExtendedManifests(builder)
      ])

      setEnv(manifest, builder)

      let manifestString = Object.entries(manifest).map(([key, value]) => {

        if (key === 'bs_const') {
          return `bs_const=`
            + Object.entries(value)
              .map(([flagId, flagValue]) => `${flagId}=${flagValue}`)
              .join(';')

        }

        return `${key}=${value}`

      }).join('\n')

      fsExtra.writeFileSync(
        path.join(builder.options.stagingDir, '/manifest'),
        manifestString
      )

    }
  }
}

function setEnv(manifest, builder) {

  if (undefined === builder.options.env) { return manifest }
  if (undefined === manifest.bs_const) { manifest.bs_const = {} }

  const envKey = `ENV_${builder.options.env.toUpperCase()}`
  manifest.bs_const[envKey] = true

}

function mergeManifests(manifests) {

  let manifest = {}

  manifests.flat().forEach(manifestObj => {
    manifest = {
      ...manifest,
      ...manifestObj,
      'bs_const': {
        ...manifest?.bs_const,
        ...manifestObj?.bs_const
      }
    }
  })

  return manifest

}

// Manifest files & objects from bsconfig.json:extendsManifest

function formatBscExtendedManifests(builder) {

  let manifestList = builder.options.extendsManifest || []

  if (typeof manifestList === 'string') {
    manifestList = [manifestList]
  }

  return manifestList.map((extendThis => {

    const manifest = JSON.parse(fsExtra.readFileSync(extendThis))
    return parseManifestObject(manifest)

  }))

}

// Manifest object from bsconfig.json:manifest

function formatBscManifest(builder) {
  return parseManifestObject(builder.options.manifest)
}

// Manifest object from the manifest file

function formatSourceManifest(builder) {

  let manifest = Object.fromEntries((builder.program._manifest || []))
  return parseManifestObject(manifest)

}

function parseManifestObject(manifestObj) {

  // during parse, we must trim key and value strings
  // must perform this step because manifest entries with spaces are ingested incorrectly

  // e.g. this: 'key = value'
  // produces ['key ', ' value']
  // when we expect ['key', 'value']

  return Object.entries(manifestObj).reduce((obj, [key, value]) => {
    key = key.trim()

    const isBSConstAttribute = (key == 'bs_const')
    const isString = (typeof value === 'string')

    if (isBSConstAttribute) {

      if (isString) {

        obj[key] = value.split(';')
          .reduce((obj, flag) => {

            const keyValue = flag.split('=')
            const key = keyValue[0].trim()
            const value = (keyValue[1].trim().toLowerCase() === 'true')

            obj[key] = value
            return obj

          }, {})

      } else {
        obj[key] = value

      }

    } else {

      obj[key] = value.trim()

    }

    return obj
  }, {}
  )

}