
export function setup() {
  let cacheLength = 0
  setInterval(() => {
    const nodeList = [...document.querySelectorAll('.entry')]
    if (!nodeList) {
      cacheLength == 0
    } else if (nodeList.length != cacheLength) {
      cacheLength = nodeList.length
      nodeList.forEach(item => {
        item.onclick = (e) => {
          window.open(item.attributes['data-alternate-link'].value, '_blank')
          setTimeout(() => {
            const cloneBtn = document.querySelector('.close-button')
            cloneBtn && cloneBtn.click()
          }, 300)
        }
      })
    }
  }, 1000)
}
