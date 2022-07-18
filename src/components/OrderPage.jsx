import { useState } from "react";
import OrderSearchForm from "./OrderSearchForm";
import OrderSearchRows from "./OrderSearchRow";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  return (
    <div className="w-full">
      <OrderSearchForm setOrders={setOrders} />
      {orders.length > 0 &&
        <div className="rounded-lg border-2 border-gray-300 mt-4 mx-4 box-border">
          {orders.map((order, index) => <OrderSearchRows key={index} products={order.products} />)}
        </div>}
      <div className="h-8" />
    </div>
  );
};

export default OrderPage;
