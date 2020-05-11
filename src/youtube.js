function init() {
  const scripts = [...document.querySelectorAll('script')].filter(node => node.innerText.indexOf('playerCaptionsRenderer":{"baseUrl') > 0)
  if (scripts.length <= 0) {
    console.log('Can not find script with text: "playerCaptionsRenderer..."')
    return
  }

  const matchResult = scripts[0].innerText.match(/"playerCaptionsRenderer":{"baseUrl":"(.*?)",/)
  if (matchResult.length < 2) {
    console.log('Can not parse base url')
    return
  }
  const baseUrl = matchResult[1].replace(/\\u0026/g, '&')
  //tlangs: if enable translation
  const list = baseUrl + '&type=list&asrs=1&tlangs=0'
  const asr = baseUrl + '&type=track&lang=en&kind=asr'
  console.log('baseurl:' + baseUrl)
  console.log('listurl:' + list)
  console.log('asr url:' + asr)
}

export function setup() {
  window.onload = init
}