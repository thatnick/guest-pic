import { app } from "./firebaseApp";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { User } from "../dataTypes";


const storage = getStorage(app);


export const uploadPhoto = async (user: User, uri: string) => {
  
  const metadata = {
    
    customMetadata:{

      user: user.name,
      event_id: 'testevent'
      //event_id needs to be added
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
