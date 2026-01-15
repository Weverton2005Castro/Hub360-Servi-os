import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>O que você precisa hoje?</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20
      }}>
        {categories.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={() => window.location.href = `/categoria/${cat.id}`}
          />
        ))}
      </div>
    </div>
  );
}
