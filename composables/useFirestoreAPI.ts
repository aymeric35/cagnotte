import { collection, doc } from 'firebase/firestore'
export default function useFirestoreAPI(document: string) {
    const db = useFirestore();

    const { data, pending } = useDocument(doc(collection(db, 'app'), document))

    return { data, pending }
}