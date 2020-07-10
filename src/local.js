export function setup() {
  const pre = document.querySelector('pre')
  if (pre) {
    pre.style.margin = '0 auto'
    pre.style.fontFamily = 'consolas'
    pre.style.maxWidth = '600px'
    pre.style.fontSize = '15px'
  }
}
