import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getItemsByCategory } from "../services/itemsService";
import claro1 from "../assets/claro1.jpeg";
import claro2 from "../assets/claro2.jpeg";
import claro3 from "../assets/claro3.jpeg";
import "../styles/category.css";


const ITEM_IMAGES = {
  "Instalação de Internet Claro": [claro1],
  "Planos": [claro2],
  "Roteador": [claro3],
};

function CardImage({ images = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div
      className="catCard__media"
      style={images.length ? { backgroundImage: `url(${images[index]})` } : {}}
    />
  );
}

export default function Category() {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!id) return;
    getItemsByCategory(id).then(setItems);
  }, [id]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) => {
      const t = (item?.title || "").toLowerCase();
      const d = (item?.description || "").toLowerCase();
      return t.includes(q) || d.includes(q);
    });
  }, [items, query]);

  const openWhats = (msg) => {
    const phone = "559284699650";
    const text = encodeURIComponent(msg || OFERTA_FIBRA);

    window.open(
      `https://wa.me/${phone}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const OFERTA_FIBRA = `
🚀 OFERTAS DISPONÍVEIS 🚀

PLANO ESSENCIAL 🥉
BENEFÍCIO: WI-FI 5G.

🥉 500 MEGA R$90,00 (Crédito)
🥉 500 MEGA R$100,00 (Débito/Boleto)

PLANO SUPER 🥈
BENEFÍCIOS: WI-FI 6G + GLOBOPLAY POR 12 MESES.

🥈 700 MEGA R$120,00 (Crédito)
🥈 700 MEGA R$130,00 (Débito/Boleto)

PLANO ULTRA 🥇
BENEFÍCIOS: WI-FI 6G + GLOBOPLAY POR 12 MESES + REPETIDOR DE SINAL GRATUITO.

🥇 1 GIGA R$150,00 (Crédito)
🥇 1 GIGA R$160,00 (Débito/Boleto)

A instalação é grátis.
Qual oferta tem interesse em assinar conosco?
`;


  return (
    <div className="cat">
      <header className="cat__hero">
        <div className="cat__heroInner">
          <div className="cat__topRow">
            <div className="cat__crumbs">
              <Link className="cat__crumb" to="/">
                Início
              </Link>
              <span className="cat__crumbSep">/</span>
              <span className="cat__crumbCurrent">Categoria</span>
            </div>

            <div className="cat__pill">
              {items.length} item{items.length === 1 ? "" : "s"}
            </div>
          </div>

          <h1 className="cat__title">Serviços disponíveis</h1>
          <p className="cat__subtitle">
            Escolha um item e chame no WhatsApp com 1 clique. Sem enrolação.
          </p>

          <div className="cat__searchWrap">
            <input
              className="cat__search"
              placeholder="Buscar (ex: câmera, alarme, plano, camisa)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="cat__searchIcon">⌕</span>
          </div>
        </div>
      </header>

      <main className="cat__container">
        <div className="cat__grid">
          {filtered.map((item) => {

            const importedImages = ITEM_IMAGES[item.title] || [];

            const firestoreImages = (
              Array.isArray(item.images) ? item.images : []
            )
              .filter(Boolean)
              .concat(item.image ? [item.image] : [])
              .filter(Boolean);

            const finalImages =
              importedImages.length > 0 ? importedImages : firestoreImages;

            return (
              <article key={item.id} className="catCard">
                <CardImage images={finalImages} />

                <div className="catCard__shade" />

                <div className="catCard__content">
                  <div className="catCard__text">
                    <h3 className="catCard__title">{item.title}</h3>
                    <p className="catCard__desc">{item.description}</p>
                  </div>

                  <button
                    className="catCard__btn"
                    onClick={() => openWhats(item.whatsappMessage)}
                  >
                    Chamar no WhatsApp
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="cat__empty">
            <h3>Não achei nada com isso 😅</h3>
            <p>Tenta outro termo (ou apaga a busca).</p>
          </div>
        )}
      </main>
    </div>
  );
}
