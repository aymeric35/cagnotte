export default function (fn: () => any, wait = 250, immediate?: boolean) {
  let timer: NodeJS.Timeout | null = null

  function debounced(...args: any[]) {
    const later = () => {
      timer = null
      if (immediate !== true) {
        // @ts-expect-error blabla
        return fn.apply(this, args)
      }
    }

    if (timer !== null) {
      clearTimeout(timer)
    }
    else if (immediate === true) {
      // @ts-expect-error blabla
      return fn.apply(this, args)
    }

    timer = setTimeout(later, wait)
  }

  debounced.cancel = () => {
    timer !== null && clearTimeout(timer)
  }

  return debounced
}
