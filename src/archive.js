export function setup() {
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