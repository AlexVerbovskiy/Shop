import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsByIds } from "../services/products";
import {
  setLoadingAction,
  editCardAction,
  deleteFromCardAction
} from "../store/actionsCreators";

const Note = ({ count, idProduct, name, url, price }) => {
  const dispatch = useDispatch();
  const handleChange = e => {
    if (e.target.value < 1) return;
    dispatch(editCardAction(+e.target.value, idProduct));
  };

  return (
    <div className="w-[90%] box-border flex-row flex my-2 mx-4 p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
      <div
        className="w-3/5 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          background: `url(${url}) no-repeat center center`,
          backgroundSize: "100%"
        }}
        title="Product"
      />
      <div className="w-2/5 p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {name}
          </div>
          <p className="text-gray-700 text-base">
            Price: {count * +price}
          </p>
          <input
            type="number"
            className="w-full border-[1px] border-black"
            value={count}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mt-4 bg-red-400 hover:bg-red-500 text-white font-bold p-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              onClick={() => dispatch(deleteFromCardAction(idProduct))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardList = () => {
  const card = useSelector(state => state.card);
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(
    () => {
      const getProducts = async idProducts => {
        let gettedProducts = [];
        if (
          idProducts.length > 0 &&
          (products.length === 0 || products.length !== list.length)
        ) {
          gettedProducts = await getProductsByIds(idProducts);
          setProducts([...gettedProducts]);
        } else {
          gettedProducts = products;
        }
        return gettedProducts;
      };

      const generateList = async () => {
        const idProducts = card.map(note => note.idProduct);
        dispatch(setLoadingAction(true));
        const gettedProducts = await getProducts(idProducts);
        const newList = gettedProducts.map(product => {
          const findedNote = card.find(note => note.idProduct === product.id);
          return { ...findedNote, ...product };
        });
        setList(newList);
        dispatch(setLoadingAction(false));
      };

      if (card.length == 0) {
        setList([]);
      } else {
        generateList();
      }
    },
    [card]
  );

  return (
    <div className="h-[calc(100vh-100px)] w-1/2 mt-4 mx-2 box-border">
      <div className="h-[80%] overflow-y-auto px-4 py-8 rounded-lg border-2 border-gray-300">
        {list.map(product =>
          <Note
            key={product.id}
            count={product.count}
            idProduct={product.idProduct}
            name={product.name}
            url={product.url}
            price={product.price}
          />
        )}
      </div>
      <div className="h-[20%] px-4 font-bold flex items-center text-3xl">
        <div className="w-1/2 flex justify-start">
          Total price:{" "}
          {list.reduce(
            (prev, actual) => (prev += +actual.price * actual.count),
            0
          )}
        </div>
        <div className="w-1/2 flex justify-end mr-16">
          <button
            type="submit"
            className="mt-4 px-4 bg-green-400 hover:bg-green-500 text-white font-bold p-2 rounded-xl shadow-lg hover:shadow-xl transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardList;
