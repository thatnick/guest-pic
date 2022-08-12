import { app } from "./firebaseApp";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { User } from "../dataTypes";
import { CommonActions } from "@react-navigation/native";

const storage = getStorage(app);

export const uploadPhoto = async (path: string) => {
  const metadata = {
    customMetadata: {
      user: "testuser",
      event_id: "testevent",
      //event_id needs to be added
    },
  };
  const imageName = `${new Date().toString()}.jpg`;
  const refs = ref(storage, `images/${imageName}`);
  const img = await fetch(path);
  const bytes = await img.blob();
  const snapshot = await uploadBytes(refs, bytes, metadata);
  console.log(snapshot, "<<<snapshot");
  return imageName;
};

export const imageByUri = (location) => {
  console.log(location, "<<<location in imageByUrl");
  
  return getDownloadURL(ref(storage, location));
};
