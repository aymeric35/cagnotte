<template>
  <DaisyAuthLogin
    :with-credentials="signInUser" :with-google="signInWithGoogle"
    :forgot-password="sendForgotPasswordResetEmail" @login="navigateTo('/')"
  />
</template>
