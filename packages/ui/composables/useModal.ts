import type { VNodeRef } from 'vue'

export default function useDaisyModal() {
  const opened = useState<number>('ModalOpened', () => 0)

  const handleOpenModal = (element: HTMLElement | VNodeRef) => {
    // @ts-expect-error blablabla
    element.style['z-index'] = 40 + opened.value
    opened.value += 1
    // When the modal is shown, we want a fixed body
    if (opened.value <= 1) {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
    }
  }

  const handleCloseModal = () => {
    opened.value -= 1
    if (opened.value <= 0) {
      // When the modal is hidden, we want to remain at the top of the scroll position
      document.body.style.position = ''
      document.body.style.top = ''
    }
  }

  return { handleOpenModal, handleCloseModal }
}
