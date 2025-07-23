import { useState, useEffect } from "react";
import { generateRandomPalette } from "../utils/generateShades";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [palettes, setPalettes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initialPalette = generateRandomPalette();
    setPalettes(initialPalette);
  }, []);

  const handleGenerate = () => {
    const newPalette = generateRandomPalette();
    setPalettes(newPalette);
    toast.success("🎨 New palette generated!");
  };

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    toast.info(`Copied ${hex} to clipboard`);
  };

  const handleSave = () => {
    const savedPalettes = JSON.parse(localStorage.getItem("favoritePalettes")) || [];
    savedPalettes.push(palettes);
    localStorage.setItem("favoritePalettes", JSON.stringify(savedPalettes));
    toast.success("❤️ Palette saved to favorites");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Palette Picker</h1>
        <p className="text-lg md:text-xl mb-6">Generate beautiful color palettes with similar shades.</p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition">
            Generate
          </button>
          <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition">
            Save to Favorites
          </button>
          <button onClick={() => navigate("/favorites")} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl transition">
            View Favorites
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {palettes.map((colorSet, index) => (
            <div key={index} className="rounded-xl overflow-hidden border border-slate-600 shadow-md">
              {colorSet.shades.map((shade, i) => (
                <div
                  key={i}
                  className="h-20 flex items-center justify-between px-3 cursor-pointer group transition-all"
                  style={{ backgroundColor: shade }}
                  onClick={() => handleCopy(shade)}
                >
                  <span className="text-sm font-mono text-white drop-shadow">{shade}</span>
                  <FaCopy className="opacity-0 group-hover:opacity-100 transition text-white" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
