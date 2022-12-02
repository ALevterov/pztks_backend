const path = require('path')
const fs = require('fs')
module.exports = function saveImage(image, dir, fileName) {
  const resultDirectory = path.resolve(__dirname, '..', 'static', dir)
  if (!fs.existsSync(resultDirectory)) {
    fs.mkdirSync(resultDirectory)
  }
  image.mv(path.resolve(resultDirectory, fileName))
}
