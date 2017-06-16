const remote = require('electron').remote
const BrowserWindow = remote.BrowserWindow
const path = require('path')

const newWindowBtn = document.getElementById('new-window')
const focusBtn = document.getElementById('focus-modal')

newWindowBtn.addEventListener('click', event => {
  console.log('test')
  const modalPath = path.join('file://', __dirname, 'modal.html')
  let win = new BrowserWindow({width: 400, height: 320})
  win.loadURL(modalPath)
  win.show()

  // Focus/Blur events
  win.on('focus', hideFocusBtn)
  win.on('blur', showFocusBtn)
  function showFocusBtn (btn) {
    if (!win) return
    focusBtn.classList.add('smooth-appear')
    focusBtn.classList.remove('disappear')
    focusBtn.addEventListener('click', clickHandler)
  }
  function hideFocusBtn () {
    focusBtn.classList.add('disappear')
    focusBtn.classList.remove('smooth-appear')
    focusBtn.removeEventListener('click', clickHandler)
  }
  function clickHandler () {
    win.focus()
  }
})

// Move/Resize events
let win = remote.getCurrentWindow()
win.on('resize', updateWindowStats)
win.on('move', updateWindowStats)

function updateWindowStats () {
  const windowStats = document.getElementById('window-stats')
  const msg = `Size: ${win.getSize()} Pos: ${win.getPosition()}`
  windowStats.innerText = msg
}
