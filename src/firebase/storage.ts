import { app } from "./firebaseApp";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);

export const uploadPhoto = async (path: string) => {

  const imageName = `${new Date().toString()}.jpg`;
  const refs = ref(storage, `images/${imageName}`);
  const img = await fetch(path);
  const bytes = await img.blob();
  await uploadBytes(refs, bytes);
  return imageName;
};

export const imageByUri = (location) => {
  return getDownloadURL(ref(storage, location));
};
