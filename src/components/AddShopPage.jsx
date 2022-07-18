import { useEffect, useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingAction, setErrorAction } from "../store/actionsCreators";
import Map from "./Map";
import { createShop } from "../services/shops";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAdmin = useSelector(state=>state.isAdmin);
  useEffect(()=>{
    if(!isAdmin) navigate("/");
  }, [isAdmin])


  const handleSubmit = async e => {
      try {
        e.preventDefault();
        dispatch(setLoadingAction(true));
        const data = await createShop({ name, address, coords });
        dispatch(setLoadingAction(false));
        if (data) navigate("/");
      } catch (e) {
        dispatch(setErrorAction(e.message));
      } finally {
        dispatch(setLoadingAction(false));
      }
  };

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 mb-20 rounded-lg shadow-2xl mt-16">
      <section>
        <h3 className="font-bold text-2xl">Add product!</h3>
      </section>
      <section className="mt-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-8">
          <Map coords={coords} height="40vh" dynamicMarkerName="Shop place" setMarkerLatLng={setCoords} />
          </div>
          <Input
            placeholder="Name"
            label="Shop name"
            name="name"
            type="text"
            value={name}
            onChange={setName}
          />

          <Input
            placeholder="Address"
            label="Address"
            name="address"
            type="text"
            value={address}
            onChange={setAddress}
          />

          <Input
            placeholder="Lat"
            label="Lat"
            name="lat"
            type="number"
            value={coords?.lat??""}
            step={0.0000000000001}
            onChange={value => setCoords(prev => ({ ...prev, lat: +value }))}
          />

          <Input
            placeholder="Lng"
            label="Lng"
            name="lng"
            type="number"
            value={coords?.lng??""}
            step={0.0000000000001}
            onChange={value => setCoords(prev => ({ ...prev, lng: +value }))}
          />
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">
            Add Shop
          </button>
        </form>
      </section>
    </main>
  );
};

export default AddProductPage;
