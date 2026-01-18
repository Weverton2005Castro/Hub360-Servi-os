import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/categoriesService";
import "../../styles/adminCategories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // edição
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const load = () => getCategories().then(setCategories);

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;

    await createCategory({
      name: name.trim(),
      description: "",
      active: true,
    });

    setName("");
    load();
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id) => {
    const newName = editName.trim();
    if (!newName) return;

    await updateCategory(id, { name: newName });
    cancelEdit();
    load();
  };

  return (
    <div className="adminCats">
      <header className="adminCats__header">
        <div>
          <p className="adminCats__badge">Painel</p>
          <h2 className="adminCats__title">Categorias</h2>
          <p className="adminCats__subtitle">
            Crie, edite e remova categorias do catálogo.
          </p>
        </div>

        <Link to="/admin" className="adminCats__backLink">
          <button className="adminCats__backBtn">← Voltar</button>
        </Link>
      </header>

      <section className="adminCats__card">
        <div className="adminCats__add">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da categoria"
            className="adminCats__input"
          />
          <button onClick={handleAdd} className="adminCats__addBtn">
            Adicionar
          </button>
        </div>

        <div className="adminCats__list">
          {categories.map((cat) => {
            const isEditing = editingId === cat.id;

            return (
              <div key={cat.id} className="adminCats__row">
                <div className="adminCats__rowLeft">
                  {!isEditing ? (
                    <>
                      <span className="adminCats__name">{cat.name}</span>
                      <span
                        className={`adminCats__status ${
                          cat.active ? "isOn" : "isOff"
                        }`}
                      >
                        {cat.active ? "Ativa" : "Inativa"}
                      </span>
                    </>
                  ) : (
                    <div className="adminCats__editWrap">
                      <input
                        className="adminCats__editInput"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Novo nome"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(cat.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                      <div className="adminCats__editHint">
                        Enter = salvar • Esc = cancelar
                      </div>
                    </div>
                  )}
                </div>

                <div className="adminCats__actions">
                  {!isEditing ? (
                    <>
                      <button
                        className="adminCats__editBtn"
                        onClick={() => startEdit(cat)}
                      >
                        Editar
                      </button>

                      <button
                        className="adminCats__delBtn"
                        onClick={() => deleteCategory(cat.id)}
                      >
                        Excluir
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="adminCats__saveBtn"
                        onClick={() => saveEdit(cat.id)}
                      >
                        Salvar
                      </button>

                      <button
                        className="adminCats__cancelBtn"
                        onClick={cancelEdit}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {categories.length === 0 && (
          <div className="adminCats__empty">
            <h3>Nenhuma categoria ainda</h3>
            <p>Crie a primeira ali em cima e bora.</p>
          </div>
        )}
      </section>
    </div>
  );
}
