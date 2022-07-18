import { useEffect, useState } from "react";
import { signUp, signIn } from "../services/auth";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import ImgInput from "./DragDropImg";
import { getShops } from "../services/shops";
import { createProduct } from "../services/products";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingAction, setErrorAction } from "../store/actionsCreators";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [shop, setShop] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shops, setShops] = useState([]);

  const isAdmin = useSelector(state=>state.isAdmin);
  useEffect(()=>{
    if(!isAdmin) navigate("/");
  }, [isAdmin])

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      dispatch(setLoadingAction(true));
      const id = await createProduct({ name, price, idShop: shop, image });
      dispatch(setLoadingAction(false));
      if (id) navigate("/");
    } catch (e) {
      dispatch(setErrorAction(e.message));
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  useEffect(() => {
    const getShopsList = async () => {
      try {
        dispatch(setLoadingAction(true));
        const data = await getShops();
        setShops(data);
      } catch (e) {
        dispatch(setErrorAction(e.message));
      } finally {
        dispatch(setLoadingAction(false));
      }
    };

    getShopsList();
  }, []);

  const changeShop = e => setShop(e.target.value);

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 mb-20 rounded-lg shadow-2xl mt-16">
      <section>
        <h3 className="font-bold text-2xl">Add product!</h3>
      </section>
      <section className="mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <ImgInput onFileChange={setImage} />
          <Input
            placeholder="Name"
            label="Product name"
            name="name"
            type="text"
            value={name}
            onChange={setName}
          />

          <Input
            placeholder="Price"
            label="Product price"
            name="name"
            type="number"
            value={price}
            onChange={setPrice}
          />

          <div className={"mb-3 pt-3 rounded bg-gray-200 "}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-3 "
              htmlFor="guideId"
            >
              Shop
            </label>
            <select
              required={true}
              onChange={changeShop}
              name="shop"
              value={shop || "temp"}
              className="appearance-none bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-green-400 transition duration-500 px-3 pb-3 "
            >
              {shops.map(shop =>
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              )}
              <option hidden disabled value={"temp"}>
                Select a shop
              </option>
            </select>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">
            Add product
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddProductPage;
