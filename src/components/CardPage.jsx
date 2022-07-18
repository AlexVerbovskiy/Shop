import OrderForm from "./OrderForm";
import CardList from "./CardList";
import { useState, useEffect } from "react";
import { createOrder } from "../services/orders";
import { useSelector, useDispatch } from "react-redux";
import { setLoadingAction, setCardAction, setErrorAction } from "../store/actionsCreators";
import { useNavigate } from "react-router-dom";
import Captcha from "./Captcha";

const CardPage = () => {
  const card = useSelector(state => state.card);
  const sessionId = useSelector(state => state.sessionId);
  const [hideCaptcha, setHideCaptcha] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    coords: null
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (card.length == 0) {
      alert("You can't submit empty cart!");
    } else {
      setHideCaptcha(false);
    }
  };

  const handleCaptchaSuccess = async () => {
    try {
      dispatch(setLoadingAction(true));
      await createOrder({ ...userInfo, sessionId, card });
      dispatch(setLoadingAction(false));
      dispatch(setCardAction([]));
      navigate("/");
    } catch (e) {
      dispatch(setErrorAction(e.message));
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  return (
    <><form className="flex" onSubmit={handleSubmit}>
      <OrderForm userInfo={userInfo} setUserInfo={setUserInfo} />
      <CardList />
    </form>
    {!hideCaptcha &&
        <Captcha
          hide={() => setHideCaptcha(true)}
          callback={handleCaptchaSuccess}
        />}
    </>
  );
};

export default CardPage;
