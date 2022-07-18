import { useEffect, useState,cloneElement, useRef } from "react";
import { getRndStr } from "./utils";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import { auth } from "./firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {setSessionIdAction,setErrorAction, setIsAdminAction, setCardAction, setLoadingAction, setSelectedShopAction} from "./store/actionsCreators";
import Loader from "./components/Loader";
import {getShopById} from "./services/shops";
import ErrorPopover from "./components/ErrorPopup";
import {useNavigate} from "react-router-dom";

const App = ({children}) => {
  const isAdmin = useSelector(state => state.isAdmin);
  const isLoading= useSelector(state => state.isLoading);
  const card= useSelector(state => state.card);
  const dispatch = useDispatch();
  const isFirstCall = useRef(true);
  const shop = useSelector(state => state.shop);
  const error = useSelector(state => state.error);

  const navigate = useNavigate();

  const removeError = ()=> dispatch(setErrorAction(null))

  useEffect(() => {
    let localStorageId = localStorage.getItem("userId");
    if (!localStorageId) {
      localStorageId = getRndStr();
      localStorage.setItem("userId", localStorageId);
    }
    dispatch(setSessionIdAction(localStorageId))

    let localStorageCard = localStorage.getItem("card");
    if (localStorageCard) 
      dispatch(setCardAction(JSON.parse(localStorageCard)))

    onAuthStateChanged(auth, async currentUser => {
      if (currentUser) dispatch(setIsAdminAction(true))
      else dispatch(setIsAdminAction(false))
      navigate("/");
    });
  }, []);

  useEffect(
    () => {
      if(isFirstCall.current)
        isFirstCall.current=false;
      else
        localStorage.setItem("card", JSON.stringify(card))
    },
    [card]
  );

  useEffect(()=>{
    const setActualShop = async(id)=>{
      try{
      dispatch(setLoadingAction(true))
      const shop = await getShopById(id);
      dispatch(setSelectedShopAction(shop));
      }catch(e){
        dispatch(setErrorAction(e.message));
      }finally{
        dispatch(setLoadingAction(false));
      }
    }

    if(!shop && card.length>0){
      setActualShop(card[0].idShop);
    }

    if(shop && card.length===0){
      dispatch(setSelectedShopAction(null));
    }
  },  [card])

  return<>
   {isLoading && <Loader/>} 
   <Header isAdmin={isAdmin}/>
   {cloneElement(children, { isAdmin })}
   {error &&<ErrorPopover message={error} reset={removeError}/>}
   </>;
};

export default App;
