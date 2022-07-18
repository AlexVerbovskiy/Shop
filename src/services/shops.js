import {
    shops,
    create
} from "../firebase/collections";
import {
    query,
    where,
    getDocs,
    documentId
} from "firebase/firestore";

export const createShop = async ({
    name,
    address,
    coords
}) => {
    const {
        id
    } = await create(shops, {
        name,
        address,
        coords
    });
    return {
        id,
        name
    };
}

export const getShops = async () => {
    const snap = await getDocs(query(shops))
    const result = [];
    snap.forEach(doc => result.push({
        ...doc.data(),
        id: doc.id
    }));
    return result;
}

export const getShopById = async (id) => {
    const snap = await getDocs(query(shops, where(documentId(), "==", id)))
    let result = null;
    snap.forEach(doc => result = ({
        ...doc.data(),
        id: doc.id
    }));
    return result;
}