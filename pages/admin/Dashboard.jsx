import { Link } from "react-router-dom";
import "../../styles/Dashboard.css"


export default function Dashboard() {
  return (
    <div className="container">
      <h1>Painel Administrativo</h1>

      <div className="grid">
        <Link to="/admin/categories" className="admin-card">
          Gerenciar Categorias
        </Link>

        <Link to="/admin/items" className="admin-card">
          Gerenciar Serviços / Produtos
        </Link>
      </div>
    </div>
  );
}
