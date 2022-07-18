import { useState } from "react";
import Input from "./Input";
import {
  getOrdersBySessionId,
  getOrdersByEmailAndPhone
} from "../services/orders";
import { useSelector, useDispatch } from "react-redux";
import { setLoadingAction, setErrorAction } from "../store/actionsCreators";

const OrderSearchForm = ({ setOrders }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const sessionId = useSelector(state => state.sessionId);

  const handleGetMyClick = async () => {
    try {
      dispatch(setLoadingAction(true));
      const data = await getOrdersBySessionId(sessionId);
      setOrders(data);
    } catch (e) {
      dispatch(setErrorAction(e.message));
    } finally {
      dispatch(setLoadingAction(false));
    }

  };

  const handleByEmailAndPhoneClick = async () => {
    try {
      dispatch(setLoadingAction(true));
      const data = await getOrdersByEmailAndPhone(email, phone);
      setOrders(data);
    } catch (e) {
      dispatch(setErrorAction(e.message));
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  return (
    <div className="p-8 md:p-12 rounded-lg border-2 border-gray-300 mt-4 mx-4 box-border">
      <section>
        <div className="flex flex-col">
          <div className="max-w-lg mb-4">
            <button
              type="button"
              onClick={handleGetMyClick}
              className="font-bold text-white py-2 px-20 rounded bg-green-300 hover:bg-green-400"
            >
              Get my orders
            </button>
          </div>

          <Input
            placeholder="Phone"
            label="Phone"
            name="phone"
            type="text"
            value={phone}
            onChangeByE={e => setPhone(e.target.value)}
          />
          <Input
            placeholder="email@gmail.com"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChangeByE={e => setEmail(e.target.value)}
          />

          <div className="max-w-lg mx-auto text-center mt-4">
            <button
              type="button"
              onClick={handleByEmailAndPhoneClick}
              className="font-bold hover:underline text-white py-2 px-20 rounded bg-green-300 hover:bg-green-400"
            >
              Find
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSearchForm;
