import {
    orders,
    create
} from "../firebase/collections";
import {
    query,
    where,
    getDocs,
    documentId
} from "firebase/firestore";

import {
    getAllProducts
} from "./products";

export const createOrder = async (data) => {
    const {
        id
    } = await create(orders, data);
    return id;
}

export const getOrdersBySessionId = async (sessionId) => await getOrdersByQuery(query(orders, where("sessionId", "==", sessionId)))

export const getOrdersByEmailAndPhone = async (email, phone) => await getOrdersByQuery(query(orders, where("email", "==", email), where("phone", "==", phone)))

const getOrdersByQuery = async (myQuery) => {
    const getOrders = async () => {
        const snap = await getDocs(myQuery)
        const result = [];
        snap.forEach(doc => result.push({
            ...doc.data(),
            id: doc.id
        }));
        return result;
    }

    const [findedOrders, products] = await Promise.all([getOrders(), getAllProducts()]);
    const res = findedOrders.map(order => {
        const productsIds = order.card.map(elem => elem.idProduct);
        const findedProducts = products.filter(product => productsIds.includes(product.id));

        const resProd = findedProducts.map(product => {
            const cardProduct = order.card.find(elem => elem.idProduct === product.id)
            return {
                ...cardProduct,
                ...product
            }
        })

        return {
            ...order,
            products: [...resProd]
        }
    })

    return res;
}