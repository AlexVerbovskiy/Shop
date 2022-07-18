import React, { useEffect, useState, useRef } from "react";

const CaptchaTest = ({ hide, callback }) => {
  const [userCaptcha, setUserCaptcha] = useState("");
  const [code, setCode] = useState("");
  const canvasRef = useRef(null);
  const parentRef = useRef(null);

  const createCaptcha = () => {
    setCode("");
    const charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    const lengthOtp = 6;
    const captcha = [];
    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length + 1);
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    setCode(captcha.join(""));
  };

  useEffect(
    () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 100, 50);
      ctx.font = "25px Georgia";
      ctx.strokeText(code, 0, 30);
    },
    [code]
  );

  useEffect(() => createCaptcha(), []);

  const validateCaptcha = e => {
    if (userCaptcha == code) {
      callback();
    } else {
      alert("Invalid Captcha. try Again");
      hide();
      //createCaptcha();
    }
  };

  const handlePopupClick = e => {
    if (e.target === parentRef.current) hide();
  };

  return (
    <div
      onClick={handlePopupClick}
      ref={parentRef}
      className="w-[100%] h-[100vh] fixed top-0 left-0 bg-gray-200 bg-opacity-50 flex items-center justify-center"
    >
      <div className="rounded-lg border-2 border-gray-300 box-border z-99">
        <section>
          <div className="flex flex-col">
            <form className="mx-auto bg-white w-[400px] h-[150px]">
              <div id="captcha" className="px-4">
                <canvas id="captcha" width="100" height="50" ref={canvasRef} />
              </div>
              <div className="px-4">
                <input
                  type="text"
                  className="w-full border-2 border-black"
                  placeholder="Captcha"
                  value={userCaptcha}
                  onChange={e => setUserCaptcha(e.target.value)}
                />
              </div>
              <div className="px-4">
                <button
                  type="button"
                  onClick={validateCaptcha}
                  className="w-full mt-4 bg-green-400 hover:bg-green-500 text-white py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaptchaTest;
