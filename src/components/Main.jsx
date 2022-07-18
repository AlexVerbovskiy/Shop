import ShopList from "./ShopList";
import ProductList from "./ProductList";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedShopAction} from "../store/actionsCreators";

const MainPage = ({isAdmin})=>{

    const dispatch = useDispatch();

    const selectedShop = useSelector(state => state.shop);
    const handleSelectActualShop = (shop)=>{
        if(!shop) return;
        if(selectedShop?.id===shop.id) dispatch(setSelectedShopAction(null));
        else dispatch(setSelectedShopAction(shop));
    }

    return (<div className="flex  h-[calc(100vh-75px)]">
        <div className="w-1/5 min-w-[200px] overflow-y-auto">
            <ShopList selectedShopId={selectedShop?.id} select={handleSelectActualShop} isAdmin={isAdmin}/>
        </div>
        <div className="w-4/5 min-w-[800px] overflow-y-auto" >
            <ProductList selectedShopId={selectedShop?.id} isAdmin={isAdmin}/>
        </div>
    </div>);
    
}

export default MainPage;