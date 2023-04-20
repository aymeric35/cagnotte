import { collection, doc } from 'firebase/firestore'
export default function useFirestoreAPI() {
    const db = useFirestore();

    const { data, pending } = useDocument(doc(collection(db, 'app'), 'data'))

    return { data, pending }
}
    // const api = useState('data', () => ({ pending: true, data: null }))
    // return useDocument(doc(collection(db, 'app'), 'data'), { target: api })