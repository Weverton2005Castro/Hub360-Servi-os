export default function CategoryCard({ category, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 12,
        padding: 20,
        background: "#1e293b",
        color: "#fff",
        cursor: "pointer"
      }}
    >
      <h2>{category.name}</h2>
      <p>{category.description}</p>
    </div>
  );
}
