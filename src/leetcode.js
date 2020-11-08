export function setup() {
  const items = document.querySelectorAll('tbody a')
  if (!items || items.length == 0) {
    setTimeout(setup, 1000);
  } else {
    [...items].forEach((item) => {
      item.parentElement.onclick = (e) => {
        e.stopPropagation()
      }
      item.setAttribute('target', '_blank')
    })
  }
}
