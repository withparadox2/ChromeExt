export function setup(consumedTime) {
  const speedEle = document.querySelector('.vjs-speed-button__control-list')
  if (!speedEle) {
    if (consumedTime == null) {
      consumedTime = 0
    }

    if (consumedTime < 10000) {
      setTimeout(() => {
        setup(consumedTime + 1000)
      }, 1000)
    }
    return
  }

  window.onkeydown = (function (ev) {
    let key
    let isShift
    if (window.event) {
      key = window.event.keyCode
      isShift = !!window.event.shiftKey
    } else {
      key = ev.which
      isShift = !!ev.shiftKey
    }
    console.log(key + ' ' + isShift)
    if (isShift) {
      switch (key) {
        case 16: // ignore shift key
          break
        case 188: // <
          adjustSpeed(true)
          break
        case 190: // >
          adjustSpeed(false)
          break
        default:
          break
      }
    }
  });

  function adjustSpeed(isSlow) {
    let nextIndex = -1;
    [...speedEle.children].forEach((item, index) => {
      if (item.className.indexOf('selection') >= 0) {
        nextIndex = index
      }
    })

    if (nextIndex < 0) {
      return
    }

    if (isSlow) {
      nextIndex = nextIndex + 1
    } else {
      nextIndex = nextIndex - 1
    }

    if (nextIndex < 0 || nextIndex >= speedEle.children.length) {
      return
    }

    speedEle.children[nextIndex].click()

    showSpeed(speedEle.children[nextIndex].innerText)
  }

  let timeoutId
  function showSpeed(speed) {
    const cover = document.querySelector('#vjs-cover')
    if (cover.querySelector('div.showSpeed') == null) {
      const ele = document.createElement('div')
      ele.style.position = 'absolute'
      ele.style.padding = '10px 20px'
      ele.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      ele.style.borderRadius = '4px'
      ele.style.fontSize = '18px'
      ele.style.color = 'white'
      ele.style.visibility = 'hidden'
      ele.style.left = '50%'
      ele.style.top = '30%'
      ele.style.transform = 'translation(-50%, -50%)'
      ele.className = 'showSpeed'
      cover.appendChild(ele)
    }
    var showEle = cover.querySelector('div.showSpeed')
    showEle.innerText = speed
    showEle.style.visibility = 'visible'

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      showEle.style.visibility = 'hidden'
    }, 3000)
  }
}
