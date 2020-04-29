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
} else if (testSite('archive.org')) {
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