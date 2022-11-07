export const getDateFormated = date => {
  const _date = new Date(date)
  const day = _date.getDate()
  const month = _date.getMonth() + 1
  const year = _date.getFullYear()

  return `${parseInt(day) >= 10 ? day : `0${day}`}.${parseInt(month) >= 10 ? month : `0${month}`}.${year}`
}

export const isBrowser = () => typeof window !== "undefined"

export const sleep = delay => {
  // add ms millisecond timeout before promise resolution
  return new Promise(resolve => setTimeout(resolve, delay))
}

export const getURLParams = () => {
  if (!isBrowser()) return

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  return urlParams
}

export const getURL = () => {
  if (!isBrowser()) return

  return window.location
}