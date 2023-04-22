import {
  VueFire,
} from 'vuefire'
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
import {
  connectFunctionsEmulator,
  getFunctions,
} from 'firebase/functions'
import type { FirebaseApp } from '@firebase/app-types'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import {
  defineNuxtPlugin,
  useAppConfig,
} from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()

  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp

  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(getAuth(firebaseApp), 'http://localhost:9099')
    connectFirestoreEmulator(getFirestore(firebaseApp), 'localhost', 8080)
    connectDatabaseEmulator(getDatabase(firebaseApp), 'localhost', 8081)
    connectStorageEmulator(getStorage(firebaseApp), 'localhost', 9199)
    connectFunctionsEmulator(getFunctions(firebaseApp), 'localhost', 5001)
  }

  nuxtApp.vueApp.use(VueFire, { firebaseApp })
})
