import { collection, doc } from 'firebase/firestore'
export default function useFirestoreAPI() {
    const db = useFirestore();

    const data = useState('data', () => useDocument(doc(collection(db, 'app'), 'data')).data)
    const pending = useState('pending', () => useDocument(doc(collection(db, 'app'), 'data')).pending)

    return { data, pending }
}