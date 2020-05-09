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
  setInterval(() => {
    removeElement('[data-testid="test-ref-div"]', false)
  }, 10000)
} else if (testSite('archive.org')) {
  setupArchive()
} else if (testSite('wekan.tv')) {
  setupWekanTv()
} else if (testSite('youtube.com/watch')) {
  window.onload = setupYoutube
} else if (testSite('youglish.com')) {
  setupYouglish()
}

function testSite(input) {
  return document.location.href.indexOf(input) >= 0
}

function removeElement(selectors, doLoop = true) {
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

    if (!doLoop || Date.now() - startTime > 3000) {
      clearInterval(intervalId)
      console.log('Abort for failing to find element with selectors: ' + selectors)
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
    }, 3000)
  }
}

function setupYoutube() {
  const scripts = [...document.querySelectorAll('script')].filter(node => node.innerText.indexOf('playerCaptionsRenderer":{"baseUrl') > 0)
  if (scripts.length <= 0) {
    console.log('Can not find script with text: "playerCaptionsRenderer..."')
    return
  }

  const matchResult = scripts[0].innerText.match(/"playerCaptionsRenderer":{"baseUrl":"(.*?)",/)
  if (matchResult.length < 2) {
    console.log('Can not parse base url')
    return
  }
  const baseUrl = matchResult[1].replace(/\\u0026/g, '&')
  //tlangs: if enable translation
  const list = baseUrl + '&type=list&asrs=1&tlangs=0'
  const asr = baseUrl + '&type=track&lang=en&kind=asr'
  console.log('baseurl:' + baseUrl)
  console.log('listurl:' + list)
  console.log('asr url:' + asr)

}

function setupYouglish() {
  const content = document.querySelectorAll('.container')[1]
  content.style.position = 'relative'
  content.style.width = '100%'

  content.children[0].children[0].style.width = '100%'

  const ele = document.createElement('div')
  ele.style.position = 'absolute'
  ele.style.right = '0'
  ele.style.top = '140px'
  ele.style.width = '35%'
  content.appendChild(ele)

  const caption = document.querySelector('#captioncont')
  if (caption) {
    ele.appendChild(caption)
  }

  const captionList = document.querySelector('#ac_data')
  if (captionList) {
    captionList.style.maxHeight = '400px'
  }

  const expandBtn = document.querySelector('.beffect_bt.hand.togglecaps')
  if (expandBtn) {
    function expandList() {
      const captionListContainer = document.querySelector('#ac_container')
      if (captionListContainer && captionListContainer.style.display == 'none') {
        expandBtn.click()
      }
    }
    setTimeout(() => {
      expandList()
      setInterval(expandList, 3000)
    }, 1000)
  }

  const videoContainer = content.querySelector('.result_container')
  if (videoContainer) {
    videoContainer.style.width = '65%'
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
        case 37: // <-
          lastOrNextSentence(true)
          break
        case 39: // ->
          lastOrNextSentence(false)
          break
        case 32: // space
          loop()
          break
        default:
          break
      }
    } else {
      switch (key) {
        case 37: // <-
          backStep()
          break;
        case 32: // space
          pausePlay()
          break;
      }
    }
  });

  function adjustSpeed(isSlowDown) {
    if (isSlowDown) {
      document.querySelector('.togglespeed.slower').click()
    } else {
      document.querySelector('.togglespeed.faster').click()
    }
  }

  function backStep() {
    document.querySelector('#b_back').click()
  }

  function pausePlay() {
    document.querySelector('#b_pause').click()
  }

  function loop() {
    document.querySelector('.hand.ac_loopmode').click()
  }

  function lastOrNextSentence(isLast) {
    const list = captionList.children[0].children
    let curInd = -1
    for (let i = 0; i < list.length; i++) {
      if (list[i].className.indexOf('ac_current_cap') >= 0) {
        curInd = i
        break
      }
    }

    if (curInd < 0 || curInd == 0 && isLast || curInd == list.length - 1 && !isLast) {
      return
    }

    const nextInd = curInd + (isLast ? -1 : 1)
    list[nextInd].querySelector('.hand').click()
  }
}