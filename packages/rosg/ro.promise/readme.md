
# Promises

This is a Promise-like implementation for Roku/BrightScript.

## Installation

### Using ropm

You can install this package with [ropm](https://www.npmjs.com/package/ropm) (Roku package manager).

```bash
npx ropm install promises@npm:@rosg/promises
```

(`npx` allows you to run `ropm` without installing it as a dependency)

### Manual Installation

1. Download the latest `promise.zip` file from releases and extract the zip.
2. Copy the files from `components` into your `pkg:/components` folder.
3. Copy the files from `source` into your `pkg:/source` directory.
    - By adding these files to `pkg:/source`, you will be able to use the promises namespace in the main thread (which begins in your `main.brs` file). If this is not important to you, you can instead copy the `source` folder to wherever you prefer.

To use the promise namespace in a component, you will need to import the `pkg:/source/promise.brs` file:

#### importing with [vanilla roku/brightscript](https://developer.roku.com/en-ca/docs/references/scenegraph/xml-elements/script.md)

```xml
<?xml version="1.0" encoding="UTF-8"?>

<component name="YourComponent">
  <script type="text/brightscript" uri="pkg:/source/promise.brs" />
</component>
```

#### importing with [brighterscript imports](https://github.com/rokucommunity/brighterscript/blob/master/docs/imports.md)

```brightscript
  import "pkg:/source/promise.brs"
```
