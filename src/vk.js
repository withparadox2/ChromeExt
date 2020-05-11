import { copyToClipboard } from './utils'

export function setup() {
  const ele = document.querySelector('#iframe') || document.querySelector('#plugin')
  if (ele) {
    copyToClipboard(ele.src)
    window.close()
  }
}