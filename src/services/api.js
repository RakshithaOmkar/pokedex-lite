export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};