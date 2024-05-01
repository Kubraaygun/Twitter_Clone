import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const Aside = () => {
  const [data, setData] = useState({});

  const tweetsCol = collection(db, "tweets");
  //dokumanlar ile alakali istatistik hesaplamaya yarar
  //1-koleksiyon referansi
  //2-sum/avarage /count
  useEffect(() => {
    getAggregateFromServer(tweetsCol, {
      tweetsCount: count(),
    }).then((res) => setData(res.data()));
  }, []);

  return (
    <div className="max-lg:hidden p-3">
      <h1>Toplam Gönderi Sayısı: {data.tweetsCount}</h1>
    </div>
  );
};

export default Aside;
