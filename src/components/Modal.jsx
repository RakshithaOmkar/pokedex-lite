function Modal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />

        <p><b>HP:</b> {pokemon.stats[0].base_stat}</p>
        <p><b>Attack:</b> {pokemon.stats[1].base_stat}</p>

        <p>
          <b>Abilities:</b>{" "}
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </p>

        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;