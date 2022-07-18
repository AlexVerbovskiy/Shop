import {
    setSessionId,
    setIsAdmin,
    setLoading,
    setCard,
    appendToCard,
    editCard,
    deleteFromCard,
    setSelectedShop,
    setError
} from "./actions";

export const setSessionIdAction = (id) => ({
    type: setSessionId,
    payload: id
});

export const setIsAdminAction = (isAdmin) => ({
    type: setIsAdmin,
    payload: isAdmin
});

export const setLoadingAction = (value) => ({
    type: setLoading,
    payload: value
});

export const setCardAction = (notesUserProduct) => ({
    type: setCard,
    payload: notesUserProduct
});

export const appendToCardAction = (noteUserProduct) => ({
    type: appendToCard,
    payload: noteUserProduct
});

export const editCardAction = (count, id) => ({
    type: editCard,
    payload: {
        count,
        id
    }
});

export const deleteFromCardAction = (id) => ({
    type: deleteFromCard,
    payload: id
});

export const setSelectedShopAction = (shop) => ({
    type: setSelectedShop,
    payload: shop
});

export const setErrorAction = (value) => ({
    type: setError,
    payload: value
});