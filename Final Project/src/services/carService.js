import { db, storage } from "./firebase";
import { 
  collection, getDocs, doc, deleteDoc, addDoc, updateDoc, where, query, getDoc 
} from "firebase/firestore";

// جلب كل السيارات
export const getCars = async () => {
  const carsCollection = collection(db, "cars");
  const carsSnapshot = await getDocs(carsCollection);
  return carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// إضافة سيارة جديدة
export const addCarWithImages = async (carData, imageUrls = []) => {
  if (!imageUrls.length) throw new Error("No image URLs provided");

  try {
    await addDoc(collection(db, "cars"), {
      ...carData,
      images: imageUrls,
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

// تحديث سيارة
export const updateCar = async (id, updatedCar) => {
  const carRef = doc(db, "cars", id);
  await updateDoc(carRef, updatedCar);
};

// جلب إيجارات المستخدم العادي
export const getUserRentals = async (userId) => {
  if (!userId) return [];

  const rentalsRef = collection(db, "rentals");
  const q = query(rentalsRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);

  const rentals = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const rentalData = { id: docSnap.id, ...docSnap.data() };

      if (rentalData.carId) {
        const carDoc = await getDoc(doc(db, "cars", rentalData.carId));
        rentalData.carName = carDoc.exists() ? carDoc.data().brand || carDoc.data().name : "Unknown Car";
      }

      return rentalData;
    })
  );

  return rentals;
};

// جلب كل الإيجارات للـ admin
export const getAllRentals = async () => {
  const rentalsRef = collection(db, "rentals");
  const snapshot = await getDocs(rentalsRef);

  const rentals = await Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const rentalData = { id: docSnap.id, ...docSnap.data() };

      if (rentalData.carId) {
        const carDoc = await getDoc(doc(db, "cars", rentalData.carId));
        rentalData.carName = carDoc.exists() ? carDoc.data().brand || carDoc.data().name : "Unknown Car";
      }

      if (rentalData.userId) {
        const userDoc = await getDoc(doc(db, "users", rentalData.userId));
        rentalData.userEmail = userDoc.exists() ? userDoc.data().email : "Unknown User";
      }

      return rentalData;
    })
  );

  return rentals;
};

// إضافة إيجار جديد
export const addRental = async (rentalData) => {
  try {
    await addDoc(collection(db, "rentals"), rentalData);
  } catch (err) {
    console.error("Error adding rental:", err);
    throw err;
  }
};

// حذف إيجار
export const deleteRental = async (rentalId) => {
  await deleteDoc(doc(db, "rentals", rentalId));
};

// تحديث إيجار
export const updateRental = async (rentalId, updatedRental) => {
  const rentalRef = doc(db, "rentals", rentalId);
  await updateDoc(rentalRef, updatedRental);
};
