// src/services/carService.js
import { db, storage } from "./firebase"; // <-- استوردنا storage
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// جلب كل السيارات
export const getCars = async () => {
  const carsCollection = collection(db, "cars");
  const carsSnapshot = await getDocs(carsCollection);
  return carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// أضف سيارة مع روابط الصور
export const addCarWithImages = async (carData, imageUrls = []) => {
  if (!imageUrls.length) throw new Error("No image URLs provided");

  try {
    await addDoc(collection(db, "cars"), {
      ...carData,
      images: imageUrls,  // مصفوفة الصور
      status: "available"
    });
  } catch (err) {
    console.error("Error adding car:", err);
    throw err;
  }
};

// حذف سيارة
export const deleteCar = async (carId) => {
  await deleteDoc(doc(db, "cars", carId));
};