export function setup() {
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
    let consumed = true

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
          consumed = false
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
        default:
          consumed = false
          break
      }
    }

    if (consumed) {
      ev.preventDefault()
      ev.stopPropagation()
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