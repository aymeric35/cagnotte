import ToastWrapperComponent from './Wrapper.vue'
import { createComponent } from './helpers';
import eventBus from './bus.js';

import InfoComponent from "./components/info.vue"
import SuccessComponent from "./components/success.vue"
import ErrorComponent from "./components/error.vue"
import WarningComponent from "./components/warning.vue"
import DefaultComponent from "./components/default.vue"


export const useToast = (globalProps = {}) => {
    return {

        custom(element, options = {}) {

            const wrapperPropsData = Object.assign({}, globalProps, options);
            delete wrapperPropsData.props;

            const toast = { dismiss: () => { console.log('Toast "dismiss" not injected') } }

            const childPropsData = Object.assign({}, options?.props || {}, { toast });
            const vNode = h(element, childPropsData)

            const instance = createComponent(ToastWrapperComponent, wrapperPropsData, document.body, { default: () => vNode });

            const dismiss = instance.ctx.dismiss;

            toast.dismiss = dismiss;

            return {
                dismiss
            }
        },
        open(options) {
            let message = null;
            if (typeof options === 'string') {
                message = options;
                return this.default(message)
            }
            message = options.message ?? "";
            let type = options.type ?? 'default';
            delete options.message;

            if (!['success', 'error', 'info', 'warning', 'default'].includes(type)) {
                type = 'default';
            }

            return this[type](message, options)
        },
        clear() {
            eventBus.emit('toast-clear')
        },
        success(message, options = {}) {
            return this.custom(SuccessComponent, { ...options, props: { message } })

        },
        error(message, options = {}) {
            return this.custom(ErrorComponent, { ...options, props: { message } })
        },
        info(message, options = {}) {
            return this.custom(InfoComponent, { ...options, props: { message } })
        },
        warning(message, options = {}) {
            return this.custom(WarningComponent, { ...options, props: { message } })
        },
        default(message, options = {}) {
            return this.custom(DefaultComponent, { ...options, props: { message } })
        }
    }
};