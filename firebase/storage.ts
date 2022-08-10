import { app } from "./firebaseApp";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);
export const uploadPhoto = async (uri: string) => {
  const refs = ref(storage, `images/${new Date().toString()}.jpg`);
  const img = await fetch(uri);
  const bytes = await img.blob();
  await uploadBytes(refs, bytes);
};
