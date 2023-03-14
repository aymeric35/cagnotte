<template>
    <DaisyAuthLogin :withCredentials="signInUser" :withGoogle="signInWithGoogle"
        :forgotPassword="sendForgotPasswordResetEmail" @login="navigateTo('/')"></DaisyAuthLogin>
</template>

<script lang="ts" setup>

</script>