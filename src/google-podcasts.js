let loopTimes = 0

export function setup() {
  loopTimes++
  const audio = document.querySelector('audio')
  if (!audio) {
    if (loopTimes < 10) {
      setTimeout(setup, 500)
    }
    return
  }
  const link = audio.src
  const a = document.createElement('a')
  document.querySelector('body').appendChild(a)

  a.href = link
  a.innerText = 'Download'
  a.style.position = 'fixed'
  a.style.top = '70px'
  a.style.right = '25px'
  a.style.zIndex = 1000000
  a.target = '_blank'
}
