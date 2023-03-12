export function injectProp<T>(target: any, propName: string, get?: () => T, set?: (value: T) => void) {
    Object.defineProperty(target, propName, {
        get,
        set,
        enumerable: true
    })
    return target
}


type Props<T> = {
    [key: string]: () => T
}

export function injectMultipleProps<T>(target: any, props: Props<T>) {
    for (const key in props) {
        injectProp<T>(target, key, props[key])
    }
    return target
}
