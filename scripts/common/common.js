const path = require('path')

exports.logCall = (running, at) => {
  console.log(`${path.basename(at)} => ${path.basename(running)}`)
}