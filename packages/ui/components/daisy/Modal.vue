<script setup lang="ts">
import type { VNodeRef } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  theme: '',
  modalBoxClass: '',
  modalClass: '',
  persistent: true,
})
const emit = defineEmits<Emits>()
interface Emits {
  (eventName: 'update:modelValue', modelValue: boolean): void
}

const modalComponent: Ref<VNodeRef | null> = ref(null)

interface Props {
  modelValue: boolean
  theme?: string
  persistent?: boolean
  modalBoxClass?: string | string[] | { [key: string]: string }
  modalClass?: string | string[] | { [key: string]: string }
}

const dialog = computed({
  set(val: boolean) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})

const { handleOpenModal, handleCloseModal } = useModal()

watch(dialog, (val, old) => {
  if (val !== old && modalComponent.value) {
    if (!val) {
      handleCloseModal()
    }
    else {
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
    ' ',
  )
})
</script>

<template>
  <teleport to="body">
    <div class="modal-wrapper" :data-theme="theme">
      <input v-model="dialog" type="checkbox" class="modal-toggle">
      <slot name="modal-wrapper">
        <component :is="componentType" :ref="(el: VNodeRef) => (modalComponent = el)" :class="modalClassComputed">
          <component :is="componentType" :class="modalBoxClassComputed" for="">
            <slot>
              <h3 class="font-bold text-lg">
                This is the default slot for the Modal component
              </h3>
              <div class="py-4">
                see packages/ui/components/daisy/Modal.vue
              </div>
              <slot name="modal-action">
                <div class="modal-action">
                  <button class="btn" @click="dialog = false">
                    Yay!
                  </button>
                </div>
              </slot>
            </slot>
          </component>
        </component>
      </slot>
    </div>
  </teleport>
</template>
