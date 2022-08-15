import { app } from "./firebaseApp";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);

export const uploadPhoto = async ({
  filePath,
  eventId,
  itemId,
  photoId,
}: {
  filePath: string;
  eventId: string;
  itemId: string;
  photoId: string;
}) => {
  const storageRef = ref(
    storage,
    `photos/${eventId}/${itemId}/${photoId}.jpeg`
  );
  const response = await fetch(filePath);
  const blob = await response.blob();
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
};
