export function setup() {
  const pre = document.querySelector('pre')
  if (pre) {
    pre.style.margin = '0 auto'
    pre.style.fontFamily = 'consolas'
    pre.style.maxWidth = '600px'
    pre.style.fontSize = '15px'
  }

  let diskEle
  const lastCursorPosition = [0, 0]

  window.onkeydown = function (ev) {
    let key
    if (window.event) {
      key = window.event.keyCode
    } else {
      key = ev.which
    }
    if (key === 17) {
      if (diskEle == null) {
        diskEle = document.createElement('div')
        diskEle.style.position = 'fixed'
        diskEle.style.width = '20px'
        diskEle.style.height = '20px'
        diskEle.style.background = 'rgba(255, 0, 0, 0.3)'
        diskEle.style.borderRadius = '10px'
        diskEle.style.top = 0
        diskEle.style.left = 0
        document.body.appendChild(diskEle)
      }

      if (key) {
        diskEle.style.top = lastCursorPosition[1] - 10 + 'px'
        diskEle.style.left = lastCursorPosition[0] - 10 + 'px'
      }
    }
  }

  window.onscroll = function () {
    if (diskEle != null) {
      document.body.removeChild(diskEle)
      diskEle = null
    }
  }

  document.onmousemove = function (e) {
    lastCursorPosition[0] = e.clientX
    lastCursorPosition[1] = e.clientY
  }
}
