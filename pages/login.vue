<template>
    <DaisyAuthLogin :withCredentials="signInUser" :withGoogle="signInWithGoogle"
        :forgotPassword="sendForgotPasswordResetEmail" @login="navigateTo('/')"></DaisyAuthLogin>
</template>