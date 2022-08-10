import { getStorage, ref, uploadBytes } from "firebase/storage";

import { app } from "./firebaseApp";
const storage = getStorage(app);

export const uploadPhoto = async (uri: string) => {
  const metadata = {
    
    customMetadata:{

      user: 'testuser',
      event_id: 'testevent'
  }
  }
  const imageName = `${new Date().toString()}.jpg`
  const storage = getStorage();
  const refs = ref(storage, `images/${imageName}`);
  const img = await fetch(uri);
  const bytes = await img.blob();
  const snapshot = await uploadBytes(refs, bytes, metadata);
  console.log(snapshot,'<<<snapshot')
  return imageName


};
