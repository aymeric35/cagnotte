import {
    VueFire,
    useSSRInitialState,
} from 'vuefire'
import {
    defineNuxtPlugin,
    useAppConfig,
} from '#app'
import {
    connectAuthEmulator,
    getAuth,
} from 'firebase/auth'
import {
    connectFirestoreEmulator,
    getFirestore,
} from 'firebase/firestore'
import {
    connectDatabaseEmulator,
    getDatabase,
} from 'firebase/database'

export default defineNuxtPlugin((nuxtApp) => {
    const appConfig = useAppConfig()

    const firebaseApp = nuxtApp.$firebaseApp

    if (process.env.NODE_ENV === "development") {
        connectAuthEmulator(getAuth(firebaseApp), "http://localhost:9099");
        connectFirestoreEmulator(getFirestore(firebaseApp), 'localhost', 8080)
        connectDatabaseEmulator(getDatabase(firebaseApp), 'localhost', 8081)
    }

    nuxtApp.vueApp.use(VueFire, { firebaseApp })

})
