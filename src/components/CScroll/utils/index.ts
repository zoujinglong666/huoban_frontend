import {isIOS} from "@vueuse/core";

function getUseTransition() {
  let useTransition = true
  if ( isIOS ) {
    const ua = window.navigator.userAgent
    const version = getIOSVersion ( ua )
    if ( !version ) return useTransition

    if ( version.major >= 13 && version.minor >= 3 ) {
      useTransition = false
    }
  }
  return useTransition
}

function getIOSVersion(ua) {
  const regex = /os (\d\d?_\d(_\d)?)/
  const matches = regex.exec ( ua )
  if ( !matches ) return null
  const parts = matches[1].split ( '_' ).map ( function (item) {
    return parseInt ( item, 10 )
  } )
  return {
    major: parts[0],
    minor: parts[1],
    patch: parts[2] || 0
  }
}

export function camelize(str) {
  str = String ( str )
  return str.replace ( camelizeRE, function (m, c) {
    return c ? c.toUpperCase () : ''
  } )
}

export function getRect(el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

export const USE_TRANSITION = getUseTransition ()

