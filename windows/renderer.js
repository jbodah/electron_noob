const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const path = require('path')

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', event => {
  console.log('test')
  const modalPath = path.join('file://', __dirname, 'modal.html')
  let win = new BrowserWindow({width: 400, height: 320})
  win.loadURL(modalPath)
  win.show()
})

let win = remote.getCurrentWindow()
win.on('resize', updateWindowStats)
win.on('move', updateWindowStats)

function updateWindowStats () {
  console.log('yo')
  const windowStats = document.getElementById('window-stats')
  const msg = `Size: ${win.getSize()} Pos: ${win.getPosition()}`
  windowStats.innerText = msg
}
