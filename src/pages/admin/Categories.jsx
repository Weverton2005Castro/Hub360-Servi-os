import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItemsByCategory } from "../../services/itemsService";
import "../../styles/admin.css"

export default function Category() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemsByCategory(id).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!items.length) return <p>Nenhum serviço cadastrado.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Serviços / Produtos</h1>

      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            borderRadius: 8,
            marginBottom: 15
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/559284699650?text=${encodeURIComponent(item.whatsappMessage)}`
              )
            }
          >
            Chamar no WhatsApp
          </button>
        </div>
      ))}
    </div>
  );
}
