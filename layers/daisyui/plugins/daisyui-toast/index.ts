import { useToast } from "./api";

export interface ActiveToast {
    dismiss(): void
}

export type DaisyToastType = "info" | "error" | "success" | "warning" | "default";

export type DaisyToastPosition = "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface ToastPropsWithMessage extends ToastProps {
    message: string;
}

export interface ToastProps {
    props?: Object,
    type?: DaisyToastType | string,
    position?: DaisyToastPosition,
    duration?: number,
    dismissible?: boolean,
    queue?: boolean,
    pauseOnHover?: boolean,
    onClick?: () => any,
    onDismiss?: () => any,
}

export interface ToastPluginApi {
    custom(element: any, options?: Omit<ToastProps, "type">): ActiveToast

    open(message: string): ActiveToast

    open(options: Omit<ToastPropsWithMessage, "props">): ActiveToast

    success(message: string, options?: Omit<ToastProps, "props" | "type">): ActiveToast

    error(message: string, options?: Omit<ToastProps, "props" | "type">): ActiveToast

    info(message: string, options?: Omit<ToastProps, "props" | "type">): ActiveToast

    warning(message: string, options?: Omit<ToastProps, "props" | "type">): ActiveToast

    default(message: string, options?: Omit<ToastProps, "props" | "type">): ActiveToast

    clear(): void
}



export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    return {
        provide: {
            toast: useToast({ position: 'bottom' }) as ToastPluginApi
        }
    }
})