import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItemsByCategory } from "../services/itemsService";

export default function Category() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByCategory(id).then(setItems);
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Serviços / Produtos</h1>

      {items.map(item => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button
            onClick={() =>
              window.open(`https://wa.me/559284699650?text=${item.whatsappMessage}`)
            }
          >
            Chamar no WhatsApp
          </button>
        </div>
      ))}
    </div>
  );
}
