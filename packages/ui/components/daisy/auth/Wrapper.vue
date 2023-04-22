<template>
  <div class="hero min-h-screen bg-base-300">
    <div class="hero-content text-center w-full min-w-[25vw] max-w-[550px]">
      <div class="w-full">
        <div class="mb-3 text-xl">
          <slot name="title">
            Mon application
          </slot>
        </div>
        <div class="card w-full shadow-xl bg-base-100 sm:pa-xl">
          <div class="card-body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
