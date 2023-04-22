<script setup lang="ts">
// 'light' | 'dark' is useless, need a better solution
export type ColorPreference = string | 'light' | 'dark'

interface Emits {
  (eventName: 'update:modelValue', modelValue: ColorPreference): void
}

const props = defineProps({
  modelValue: {
    type: String as PropType<ColorPreference>,
    required: true,
    validator: (prop: ColorPreference) => ['light', 'dark'].includes(prop),
  },
  size: {
    type: [Number, String],
    default: 32,
  },
  lightIcon: {
    type: String,
    default: 'material-symbols:light-mode',
  },
  darkIcon: {
    type: String,
    default: 'material-symbols:dark-mode',
  },
})

const emit = defineEmits<Emits>()

const preference = computed({
  set(val: ColorPreference) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})

const checked = computed(() => preference.value === 'light')
function handleInputChange(evt: Event) {
  preference.value = checked.value ? 'dark' : 'light'
}
</script>

<template>
  <button class="btn btn-ghost btn-circle switch-color-mode">
    <label class="swap swap-rotate">

      <!-- this hidden checkbox controls the state -->
      <input :value="checked" type="checkbox" @change="handleInputChange">
      <!-- sun icon -->
      <Suspense>
        <Icon class="swap-off fill-current" :size="size.toString()" :name="lightIcon" />
      </Suspense>

      <!-- moon icon -->
      <Suspense>
        <Icon class="swap-on fill-current" :size="size.toString()" :name="darkIcon" />
      </Suspense>

    </label>
  </button>
</template>

<style lang="scss" scoped>
.switch-color-mode {
  input[type=checkbox] {
    visibility: hidden;
  }
}
</style>
