<script>
import { defineComponent, render } from 'vue'
import { removeElement } from './helpers.ts'
import Timer from './timer.ts'
import Positions from './positions.ts'
import eventBus from './bus.ts'

export default defineComponent({
  name: 'Toast',
  props: {
    position: {
      type: String,
      default: Positions.BOTTOM_RIGHT,
      validator(value) {
        return Object.values(Positions).includes(value)
      },
    },
    duration: {
      type: Number,
      default: 3000,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    onDismiss: {
      type: Function,
      default: () => { },
    },
    onClick: {
      type: Function,
      default: () => { },
    },
    queue: Boolean,
    pauseOnHover: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isActive: false,
      parent: null,
      isHovered: false,
    }
  },
  beforeMount() {
    this.setupContainer()
  },
  mounted() {
    this.showNotice()
    eventBus.on('toast-clear', this.dismiss)
  },
  beforeUnmount() {
    eventBus.off('toast-clear', this.dismiss)
  },
  methods: {
    setupContainer() {
      const toastWrapperClasses = ['toast', 'w-max']
      switch (this.position) {
        case Positions.TOP:
          toastWrapperClasses.push('toast-center', 'toast-top', 'items-center')
          break
        case Positions.TOP_RIGHT:
          toastWrapperClasses.push('toast-start', 'toast-top', 'items-start')
          break
        case Positions.TOP_LEFT:
          toastWrapperClasses.push('toast-end', 'toast-top', 'items-end')
          break
        case Positions.BOTTOM:
          toastWrapperClasses.push(
            'toast-center',
            'toast-bottom',
            'items-center',
          )
          break
        case Positions.BOTTOM_RIGHT:
          toastWrapperClasses.push('toast-start', 'toast-bottom', 'items-start')
          break
        case Positions.BOTTOM_LEFT:
          toastWrapperClasses.push('toast-end', 'toast-bottom', 'items-end')
          break
      }

      this.parent = document.querySelector(
        toastWrapperClasses.map(val => `.${val}`).join(''),
      )
      // No need to create them, they already exists
      if (this.parent)
        return

      if (!this.parent) {
        this.parent = document.createElement('div')
        this.parent.className = toastWrapperClasses.join(' ')
        this.parent.style['z-index'] = 50
      }

      const container = document.body
      container.appendChild(this.parent)
    },

    shouldQueue() {
      if (!this.queue)
        return false

      return this.parent.childElementCount > 0
    },

    dismiss() {
      if (this.timer)
        this.timer.stop()
      clearTimeout(this.queueTimer)
      this.isActive = false

      // Timeout for the animation complete before destroying
      setTimeout(() => {
        // eslint-disable-next-line prefer-rest-params
        this.onDismiss.apply(null, arguments)

        const wrapper = this.$refs.root
        // unmount the component
        render(null, wrapper)
        removeElement(wrapper)
      }, 150)
    },

    showNotice() {
      if (this.shouldQueue()) {
        // Call recursively if it should queue
        this.queueTimer = setTimeout(this.showNotice, 250)
        return
      }
      const wrapper = this.$refs.root.parentElement
      this.parent.insertAdjacentElement('afterbegin', this.$refs.root)
      removeElement(wrapper)

      this.isActive = true

      if (this.duration) {
        this.timer = new Timer(this.dismiss, this.duration)
      }
    },

    whenClicked() {
      // eslint-disable-next-line prefer-rest-params
      this.onClick.apply(null, arguments)
      if (!this.dismissible)
        return
      this.dismiss()
    },

    toggleTimer(newVal) {
      if (!this.pauseOnHover || !this.timer)
        return
      newVal ? this.timer.pause() : this.timer.resume()
    },
  },
})
</script>

<template>
  <Transition>
    <div v-show="isActive" ref="root" role="alert" class="toast-wrapper z-50" @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)" @click="whenClicked">
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-leave-to {
  opacity: 0;
}

.toast-wrapper {
  width: fit-content;
}
</style>
