<template>
    <div>
        Hello {{ user?.displayName }}
        <button class="btn" @click="signOutUser"> Se deconnecter</button>
    </div>
</template>

<script setup lang="ts">

const user = useCurrentUser()

</script>

<style scoped></style>