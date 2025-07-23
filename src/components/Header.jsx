import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Palette Picker</h1>
        <nav className="space-x-4">
          <Link
            to="/"
            className={`font-medium ${
              pathname === '/' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
            }`}
          >
            Welcome
          </Link>
          <Link
            to="/palette"
            className={`font-medium ${
              pathname === '/palette' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
            }`}
          >
            Generator
          </Link>
          <Link
            to="/favorites"
            className={`font-medium ${
              pathname === '/favorites' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'
            }`}
          >
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
