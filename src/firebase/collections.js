import {
    db
} from './config'
import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDoc,
    deleteDoc,
    CollectionReference
} from "firebase/firestore"

export const shops = collection(db, 'shops');
export const products = collection(db, 'products');
export const orders = collection(db, 'orders');

export const create = async (collection, data) => {
    return await addDoc(collection, data)
}

export const update = async (collection, id, data) => {
    const ref = doc(collection, id)
    return await setDoc(ref, data, {
        merge: true
    })
}

export const get = async (collection, id) => {
    const ref = doc(collection, id)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : undefined
}

export const drop = async (collection, id) => {
    const ref = doc(collection, id)
    return await deleteDoc(ref)
}


export const createDocWithId = async (collection, id, data) => {
    await setDoc(doc(collection, id), data).then(() => id)
}