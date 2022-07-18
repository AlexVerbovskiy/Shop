import { useEffect, useState } from "react";
import { createShop, getShops } from "../services/shops";
import { useSelector, useDispatch } from "react-redux";
import { setLoadingAction, setErrorAction } from "../store/actionsCreators";

const List = ({ select, selectedShopId }) => {
  const [shops, setShops] = useState([]);

  const dispatch = useDispatch();
  const card = useSelector(state => state.card);

  useEffect(() => {
    const getShopsList = async () => {
      try{
        dispatch(setLoadingAction(true));
        const data = await getShops();
        setShops(data);
      }catch (e) {
        dispatch(setErrorAction(e.message))
      }finally {
        dispatch(setLoadingAction(false))
      }
    };

    getShopsList();
  }, []);

  useEffect(
    () => {
      if (card.length > 0 && selectedShopId != card[0].idShop) {
        const findedShop = shops.find(shop => shop.id === card[0].idShop);
        select(findedShop);
      }
    },
    [card]
  );

  const handleClick = shop => {
    if (card.length > 0) {
      alert("You can't order from different stores!");
      return;
    }
    select(shop);
  };

  return (
    <div className="w-full my-4 flex flex-col gap-y-2 overflow-visible text-center items-center ">
      {shops.map(shop => {
        return (
          <button
            onClick={() => handleClick(shop)}
            key={shop.id}
            className={
              "rounded-2xl block h-[40px] w-4/5 text-white hover:bg-green-400 border-2 border-green-400 " +
              (selectedShopId === shop.id ? "bg-green-400" : "bg-green-200")
            }
          >
            {shop.name}
          </button>
        );
      })}
    </div>
  );
};

export default List;
