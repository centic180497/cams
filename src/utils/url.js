export function getSiteURL() {
  let siteURL = ''
  if (window.location.origin) {
    siteURL = window.location.origin
  } else {
    siteURL =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  }

  if (siteURL[siteURL.length - 1] === '/') {
    siteURL = siteURL.substring(0, siteURL.length - 1)
  }

  if (window.basename) {
    siteURL += window.basename
  }

  if (siteURL[siteURL.length - 1] === '/') {
    siteURL = siteURL.substring(0, siteURL.length - 1)
  }

  return siteURL
}
