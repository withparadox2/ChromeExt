function removeElement(selectors, doLoop = true) {
  if (typeof selectors == 'string') {
    selectors = [selectors]
  }

  let startTime = Date.now()
  let intervalId = setInterval(() => {
    let elesToRemove = selectors.map(selector => document.querySelector(selector)).filter(item => item != null)
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

function testSite(input) {
  return document.location.href.indexOf(input) >= 0
}

export {
  removeElement,
  copyToClipboard,
  testSite
}