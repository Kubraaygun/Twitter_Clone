import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
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
  //eger yetkisi yoksa logine yonlendir ;

  if (isAuth===false) return <Navigate to={"/"} />;
  //eger yetkisi varsa sayfayi goster;
//outlet: alt route'un ekranda yerlesecegi yeri belirler
  return <Outlet />;
};

export default ProtectedRoute;
