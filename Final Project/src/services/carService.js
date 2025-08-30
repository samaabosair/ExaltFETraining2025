import { db, storage } from "./firebase";
import { 
  collection, getDocs, doc, deleteDoc, addDoc, updateDoc, where, query, getDoc 
} from "firebase/firestore";
export const getCars = async () => {
  try {
    const carsCollection = collection(db, "cars");
    const carsSnapshot = await getDocs(carsCollection);

    const cars = await Promise.all(
      carsSnapshot.docs.map(async (docSnap) => {
        const carData = { id: docSnap.id, ...docSnap.data() };

        const rentalsRef = collection(db, "rentals");
        const q = query(rentalsRef, where("carId", "==", docSnap.id));
        const rentalsSnapshot = await getDocs(q);

        carData.rentals = rentalsSnapshot.docs.map(r => {
          const rental = r.data();
          if (!rental.period) {
            console.warn("⚠️ Rental بدون period:", rental);
            return { period: "" };
          }

          return rental;
        });

        return carData;
      })
    );

    return cars;
  } catch (err) {
    console.error("Error in getCars:", err);
    throw new Error("Failed to load cars."); 
  }
};
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

export const deleteCar = async (carId) => {
  await deleteDoc(doc(db, "cars", carId));
};

export const updateCar = async (id, updatedCar) => {
  const carRef = doc(db, "cars", id);
  await updateDoc(carRef, updatedCar);
};

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

export const addRental = async (rentalData) => {
  try {
    await addDoc(collection(db, "rentals"), rentalData);
  } catch (err) {
    console.error("Error adding rental:", err);
    throw err;
  }
};

