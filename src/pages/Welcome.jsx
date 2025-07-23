import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 text-indigo-600">Welcome to Palette Picker 🎨</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Generate beautiful color palettes for your next project. Click below to start creating or view your favorite saved palettes.
      </p>
      <div className="flex gap-4">
        <Link
          to="/palette"
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Generate Palette
        </Link>
        <Link
          to="/favorites"
          className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-xl hover:bg-indigo-50 transition"
        >
          View Favorites
        </Link>
      </div>
    </section>
  );
};

export default Welcome;
