const PaletteCard = ({ palette }) => {
  return (
    <div className="flex gap-2">
      {palette.map((color, idx) => (
        <div
          key={idx}
          className="w-20 h-20 rounded"
          style={{ backgroundColor: color }}
          title={color}
        >
          <p className="text-xs text-white text-center pt-16">{color}</p>
        </div>
      ))}
    </div>
  );
};

export default PaletteCard;
