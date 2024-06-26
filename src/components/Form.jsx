import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "./Spinner";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  //tweet koleksiyonunn refereansini al
  const tweetsCol = collection(db, "tweets");

  //dosya eger resimse resmi storage'a yukle
  //rsmin url'ini fonksiyonun cagrildigi yere dondur
  const uploadImage = async (file) => {
    //1- dosya resim degilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;

    //2-dosyanin yuklenecegi yerin referansini olustur
    const fileRef = ref(storage, v4() + file.name);

    //3-referansini olusturdugumuz yere dosyayi yukle
    await uploadBytes(fileRef, file);
    //4-yuklenen dosyanin url'sine eris
    return await getDownloadURL(fileRef);
  };

  //formun gonderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    //inputtaki verilere eris
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //yazi veya resim icerigi yoksa uyari ver
    if (!textContent && !imageContent)
      return toast.info("Lütfen içerik giriniz");

    setIsLoading(true);

    //resmi yukle
    const url = await uploadImage(imageContent);
    //tweet koleksiyonuna yeni dokuman ekle
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    //formu sifirla
e.target.reset()
//yuklenmeyi sonlandir
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt="profile-pic"
      />
      <div className="w-full">
        <input
          type="text"
          className="w-full bg-transparent my-2 outline-none md:text-lg "
          placeholder="Neler Oluyor ?"
        />

        <div className="flex justify-between items-center ">
          <label
            htmlFor="image-input"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image-input" type="file" />
          <button
            disabled={isLoading}
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Spinner /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
