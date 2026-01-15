import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ref = collection(db, "categories");

export const getCategories = async () => {
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createCategory = (data) => addDoc(ref, data);

export const deleteCategory = (id) =>
  deleteDoc(doc(db, "categories", id));
