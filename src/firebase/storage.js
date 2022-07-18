import { app } from './config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const storage = getStorage(app)

export const uploadFile = async (file, fileName) => {
  const filePath = `products/${fileName}`;
  const storageRef = ref(storage, filePath)
  await uploadBytesResumable(storageRef, file);
  return await getDownloadURL(storageRef)
}