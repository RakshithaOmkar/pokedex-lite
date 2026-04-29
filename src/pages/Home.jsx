import { useEffect, useState } from "react";
import { fetchPokemonList } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import Modal from "../components/Modal";

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const offset = page * 20;
        const list = await fetchPokemonList(20, offset);

        const detailedData = await Promise.all(
          list.map(async (p) => {
            const res = await fetch(p.url);
            const data = await res.json();

            return {
              name: p.name,
              url: p.url,
              types: data.types.map((t) => t.type.name),
            };
          })
        );

        setPokemon(detailedData);
      } catch {
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  const handleCardClick = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  const filteredPokemon = pokemon
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      selectedType ? p.types.includes(selectedType) : true
    );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Pokedex Lite</h1>

      {/* CONTROLS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="">All Types</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
        </select>
      </div>

      {/* STATES */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && filteredPokemon.length === 0 && (
        <p style={{ textAlign: "center" }}>No Pokémon found</p>
      )}

      {/* GRID */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredPokemon.map((p, index) => (
          <PokemonCard
            key={index}
            name={p.name}
            url={p.url}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          style={{
            padding: "10px 15px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#28a745",
            color: "white",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>

      <Modal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default Home;