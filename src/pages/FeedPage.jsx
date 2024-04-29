import React from "react";
import { auth } from "../firebase/config";

const FeedPage = () => {
  return (<div>
    <h1>Akis sayfasi</h1>
    <button onClick={()=>signOut(auth)}>Cikis yap</button>
  </div>)
};

export default FeedPage;
