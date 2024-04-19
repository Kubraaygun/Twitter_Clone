import React from "react";

const AuthPage = () => {
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
        <form className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray] "
            type="text"
          />
          <label className="mt-5 ">Şifre</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray] "
            type="password"
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            Kaydol
          </button>

          <p className="mt-5 flex gap-3">
            <span className="text-gray-500">Hesabınız varsa</span>
            <span className="text-blue-500 cursor-pointer">Giriş Yapıın</span>
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
