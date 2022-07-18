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

import {
    createStore
} from 'redux';

const initialState = {
    sessionId: null,
    isAdmin: false,
    isLoading: false,
    card: [],
    shop: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case setSessionId:
            return {
                ...state,
                sessionId: action.payload
            }
            break;
        case setIsAdmin:
            return {
                ...state,
                isAdmin: action.payload
            }
            break;
        case setLoading:
            return {
                ...state,
                isLoading: action.payload
            }
            break;
        case setCard:
            return {
                ...state,
                card: action.payload
            }
            break;
        case appendToCard: {
            let newCard = [];
            if (state.card.find(note => note.idProduct === action.payload.idProduct)) {
                state.card.forEach(note => {
                    if (note.idProduct === action.payload.idProduct) {
                        newCard.push({
                            ...note,
                            count: note.count + 1
                        })
                    } else {
                        newCard.push(note)
                    }
                })
            } else {
                newCard = [...state.card, action.payload]
            }

            return {
                ...state,
                card: newCard
            }
            break;
        }
        case editCard: {

            const newCard = [...state.card.map(card => {
                let newObj = {
                    ...card
                };
                if (card.idProduct === action.payload.id) newObj = {
                    ...card,
                    count: action.payload.count
                };

                return newObj;
            })]

            const newState = {
                ...state,
                card: newCard
            }

            return newState;
        }
        break;
    case deleteFromCard:
        return {
            ...state,
            card: [...state.card.filter(card => (card.idProduct !== action.payload))]
        }
        break;
    case setSelectedShop: {
        return {
            ...state,
            shop: action.payload
        }
        break;
    }
    case setError: {
        return {
            ...state,
            error: action.payload
        }
        break;
    }
    default:
        return state
    }
}

const store = createStore(reducer);

export default store;