import { useState } from "react";
import axios from "axios";

function AddTournament({ onTournamentAdded }) {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [prize, setPrize] = useState("");

  const addTournament = async (e) => {
    e.preventDefault();
    if (!name || !game || !prize) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/tournaments", {
        Tournament_Name: name,
        Game_Title: game,
        Total_Prize_Pool: prize,
      });

      alert("Tournament Added 🏆");
      setName("");
      setGame("");
      setPrize("");
      if (onTournamentAdded) onTournamentAdded();
    } catch (error) {
      console.error("Error adding tournament:", error);
      alert("Failed to add tournament.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
        Add Tournament
      </h2>
      <form onSubmit={addTournament} className="space-y-3">
        <input
          placeholder="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-blue-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Game Title (e.g. Valorant)"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          className="w-full bg-white/5 border border-blue-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Total Prize Pool (e.g. $10,000)"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          className="w-full bg-white/5 border border-blue-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
        >
          Add Tournament
        </button>
      </form>
    </div>
  );
}

export default AddTournament;

