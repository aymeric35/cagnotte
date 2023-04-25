<template>
  <header>
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <NuxtLink class="btn btn-ghost normal-case text-xl" to="/">
          Cagnotte Vacances
        </NuxtLink>
      </div>
    </div>
  </header>
  <DaisyAuthLogin
    :with-credentials="signInUser" :with-google="signInWithGoogle"
    :forgot-password="sendForgotPasswordResetEmail" @login="navigateTo('/')"
  />
</template>
