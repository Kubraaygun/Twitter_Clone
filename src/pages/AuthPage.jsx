import { useState } from "react";
import { auth } from "./../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate=useNavigate()
  //Formun Gonderilmesi
  const handleSubmit = (e) => {
    e.preventDefault();
  
    //eger kaydolma modundaysa:
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          navigate("/home")
          
        })
        .catch((err) => {
          console.dir(err.code)
        });
    } else {
      //eger giris yap modundaysa:
      console.log("Hesabiniza giris yapiliyor");
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* Logo*/}
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="logo" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>

        {/*Google Buton */}
        <button className="flex items-center bg-white py-2 px-10 rounded-full text-black gap-3 transition hover:bg-gray-300">
          <img className="h-[20px]" src="/google-logo.svg" />
          <span>Google İle Giriş Yap </span>
        </button>

        {/*Giris Formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray] "
            type="text"
            required
          />
          <label className="mt-5 ">Şifre</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray] "
            type="password"
            required
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p className="mt-5 flex gap-3">
            <span className="text-gray-500">
              {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
            </span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer"
            >
              {isSignUp ? "Giriş Yapın" : "Kaydolun"}
            </span>
          </p>
        </form>
        <p className="text-center text-red-500 hidden">
          Şifrenizi mi unuttunuz?
        </p>
      </div>
    </section>
  );
};

export default AuthPage;
