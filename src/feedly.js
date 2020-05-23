
export function setup() {
  let cacheLength = 0
  setInterval(() => {
    const nodeList = [...document.querySelectorAll('.entry')]
    if (nodeList.length != cacheLength) {
      cacheLength = nodeList.length
      nodeList.forEach(item => {
        if (item.className.indexOf('unread') < 0) {
          item.querySelector('.title').style.color = 'blue'
        }
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
