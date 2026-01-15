import "../styles/item.css"


export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      {item.image && (
        <img src={item.image} alt={item.title} />
      )}

      <h3>{item.title}</h3>
      <p>{item.description}</p>

      <button
        onClick={() =>
          window.open(
            `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(item.whatsappMessage)}`
          )
        }
      >
        Chamar no WhatsApp
      </button>
    </div>
  );
}
