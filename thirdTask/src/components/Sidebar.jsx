import { NavLink } from "react-router-dom";
import '../style/sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
              List
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className={({ isActive }) => isActive ? "active-link" : ""}>
              Form
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
