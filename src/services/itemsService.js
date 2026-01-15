import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "items");

export const getItemsByCategory = async (categoryId) => {
  const q = query(ref, where("categoryId", "==", categoryId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createItem = (data) => addDoc(ref, data);
