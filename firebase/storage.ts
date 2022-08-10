import { getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from "./firebaseApp";
const storage = getStorage(app);

export const uploadPhoto = async (uri: string) => {
  const storage = getStorage();
  const refs = ref(storage, `images/${new Date().toString()}.jpg`);
  const img = await fetch(uri);
  const bytes = await img.blob();
  await uploadBytes(refs, bytes);

};
