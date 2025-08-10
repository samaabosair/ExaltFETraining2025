import '../style/headerStyle.css';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === '/create' ? (
        <h2 className="page-title">Create / Edit Event</h2>
      ) : (
        <>
          <Link to="/" className="left-link"><h2>Event</h2></Link>
          <Link to="/create" className="right-link"><h3>+Add</h3></Link>
        </>
      )}
    </header>
  );
}
