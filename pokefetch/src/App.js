import React from 'react';
import './App.css';

const PokemonDisplay = props => {
  if (props.pokemon.name !== undefined) {
    return (
      <div>
        <h1 class="pokemonName">{props.pokemon.name}</h1>
        <span>Types: </span>
        {props.pokemon.types.map((type, i) => {
          if (i < props.pokemon.types.length - 1) {
            return <span key={type.type.name}>{type.type.name}, </span>;
          } else {
            return <span key={type.type.name}>{type.type.name}</span>;
          }
        })}
        <br />
        <img
          class="sprite"
          src={props.pokemon.sprites.front_default}
          alt="pokemon sprite"
        />
      </div>
    );
  } else {
    return null;
  }
};

class App extends React.Component {
  state = {
    pokemon: {},
    target: 'gengar'
  };

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.target}`)
      .then(response => response.json())
      .then(pokemon => this.setState({ pokemon }));
  }

  getPokemon(pokemon) {
    this.setState({ target: pokemon });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.getPokemon}>
          <label>
            Pokemon: <input type="text" />
          </label>
        </form>
        <PokemonDisplay pokemon={this.state.pokemon} />
      </div>
    );
  }
}

export default App;
