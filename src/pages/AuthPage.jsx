import { useState } from "react";
import { auth, provider } from "./../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  //Formun Gonderilmesi
  const handleSubmit = (e) => {
    e.preventDefault();

    //eger kaydolma modundaysa:
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınız Oluşturuldu");
          navigate("/home");
        })
        .catch((err) => toast.error(err.code));
    } else {
      //eger giris yap modundaysa:
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Hesabınıza Giriş Yapıldı");
          navigate("/home");
        })
        .catch((err) => {
          //eger sifre hatasi varsa state'i guncelle
          if (err.code === "auth/invalid-credential") {
            toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
            setIsError(true);
          }
        });
    }
  };

//sifremi unuttum maili gonder
const sendMail=()=>{
  sendPasswordResetEmail(auth,email)
    .then(()=>{
      toast.info("Epostanız şifre sıfırlama isteği gönderildi")
    })
  
}

//google ile oturum acma

const loginWithGoogle=()=>{
  signInWithPopup(auth,provider)
  .then(()=>navigate("/home"))
}


  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* Logo*/}
        <div className="flex justify-center">
          <img className="h-[60px]" src="x-logo.webp" alt="logo" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter'a Giriş Yap</h1>

        {/*Google Buton */}
        <button onClick={loginWithGoogle} className="flex items-center bg-white py-2 px-10 rounded-full text-black gap-3 transition hover:bg-gray-300">
          <img className="h-[20px]" src="/google-logo.svg" />
          <span className="whitespace-nowrap">Google İle Giriş Yap </span>
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

        {isError && (
          <p onClick={sendMail} className="text-center text-red-500 cursor-pointer">Şifrenizi mi unuttunuz?</p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
