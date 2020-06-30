const fs = require('fs')
const path = require('path')

const ChromeExtension = require('crx')

const crx = new ChromeExtension({
  codebase: 'http://localhost:8000/myExtension.crx',
  privateKey: fs.readFileSync('./ChromeExt.pem'),
})

crx
  .load(path.resolve(__dirname, './dist'))
  .then((crx) => crx.pack())
  .then((crxBuffer) => {
    fs.writeFile('./ChromeExt.crx', crxBuffer, () => {
      console.log('Package ChromeExt.crx success!')
    })
  })
  .catch((err) => {
    console.error(err)
  })
