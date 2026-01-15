import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesService";
import { createItem } from "../../services/itemsService";

export default function Items() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    type: "service",
    image: ""
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.categoryId || !form.image) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createItem({
        ...form,
        active: true
      });

      alert("Item criado com sucesso 🚀");

      setForm({
        title: "",
        description: "",
        categoryId: "",
        type: "service",
        image: ""
      });

    } catch (err) {
      setError("Deu ruim ao criar o item 😵");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-container">
      <h2>Criar Serviço / Produto</h2>

      <input
        value={form.title}
        placeholder="Título"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        value={form.image}
        placeholder="/images/itens/exemplo.jpg"
        onChange={e => setForm({ ...form, image: e.target.value })}
      />

      {/* Preview da imagem */}
      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          style={{
            width: "100%",
            borderRadius: "6px",
            marginBottom: "14px"
          }}
        />
      )}

      <textarea
        placeholder="Descrição"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.categoryId}
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
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="service">Serviço</option>
        <option value="product">Produto</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
}
