import { doc, updateDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase/config";

const EditMode = ({ tweet, close }) => {
  const inputRef = useRef();

  //kaydet butonuna tiklaninca
  const handleSave = async () => {
    //1-input icerigine eris
    const newText = inputRef.current.value;
    //2-guncellenecek dokumanin referansini al

    const tweetRef = doc(db, "tweets", tweet.id);
    //3-dokumanin yazi icerigini guncelle
    await updateDoc(tweetRef, {
      textContent: newText,
      isEdited: true,
    });

    close();
  };
  return (
    <>
      <input
        defaultValue={tweet.textContent}
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-500"
      >
        <BiSolidSave />
      </button>

      <button
        onClick={close}
        className="mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-500"
      >
        <ImCancelCircle />
      </button>
    </>
  );
};

export default EditMode;
