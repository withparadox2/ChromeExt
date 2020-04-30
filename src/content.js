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