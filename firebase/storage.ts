import { getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadPhoto = async (uri: string) => {
  const storage = getStorage();
  const refs = ref(storage, "image.jpg");
  const img = await fetch(uri);
  const bytes = await img.blob();
  await uploadBytes(refs, bytes);
};
