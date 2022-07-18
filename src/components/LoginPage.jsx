import { useEffect, useState } from "react";
import { signUp, signIn,signInByGoogle } from "../services/auth";
import Input from "./Input";
import { useDispatch } from "react-redux";
import {setLoadingAction, setErrorAction} from "../store/actionsCreators";

const LoginPage = () => {
  const [type, setType] = useState(0);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("temptemp");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [email, setEmail] = useState("temp@gmail.com");

  const dispatch = useDispatch();

  const changeTypeForm = () =>
    setType(prev => {
      if (prev === 0) return 1;
      return 0;
    });

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      dispatch(setLoadingAction(true))
      if (type === 1) {
        await signUp({ fullName, password, repeatedPassword, email });
      } else {
        await signIn({ password, email });
      }
    }catch (e) {
      dispatch(setErrorAction(e.message))
    }finally {
      dispatch(setLoadingAction(false))
    }
    
  };

  const handleSignByGoogleClick = async () => {
    try{
      await signInByGoogle();
    }catch (e) {
      dispatch(setErrorAction(e.message))
    }
}

return(
  <main className="bg-white max-w-lg mx-auto p-8 md:p-12 mb-20 rounded-lg shadow-2xl mt-16">
          <section>
                  <h3 className="font-bold text-2xl">Welcome to shop!</h3>
                  <p className="text-gray-600 pt-2">If you want to edit the shop, you must have an account</p>
              </section>
            <section className="mt-10">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {type===1 && <>
                      <Input placeholder="Name" label="Full name" name="fullName" type="text"
                            value={fullName} onChange={setFullName} />
                    </>}
                    <Input placeholder="email@gmail.com" label="Email" name="email" type="email"
                        value={email} onChange={setEmail} />

                    <Input placeholder="password" label="Password" name="password" type="password"
                        value={password} onChange={setPassword} />

                    {type===1 && <Input placeholder="password" label="Repeated password" name="repeatedPassword"
                        type="password" value={repeatedPassword} onChange={setRepeatedPassword} />}

                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">
                        Sign  {type ? "Up" : "In"} </button>

                        <button onClick={handleSignByGoogleClick} type="button" className="mt-2 bg-blue-600 hover:bg-red-500 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">
                    Login with google</button>

                    {type===1 ?
                        <div className="max-w-lg mx-auto text-center mt-2  mb-6">
                            <p className="text-green-600 hover:text-green-700" >Have account?
                                <button type="button" onClick={changeTypeForm} className="font-bold hover:underline">Sign in</button>.</p>
                        </div>
                        :
                        <div className="max-w-lg mx-auto text-center mt-2 mb-6">
                            <p className="text-green-600 hover:text-green-700" >Don't have an account?
                                <button type="button" onClick={changeTypeForm} className="font-bold hover:underline">Sign up</button>.</p>
                        </div>
                      } 
                </form>
            </section>
        </main>
        )
};

export default LoginPage;


