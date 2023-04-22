<script lang="ts" setup>
const props = defineProps<Props>()
const emit = defineEmits(['register'])
const { $toast } = useNuxtApp()
interface Props {
  withGoogle?: () => Promise<any>
  withCredentials: (email: string, password: string) => Promise<any>
}

interface FormBase {
  valid: boolean
  loading: boolean
  disabled: boolean
  data: { [key: string]: any }
}

const registerForm = reactive<FormBase>({
  valid: false,
  loading: false,
  disabled: false,
  data: {
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const hasProvider = computed(() => !!props.withGoogle)

const withGoogleLoading = ref(false)

const continueWithGoogle = () => {
  if (!props.withGoogle)
    return Promise.resolve()
  withGoogleLoading.value = true
  registerForm.disabled = true
  return props.withGoogle()
    .then((resp) => {
      emit('register', resp)
      return resp
    })
    .catch((err) => {
      $toast.error(err.message)
      return err
    })
    .finally(() => {
      withGoogleLoading.value = false
      registerForm.disabled = false
    })
}

const submitRegisterForm = () => {
  registerForm.loading = true
  return props.withCredentials(registerForm.data.email, registerForm.data.password)
    .then((resp) => {
      emit('register', resp)
      return resp
    })
    .catch((err) => {
      $toast.error(err.message)
      return err
    })
    .finally(() => {
      registerForm.loading = false
    })
}
</script>

<template>
  <DaisyAuthWrapper>
    <template #title>
      Mon application
    </template>

    <!-- Provider section (google) -->
    <template v-if="hasProvider">
      <DaisyAuthGoogleButton :loading="withGoogleLoading" :disabled="registerForm.loading || withGoogleLoading"
        @click="continueWithGoogle">
        S'inscrire avec Google
      </DaisyAuthGoogleButton>
      <div class="divider">
        ou
      </div>
    </template>

    <!-- with credentials section -->
    <DaisyForm v-model="registerForm.valid" :disabled="registerForm.loading || registerForm.disabled"
      @submit="submitRegisterForm">
      <DaisyAuthEmailInput v-model="registerForm.data.email" />
      <DaisyAuthPasswordInput v-model="registerForm.data.password" />
      <DaisyAuthPasswordInput v-model="registerForm.data.confirmPassword"
        :should-be-equals-to="registerForm.data.password" />

      <DaisyAuthSubmitButton :disabled="!registerForm.valid || registerForm.disabled" :loading="registerForm.loading">
        S'inscrire
      </DaisyAuthSubmitButton>
    </DaisyForm>
    <label class="label text-xs justify-start space-x-1">
      <span>
        Vous avez déjà un compte ?
      </span>
      <DaisyLink to="/login" :disabled="registerForm.loading || registerForm.disabled">Se connecter
      </DaisyLink>
    </label>
  </DaisyAuthWrapper>
</template>
