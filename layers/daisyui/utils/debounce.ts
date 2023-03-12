export default function (fn: () => any, wait: number = 250, immediate?: boolean) {
    let timer: NodeJS.Timeout | null = null

    function debounced(/* ...args */) {
        const args = arguments

        const later = () => {
            timer = null
            if (immediate !== true) {
                fn.apply(this, args)
            }
        }

        if (timer !== null) {
            clearTimeout(timer)
        }
        else if (immediate === true) {
            fn.apply(this, args)
        }

        timer = setTimeout(later, wait)
    }

    debounced.cancel = () => {
        timer !== null && clearTimeout(timer)
    }

    return debounced
}
