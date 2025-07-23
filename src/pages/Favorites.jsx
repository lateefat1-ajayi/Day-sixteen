import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaCopy } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedPalettes = JSON.parse(localStorage.getItem("favoritePalettes")) || [];
    setFavorites(savedPalettes);
  }, []);

  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied to clipboard`);
  };

  const deletePalette = (index) => {
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);
    localStorage.setItem("favoritePalettes", JSON.stringify(updated));
    toast.info("Palette removed");
  };

  const clearAll = () => {
    setFavorites([]);
    localStorage.removeItem("favoritePalettes");
    toast.warn("All favorites cleared");
  };

  return (
    <section className="min-h-screen px-4 py-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Your Favorite Palettes</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No palettes saved yet.</p>
      ) : (
        <>
          <button
            onClick={clearAll}
            className="mb-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Clear All Favorites
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((palette, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">Palette {index + 1}</h4>
                  <button
                    onClick={() => deletePalette(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Render each color object (base + its shades) */}
                <div className="space-y-2">
                  {palette.map((colorObj, colorIndex) => (
                    <div key={colorIndex}>
                      <p className="text-sm text-gray-600 mb-1">Base: <span className="font-mono">{colorObj.base}</span></p>
                      <div className="flex gap-1">
                        {colorObj.shades.map((shade, shadeIndex) => (
                          <div
                            key={shadeIndex}
                            className="flex-1 h-10 rounded cursor-pointer relative group"
                            style={{ backgroundColor: shade }}
                            onClick={() => copyColor(shade)}
                          >
                            <span className="absolute bottom-1 left-1 text-xs text-white bg-black bg-opacity-30 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                              {shade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
