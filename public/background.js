chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (details.url.indexOf('ts=') >= 0) {
      return {
        redirectUrl: null,
      }
    }
    const hasQuestionMark = details.url.indexOf('?') >= 0
    return {
      redirectUrl: details.url + `${hasQuestionMark ? '&' : '?'}ts=2`,
    }
  },
  {
    urls: ['*://github.com/*'],
  },
  ['blocking']
)
