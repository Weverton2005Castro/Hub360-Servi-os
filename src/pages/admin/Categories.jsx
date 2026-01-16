import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory
} from "../../services/categoriesService";
import "../../styles/admin.css"

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const load = () => getCategories().then(setCategories);

  useEffect(load, []);

  const handleAdd = async () => {
    await createCategory({
      name,
      description: "",
      active: true
    });
    setName("");
    load();
  };

  return (
    <div style={{padding: 20}} >
      <h2>Categorias</h2>

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nome da categoria"
      />
      <button onClick={handleAdd}>Adicionar</button>

      {categories.map(cat => (
        <div key={cat.id}>
          {cat.name}
          <button onClick={() => deleteCategory(cat.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}
