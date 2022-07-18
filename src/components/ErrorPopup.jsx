import React, { useRef, useEffect } from "react";

const Popup = ({ message, reset}) => {
  const popupRef = useRef();

  useEffect(
    () => {
      const removeTimeout = setTimeout(() => reset(), 4900);
      return () => {
        clearTimeout(removeTimeout);
      };
    },
    [message]
  );

  const color = "bg-red-500 ";
  const title = "Error!";
  const bottom = "bottom-10";

  return (
    <div
      ref={popupRef}
      className={"w-auto my-6 mx-auto max-w-3xl fixed right-10 z-50 " + bottom}
    >
      <div className="md:min-w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none">
        <div
          className={
            color +
            " flex items-start justify-between p-5 pb-2  border-gray-300 "
          }
        >
          <h3 className="text-3xl font-semibold  text-white">
            {title}
          </h3>
          <button onClick={() => reset()}>
            <span className="text-white h-6 w-6 text-xl block font-semibold">
              x
            </span>
          </button>
        </div>
        <div className="flex items-start justify-between p-5 pt-3  bg-white ">
          <h3 className="text-2xl ">
            {message}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Popup;
