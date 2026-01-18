import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";
import CategoryCard from "../components/CategoryCard";
import "../styles/home.css";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const filtered = categories.filter((cat) =>
    (cat?.name || cat?.title || "")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="home">
      <header className="home__hero">
        <div className="home__heroInner">
          <div>
            <p className="home__badge">Catálogo de serviços</p>
            <h1 className="home__title">O que você precisa hoje?</h1>
            <p className="home__subtitle">
              Internet, segurança e produtos — tudo organizado como vitrine.
            </p>
          </div>

          <div className="home__searchWrap">
            <input
              className="home__search"
              placeholder="Buscar categorias (ex: internet, câmera, camisa)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="home__searchIcon">⌕</span>
          </div>
        </div>
      </header>

      <main className="home__container">
        <div className="home__sectionHeader">
          <h2 className="home__sectionTitle">Categorias</h2>
          <p className="home__sectionHint">
            Clique para ver os itens e detalhes.
          </p>
        </div>

        <div className="home__grid">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="home__cardWrap"
              onClick={() => (window.location.href = `/categoria/${cat.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (window.location.href = `/categoria/${cat.id}`)
              }
            >
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="home__empty">
            <h3>Nada por aqui 👀</h3>
            <p>Tenta buscar por outro termo.</p>
          </div>
        )}
      </main>
    </div>
  );
}
