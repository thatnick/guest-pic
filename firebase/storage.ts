import { getStorage, ref, uploadString } from "firebase/storage";
import * as FileSystem from "expo-file-system";

import { app } from "./firebaseApp";
const storage = getStorage(app);

export const uploadPhoto = async (uri: string) => {
  var filename = "test.jpg";

  const storageRef = ref(storage, `images/${filename}`);

  console.log(uri, "<< uri in upload func");
  // let photoString = await FileSystem.readAsStringAsync(uri, {
  //   encoding: FileSystem.EncodingType.Base64,
  // });
  //console.log(photoString, "this should be a giant string");
  const metadata = {
    contentType: "image/jpeg",
  };
  await uploadString(
    storageRef,
    "data:image/jpg;base64," + uri,
    "base64",
    metadata
  ).then((snapshot) => {
    console.log("Uploaded a base64 string!");
  });
};
