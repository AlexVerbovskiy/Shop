import Input from "./Input";
import Map from "./Map";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Form = ({ setUserInfo, userInfo }) => {

  const [coords, setCoords] = useState(null);

  const shop = useSelector(state => state.shop);

  const handleChange = e => {
    setUserInfo(prev => {
      const newInfo = { ...prev };
      newInfo[e.target.name] = e.target.value;
      return newInfo;
    });
  };

  useEffect(()=> setUserInfo(prev=>({...prev, coords})), [coords])


  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto w-1/2 p-8 md:p-12 rounded-lg border-2 border-gray-300 mt-4 mx-2 box-border">
      <section className="mt-10">
        <div className="flex flex-col">
          {shop && <div className="mb-8">
            <Map coords={coords} height="40vh" setMarkerLatLng={setCoords} staticMarker={({id: shop.name, pos: shop.coords})}/>
          </div>}

          <Input
            placeholder="Name"
            label="Full name"
            name="fullName"
            type="text"
            value={userInfo.fullName}
            onChangeByE={handleChange}
          />
          <Input
            placeholder="email@gmail.com"
            label="Email"
            name="email"
            type="email"
            value={userInfo.email}
            onChangeByE={handleChange}
          />

          <Input
            placeholder="0677777777"
            label="Phone"
            name="phone"
            type="text"
            value={userInfo.phone}
            onChangeByE={handleChange}
          />

          <Input
            placeholder="address"
            label="Address"
            name="address"
            type="text"
            value={userInfo.address}
            onChangeByE={handleChange}
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
        </div>
      </section>
    </div>
  );
};

export default Form;
