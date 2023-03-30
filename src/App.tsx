import { PokerChip, MagnifyingGlass, Hash } from "phosphor-react";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Card } from "./components/Card";
import { Loading } from "./components/Loading";
import viteLogo from "/vite.svg";

interface IPokemon {
  name: string;
  url: string;
}

function App() {
  /*const [name, setName] = useState("");

  const [count, setCount] = useState(0)

  const [name, setname] = useState("hugo");

  const [person, setPerson] = useState({
    name: "hugo",
    age: 19
  })
  console.log(name);*/
  const [Pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState (true);
  const [input, setInput] = useState("");


  async function fetchData() {
    const data = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=250")
      .then((response) => response.json())
    .finally(() => setLoading(false))

    setPokemon(data.results);
  }

  fetchData();
  
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading/>

  return (
    <div className="flex flex-col mb-12">
      <header className="flex flex-col bg-red-500 w-full items-start px-6 py-4 drop-shadow-lg">
        <div className="flex items-center gap-4 text-white font-bold py-4">
          <PokerChip size={44} />

          <h1 className="text 3-1 font-extrabold">Pokedex</h1>
        </div>

        <div className="flex w-full gap-12 items-center justify-between">
          <div className="flex flex-1 border bg-white rounded-full items-center">
            <span className="flex pl-4">
              <MagnifyingGlass
                size={25}
                weight="bold"
                className="text text-red-700"
              />
            </span>

            <input
              type="text"
              value={input}
              onChange ={(Event) => setInput(Event.target.value)}
              placeholder="insira o nome de um Pokémon"
              className="w-full py-3 px-6 rounded-full text-red-700 placeholder:text-gray-600 focus:outline-none"
            />
          </div>
          <Hash
            size={46}
            className="bg-white text-red-600 rounded-full p-3"
            weight="bold"
          />
        </div>
      </header>
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 pt-12 gap-3 mx-auto">
        {Pokemon.filter((filteredItem)=> filteredItem.name.includes(input)).map((item, index) => (
          <Card 
          key={item.name}
          name={item.name} 
          position={item.url}/>
        ))}
      </main>
    </div>
  );
}

export default App;
