import axios from 'axios';
import {useState} from 'react'
import Logo from './images/pokedexLogo.png'
import './Apresentation.css'
import './PokemonContainer.css'

function App() {

  const [pokemonProp, setPokemonProp] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonAbility, setPokemonAbility] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);
  const [pokemon, setPokemon] = useState();
  const [message, setMessage] = useState();

  const fecthPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        setPokemonProp(response.data);
        setPokemonType(response.data.types)
        setPokemonAbility(response.data.abilities)
        setPokemonImage(response.data.sprites.other.dream_world)

        console.log(pokemonProp.name);
        console.log(pokemonType);
        console.log(pokemonImage);
      })

      .catch((error) => {
        console.log(error);
      });
    
    setMessage(pokemonProp);

  }

  return (
    <div className="containerGlobal">
      <section className="apresentation">
        <img src={Logo} alt="" />
        <input type="text" placeholder="Pokemon name" onChange={(e) => setPokemon(e.target.value)} />
        <button onClick={fecthPokemon}>Search</button>
      </section>

      <section className="resultContainer">
        {message && (
          <div className="pokemonResult">
            <section className="resultName">
              <h1>{pokemonProp.name}</h1>
            </section>

            <section className="resultType">
              <h2>Type</h2>
              <ul>
                {pokemonType.map((item) => {
                  return <li key={item.id}>{item.type.name}</li>
                })}
              </ul>
            </section>

            <section className="resultAbilities">
              <h2>Abilities</h2>
              <ul>
                {pokemonAbility.map((item) => {
                  return <li key={item.id}>{item.ability.name}</li>
                })}
              </ul>
              
            </section>

            <section className="resultImage">
              <img src={pokemonImage.front_default} alt="" />
            </section>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
