export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>

      <button
        onClick={() =>
          window.open(
            `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(item.whatsappMessage)}`
          )
        }
      >
        Falar no WhatsApp
      </button>
    </div>
  );
}