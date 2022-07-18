import { products, create} from "../firebase/collections";
import { query, where, getDocs, documentId } from "firebase/firestore";
import {getRndStr} from "../utils";
import { uploadFile } from "../firebase/storage"

export const createProduct = async ({name, image, idShop, price}) => {
    const rnd = getRndStr();
    const url = await uploadFile(image, rnd);
    const { id } = await create(products, {name, url, idShop, price});
    return id;
}

export const getAllProducts = async () => {
    const snap = await getDocs(query(products))
    const result = [];
    snap.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
    return result;
}

export const getProductsByShopId = async (idShop) => {
    const snap = await getDocs(query(products, where("idShop", "==", idShop)))
    const result = [];
    snap.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
    return result;
}

export const getProductsByIds = async (ids) => {
    const snap = await getDocs(query(products, where(documentId(), "in", ids)))
    const result = [];
    snap.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
    return result;
}