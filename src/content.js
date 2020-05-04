if (testSite('nytimes.com')) {
  removeElement('[data-testid="expanded-dock"]')
} else if (testSite('theatlantic.com')) {
  removeElement(['.c-nudge__container', '.c-non-metered-nudge'])
} else if (testSite('vk.com/doc')) {
  const ele = document.querySelector('#iframe') || document.querySelector('#plugin')
  if (ele) {
    copyToClipboard(ele.src)
    window.close()
  }
} else if (testSite('spotify.com')) {
  removeElement('[data-testid="test-ref-div"]')
} else if (testSite('archive.org')) {
  setupArchive()
} else if (testSite('wekan.tv')) {
  setupWekanTv()
}

function testSite(input) {
  return document.location.href.indexOf(input) >= 0
}

function removeElement(selectors) {
  if (typeof selectors == 'string') {
    selectors = [selectors]
  }

  var startTime = Date.now()
  var intervalId = setInterval(() => {
    var elesToRemove = selectors.map(selector => document.querySelector(selector)).filter(item => item != null)
    if (elesToRemove.length > 0) {
      elesToRemove.forEach(ele => {
        ele.parentElement.removeChild(ele)
      })

      clearInterval(intervalId)
    }

    if (Date.now() - startTime > 80000) {
      clearInterval(intervalId)
      console.log('Abort for failing to find element with selector: ' + selector)
    }
  }, 300)
}

function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function setupArchive() {
  if (document.location.href.indexOf('.txt') < 0) {
    return
  }

  const preEle = document.querySelector('.container pre')
  var progressEle = null;

  document.addEventListener('scroll', () => {
    updateView(calPercent())
    savePosition()
  })

  restorePosition()
  updateView(calPercent())

  function calPercent() {
    const preEleShowBottom = document.scrollingElement.clientHeight - preEle.getBoundingClientRect().top
    var percent = preEleShowBottom / preEle.clientHeight
    if (percent > 1) {
      percent = 1
    }
    return (percent * 100).toFixed(2)
  }

  function updateView(percent) {
    if (progressEle == null) {
      progressEle = document.createElement("div")
      document.querySelector('#maincontent').appendChild(progressEle)

      progressEle.style.position = 'fixed'
      progressEle.style.right = (preEle.getBoundingClientRect().left + 10) + 'px'
      progressEle.style.bottom = '10px'
      progressEle.style.fontSize = '20px'

      window.addEventListener('resize', () => {
        progressEle.style.right = (preEle.getBoundingClientRect().left + 10) + 'px'
      })
    }
    progressEle.innerText = percent
  }

  function savePosition() {
    window.localStorage.setItem(document.location.href, document.scrollingElement.scrollTop)
  }

  function restorePosition() {
    document.scrollingElement.scrollTop = window.localStorage.getItem(document.location.href) || 0
  }
}

function setupWekanTv(consumedTime) {
  const speedEle = document.querySelector('.vjs-speed-button__control-list')
  if (!speedEle) {
    if (consumedTime == null) {
      consumedTime = 0
    }

    if (consumedTime < 10000) {
      setTimeout(() => {
        setupWekanTv(consumedTime + 1000)
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
    }, 1000)
  }
}