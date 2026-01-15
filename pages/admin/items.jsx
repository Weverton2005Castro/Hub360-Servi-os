import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesService";
import { createItem } from "../../services/itemsService";

export default function Items() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    type: "service"
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async () => {
    await createItem({
      ...form,
      active: true,
      createdAt: new Date()
    });

    alert("Item criado!");
  };

  return (
    <div>
      <h2>Criar Serviço / Produto</h2>

      <input
        placeholder="Título"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Descrição"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <select
        onChange={e => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Selecione a categoria</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="service">Serviço</option>
        <option value="product">Produto</option>
      </select>

      <button onClick={handleSubmit}>Salvar</button>
    </div>
  );
}
