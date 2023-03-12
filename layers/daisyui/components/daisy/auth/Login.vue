<template>
    <DaisyAuthWrapper>

        <template v-slot:title> Mon application </template>


        <!-- Provider section (google) -->

        <template v-if="hasProvider">
            <DaisyAuthGoogleButton @click="continueWithGoogle" :loading="withGoogleLoading"
                :disabled="loginForm.loading || withGoogleLoading">
                Se connecter avec Google
            </DaisyAuthGoogleButton>
            <div class="divider">ou</div>
        </template>

        <!-- Forgot password section -->

        <template v-if="forgotPasswordIsActive">

            <DaisyForm v-model="forgotPasswordForm.valid" :disabled="forgotPasswordForm.loading || form.disabled"
                @submit="submitForgotPasswordForm">
                <DaisyAuthEmailInput v-model="forgotPasswordForm.data.email"></DaisyAuthEmailInput>
                <DaisyAuthSubmitButton :disabled="!forgotPasswordForm.valid || form.disabled"
                    :loading="forgotPasswordForm.loading">
                    Envoyer un mail de réinitialisation
                </DaisyAuthSubmitButton>
            </DaisyForm>
            <label class="label text-xs justify-start space-x-1">
                <DaisyLink @click="forgotPasswordIsActive = false" :disabled="loginForm.loading || form.disabled">
                    Connectez-vous avec un e-mail à la place
                </DaisyLink>
            </label>

        </template>

        <!-- with credentials section -->
        <template v-else>

            <DaisyForm v-model="loginForm.valid" :disabled="loginForm.loading || form.disabled" @submit="submitLoginForm">
                <DaisyAuthEmailInput v-model="loginForm.data.email"></DaisyAuthEmailInput>
                <DaisyAuthPasswordInput v-model="loginForm.data.password"></DaisyAuthPasswordInput>

                <label class="label">
                    <DaisyLink @click="forgotPasswordIsActive = true" :disabled="loginForm.loading || form.disabled">Mot de
                        passe oublié ?
                    </DaisyLink>
                </label>
                <DaisyAuthSubmitButton :disabled="!loginForm.valid || form.disabled" :loading="loginForm.loading">
                    Se connecter
                </DaisyAuthSubmitButton>

            </DaisyForm>

            <label class="label pt-5 text-xs justify-start space-x-1">
                <span>
                    Vous n'avez pas encore de compte ?
                </span>
                <DaisyLink to="/register" :disabled="loginForm.loading || form.disabled">S'inscrire
                </DaisyLink>
            </label>
        </template>

    </DaisyAuthWrapper>
</template>

<script lang="ts" setup>

const { $toast } = useNuxtApp()
const emit = defineEmits(["login"])

interface Props {
    withGoogle?: () => Promise<any>,
    withCredentials: (email: string, password: string) => Promise<any>
    forgotPassword: (email: string) => Promise<any>
}

const props = defineProps<Props>();
const hasProvider = computed(() => !!props.withGoogle);
const forgotPasswordIsActive = ref(false);

const form = reactive({ disabled: false })

const withGoogleLoading = ref(false);

interface FormBase {
    valid: boolean
    loading: boolean
    disabled: boolean
    data: { [key: string]: any }
}

const loginForm = reactive<FormBase>({
    valid: false,
    loading: false,
    data: {
        email: "",
        password: "",
    }
})

const continueWithGoogle = () => {
    if (!props.withGoogle) return Promise.resolve();
    withGoogleLoading.value = true;
    form.disabled = true;
    return props.withGoogle()
        .then(resp => {
            emit("login", resp);
            return resp;
        })
        .catch(err => {
            $toast.error(err.message)
            return err;
        })
        .finally(() => {
            withGoogleLoading.value = false;
            form.disabled = false;
        })
}

const forgotPasswordForm = reactive<FormBase>({
    valid: false,
    loading: false,
    data: {
        email: "",
    }
})

const submitLoginForm = () => {
    loginForm.loading = true;
    return props.withCredentials(loginForm.data.email, loginForm.data.password)
        .then(resp => {
            emit("login", resp);
            return resp;
        })
        .catch(err => {
            $toast.error("Ce compte n'existe pas ou le mot de passe n'est pas correct")
            return err;
        })
        .finally(() => {
            loginForm.loading = false;

        })
}

const submitForgotPasswordForm = () => {
    forgotPasswordForm.loading = true
    return props.forgotPassword(forgotPasswordForm.data.email)
        .then((resp) => {
            // Email sent.
            $toast.success("Email envoyé")
            return resp;
        })
        .catch((err) => {
            $toast.error(err.message)
            return err;
        })
        .finally(() => {
            forgotPasswordForm.data.email = "";
            forgotPasswordForm.loading = false;
            forgotPasswordIsActive.value = false;
        })
}
</script>