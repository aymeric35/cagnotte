<template>
  <DaisyAuthRegister :with-credentials="registerUser" :with-google="signInWithGoogle" @register="navigateTo('/')" />
</template>
