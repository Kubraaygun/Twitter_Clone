import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  //Kullanicinin yetkisi var mi ?
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //anlik olarak kullanicinin oturumunu izle
    //herhangi bir degisimde statei guncelle
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    //Kullanici sayfadan ayrilirsa izleyiciyi kaldir
    return () => unsub();
  }, []);
  //eger yetkisi yoksa ;

  if (!isAuth) return <h1>Bu sayfayi goruntuleme yetkiniz yok</h1>;

  //eger yetkisi varsa;




  return (
    <div>
      <h1>yetkiniz var: sayfa icerigi:</h1>
      {/**Alt route'un ekranda yerlesecegi yeri belirler */}
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
