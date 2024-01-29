import * as abortSignalTimeout from './abortsignal-timeout.js'
import * as clipboardItem from './clipboarditem.js'
import * as elementCheckVisibility from './element-checkvisibility.js'
import * as navigatorClipboard from './navigator-clipboard.js'
import * as requestIdleCallback from './requestidlecallback.js'

export const baseSupport =
  typeof globalThis === 'object' &&
  // ES2019
  'fromEntries' in Object &&
  'flatMap' in Array.prototype &&
  'trimEnd' in String.prototype &&
  // ES2020
  'allSettled' in Promise &&
  'matchAll' in String.prototype &&
  // ES2021
  'replaceAll' in String.prototype &&
  'any' in Promise &&
  // ES2022
  'at' in String.prototype &&
  'at' in Array.prototype &&
  'hasOwn' in Object &&
  // ESNext
  'abort' in AbortSignal &&
  // 'timeout' in AbortSignal && // Polyfilled
  // DOM / HTML and other specs
  typeof queueMicrotask === 'function' &&
  typeof HTMLDialogElement === 'function' &&
  typeof AggregateError === 'function' &&
  typeof BroadcastChannel === 'function' &&
  'randomUUID' in crypto &&
  'replaceChildren' in Element.prototype &&
  'requestSubmit' in HTMLFormElement.prototype &&
  // 'requestIdleCallback' in window && // Polyfilled
  true

export const polyfills = {
  abortSignalTimeout,
  clipboardItem,
  elementCheckVisibility,
  navigatorClipboard,
  requestIdleCallback,
}

export function isSupported() {
  return baseSupport && Object.values(polyfills).every(polyfill => polyfill.isSupported())
}

export function isPolyfilled() {
  return Object.values(polyfills).every(polyfill => polyfill.isPolyfilled())
}

export function apply() {
  for (const polyfill of Object.values(polyfills)) {
    polyfill.apply()
  }
}
