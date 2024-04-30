import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Main from "../components/Main";
import Nav from "../components/Nav";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const FeedPage = () => {
  const [user, setUser] = useState(null);
  //Kullanici bilgisine abone ol
  useEffect(() => {
    //kullanici oryemunu izle kullanici state'e aktar
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser));
    //sayfadan ayrilirsa izlemeyi sonlandir
    return () => unsub();
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user}/>
      <Main />
      <Aside />
    </div>
  );
};

export default FeedPage;
