import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { reload } from "firebase/auth";

const ref = collection(db, "categories");

export const getCategories = async () => {
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createCategory = (data) => addDoc(ref, data);

export const deleteCategory = (id) => {
  if (window.confirm("Tem certeza de que deseja deletar esta categoria?")) {
    deleteDoc(doc(db, "categories", id));
    alert(`Item ${id} excluído`)
    window.location.reload(reload);
  } else {
    alert("exclusão cancelada")
  }
}

export const updateCategory = (id, data) =>
  updateDoc(doc(db, "categories", id), data);