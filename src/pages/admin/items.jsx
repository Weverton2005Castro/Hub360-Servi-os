import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoriesService";
import { createItem } from "../../services/itemsService";
import "../../styles/items.css";
import { Link } from "react-router-dom";

import { ITEM_MEDIA } from "../../assets/itemMedia";

export default function Items() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    type: "service",

    // ✅ novos campos
    mediaUrl: "",
    mediaType: "", // "image" | "video"
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handlePickMedia = (value) => {
    if (!value) {
      setForm((prev) => ({ ...prev, mediaUrl: "", mediaType: "" }));
      return;
    }

    const picked = ITEM_MEDIA.find((m) => m.src === value);
    setForm((prev) => ({
      ...prev,
      mediaUrl: picked?.src || value,
      mediaType: picked?.type || "",
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.categoryId || !form.mediaUrl || !form.mediaType) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createItem({
        title: form.title,
        description: form.description,
        categoryId: form.categoryId,
        type: form.type,

        mediaUrl: form.mediaUrl,
        mediaType: form.mediaType,

        // (opcional) compatibilidade com seu código antigo que usa item.image
        image: form.mediaType === "image" ? form.mediaUrl : "",

        active: true,
      });

      alert("Item criado com sucesso 🚀");

      setForm({
        title: "",
        description: "",
        categoryId: "",
        type: "service",
        mediaUrl: "",
        mediaType: "",
      });
    } catch (err) {
      setError("Deu ruim ao criar o item 😵");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-container">
      <Link to="/admin">
        <button className="btn-back">Voltar</button>
      </Link>

      <h2>Criar Serviço / Produto</h2>

      <input
        value={form.title}
        placeholder="Título"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* ✅ seletor de mídia (imagem/vídeo) */}
      <select value={form.mediaUrl} onChange={(e) => handlePickMedia(e.target.value)}>
        <option disabled value="">Selecione uma imagem ou vídeo</option>
        {ITEM_MEDIA.map((m) => (
          <option key={m.src} value={m.src}>
            {m.label}
          </option>
        ))}
      </select>

      {/* (opcional) input manual pra colar URL */}
      <input
        value={form.mediaUrl}
        placeholder="ou cole uma URL de imagem/vídeo aqui"
        onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
      />

      {/* ✅ Preview inteligente */}
      {form.mediaUrl && form.mediaType === "image" && (
        <img
          src={form.mediaUrl}
          alt="Preview"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "14px" }}
        />
      )}

      {form.mediaUrl && form.mediaType === "video" && (
        <video
          src={form.mediaUrl}
          controls
          preload="metadata"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "14px" }}
        />
      )}

      <textarea
        placeholder="Descrição"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option disabled value="">Selecione a categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
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
