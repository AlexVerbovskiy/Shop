const OrderSearchRows = ({ products }) => {
  return (
    <div className="flex rounded-lg border-2 border-gray-300 p-2 m-2 box-border">
      <div className="min-w-[200px] flex justify-start items-center flex-row my-2 mx-4 p-4">
        <div className="font-bold">
          Total price:{" "}
          {products.reduce(
            (prev, actual) => (prev += +actual.price * +actual.count),
            0
          )}
        </div>
      </div>
      <div className="flex overflow-x-auto">
        {products.map(product =>
          <ProductInfo
            key={product.id}
            name={product.name}
            price={product.price}
            count={product.count}
            url={product.url}
          />
        )}
        </div>
    </div>
  );
};

export default OrderSearchRows;

const ProductInfo = ({ name, price, count, url }) => {
  return (
    <div className="min-w-[500px] box-border flex-row flex my-2 mx-4 p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
      <div
        className="w-3/5 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center"
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
            Price for count({count}): {count * +price}
          </p>
        </div>
      </div>
    </div>
  );
};
