import { useEffect, useState } from "react";

function PokemonCard({ name, url, onClick }) {
  const id = url.split("/")[6];
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favs.includes(name));
  }, [name]);

  const handleFavorite = (e) => {
    e.stopPropagation();

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favs.includes(name)) {
      favs = favs.filter((f) => f !== name);
      setIsFav(false);
    } else {
      favs.push(name);
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
  };

  return (
    <div
      onClick={() => onClick(url)}
      style={{
        width: "180px",
        padding: "15px",
        margin: "10px",
        borderRadius: "15px",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100px", height: "100px" }}
      />

      <h3 style={{ textTransform: "capitalize", margin: "10px 0" }}>
        {name}
      </h3>

      <button
        onClick={handleFavorite}
        style={{
          fontSize: "20px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default PokemonCard;