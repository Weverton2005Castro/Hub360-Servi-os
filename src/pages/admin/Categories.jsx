import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {
  getCategories,
  createCategory,
  deleteCategory
} from "../../services/categoriesService";
import "../../styles/adminCategories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  
  const load = () => getCategories().then(setCategories);

  useEffect(() => {
    load();
  }, []);


  const handleAdd = async () => {
    if (!name.trim()) return;

    await createCategory({
      name,
      description: "",
      active: true
    });

    setName("");
    load();
  };

  return (
    <div className="admin-container">
      <h2>Categorias</h2>

      <div className="add-category">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nome da categoria"
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <div className="category-list">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <span>{cat.name}</span>
            <button onClick={() => deleteCategory(cat.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
      <Link to="/admin" >
        <button className="back-button" > Voltar </button>
      </Link>
    </div>
  );
}
