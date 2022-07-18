import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsByShopId } from "../services/products";
import { useDispatch } from "react-redux";
import { setLoadingAction, appendToCardAction, setErrorAction } from "../store/actionsCreators";

const Card = ({ url, name, price, id, idShop }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(appendToCardAction({idShop, count:1, idProduct:id}));
  };

  return (
    <div className="max-w-[20rem] p-6 flex flex-col flex-grow flex-shrink ">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
          <img
            src={url}
            className="w-full rounded-t pb-6 h-[250px] max-h-[250px]"
          />
          <p className="w-full text-gray-600 text-xs md:text-sm px-6">
            {name}
          </p>
        </a>
      </div>
      <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg px-6 pb-6">
        <div className="flex">
          <div className="w-1/3 font-bold text-xl text-gray-900 flex items-center justify-start">
            {price}$
          </div>
          <div className="w-2/3 font-bold text-xl text-gray-900 flex items-center justify-end">
            <button onClick = {handleAddToCart} className="bg-transparent hover:bg-green-600 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartList = ({ selectedShopId }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const getProductsList = async () => {
        try {
          let data = [];
          dispatch(setLoadingAction(true));
          if (selectedShopId) data = await getProductsByShopId(selectedShopId);
          else data = await getAllProducts();
          setProducts(data);
        } catch (e) {
          dispatch(setErrorAction(e.message));
        } finally {
          dispatch(setLoadingAction(false));
        }
      };

      getProductsList();
    },
    [selectedShopId]
  );

  return (
    <div className="flex flex-wrap">
      {products.map(product =>
        <Card
          key={product.id}
          price={product.price}
          id={product.id}
          url={product.url}
          name={product.name}
          idShop={product.idShop}
        />
      )}
    </div>
  );
};

export default CartList;
