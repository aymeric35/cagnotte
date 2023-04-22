<script setup lang="ts">
const user = useCurrentUser();
const { data, pending } = useFirestoreAPI('users')

const userAmount = computed(() => {
    const username = user?.value?.displayName?.toLowerCase();
    if (data.value && username) {
        return Number(data.value[username].euros).toFixed(2)
    }
})

const callData = () => {
    console.log(data.value);
}
</script>

<template>
    <header>
        <div class="navbar bg-base-300">
            <div class="flex-1">
                <NuxtLink  class="btn btn-ghost normal-case text-xl" to="/">Cagnotte Vacances</NuxtLink>
            </div>
            <div v-if="user" class="flex-none">
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-square btn-ghost m-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-5 h-5 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                            </path>
                        </svg>
                    </label>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <p class="hover:bg-transparent hover:cursor-default">Bonjour {{ user?.displayName }} !</p>
                        </li>
                        <li>
                            <p class="block">Montant dû dans la cagnotte : <span class="font-bold">{{ userAmount }}€</span>
                            </p>
                        </li>
                        <li>
                            <button @click="callData">Call data</button>
                        </li>
                        <li>
                            <NuxtLink to="stats" >Stats</NuxtLink>
                        </li>
                        <li><button @click="signOutUser">Se deconnecter</button></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>