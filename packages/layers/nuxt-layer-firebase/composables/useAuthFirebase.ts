// https://firebase.google.com/docs/auth/web/start

import type { AuthProvider } from 'firebase/auth'
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export const registerUser = async (email: string, password: string) => {
  const auth = useFirebaseAuth()

  return createUserWithEmailAndPassword(
    auth!,
    email,
    password,
  )
}

export const signInUser = async (email: string, password: string) => {
  const auth = useFirebaseAuth()
  return signInWithEmailAndPassword(auth!, email, password)
}

export const signOutUser = async () => {
  const auth = useFirebaseAuth()
  return auth!.signOut()
}

export const signInWithExternal = async (provider: AuthProvider) => {
  const auth = useFirebaseAuth()
  return signInWithPopup(auth!, provider)
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  return signInWithExternal(provider)
}

export const sendForgotPasswordResetEmail = async (email: string) => {
  const auth = useFirebaseAuth()
  return sendPasswordResetEmail(auth!, email)
}
