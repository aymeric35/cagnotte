<template>
    <teleport to="body">
        <div class="modal-wrapper" :data-theme="theme">
            <input v-model="dialog" type="checkbox" class="modal-toggle" />
            <slot name="modal-wrapper">
                <component :ref="(el: HTMLElement) => (modalComponent = el)" :is="componentType"
                    :class="modalClassComputed">
                    <component :is="componentType" :class="modalBoxClassComputed" for="">
                        <slot>
                            <h3 class="font-bold text-lg">
                                This is the default slot for the DaisyModal component
                            </h3>
                            <div class="py-4">
                                see DaisyUI doc or this comp in
                                [...]/layers/daisyui/components/Modal.vue
                            </div>
                            <slot name="modal-action">
                                <div class="modal-action">
                                    <button @click="dialog = false" class="btn">Yay!</button>
                                </div>
                            </slot>
                        </slot>
                    </component>
                </component>
            </slot>
        </div>
    </teleport>
</template>

<script setup lang="ts">
// @see https://nuxt.com/docs/api/components/teleports

const emit = defineEmits()
const modalComponent: Ref<HTMLElement> = ref(null)

interface Props {
    modelValue: boolean
    theme?: string
    persistent?: boolean
    modalBoxClass?: string | string[] | { [key: string]: string }
    modalClass?: string | string[] | { [key: string]: string }
}

const props = withDefaults(defineProps<Props>(), {
    theme: '',
    modalBoxClass: '',
    modalClass: '',
    persistent: true
})

const dialog = computed({
    set(val) {
        emit('update:modelValue', val)
    },
    get() {
        return props.modelValue
    }
})

const { handleOpenModal, handleCloseModal } = useDaisyModal()

watch(dialog, (val, old) => {
    if (val !== old) {
        if (!val) {
            handleCloseModal()
        } else {
            handleOpenModal(modalComponent.value)
        }
    }
})

const componentType = computed(() => (props.persistent ? 'div' : 'label'))

const modalClassComputed = computed(() => {
    const persistentCase = props.persistent ? '' : 'cursor-pointer'
    return `modal ${persistentCase} ${props.modalClass}`.replace(/\s+/g, ' ')
})

const modalBoxClassComputed = computed(() => {
    const persistentCase = props.persistent ? '' : 'relative'
    return `modal-box ${persistentCase} ${props.modalBoxClass}`.replace(
        /\s+/g,
        ' '
    )
})
</script>

<style scoped></style>
