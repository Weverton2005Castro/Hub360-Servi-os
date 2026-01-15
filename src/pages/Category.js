import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItemsByCategory } from "../services/itemsService";
import "../styles/item.css"

export default function Category() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByCategory(id).then(setItems);
  }, [id]);

  return (
    <div className="container">
      <h1>Serviços disponíveis</h1>

      {items.map(item => (
        <div key={item.id} className="grid">
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
