import { useState } from "react";
import axios from "axios";

function AddMatch({ onMatchSaved }) {
  const [tid, setTid] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [winner, setWinner] = useState("");

  const saveMatch = async (e) => {
    e.preventDefault();
    if (!tid || !team1 || !team2 || !winner) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/matches", {
        Tournament_ID: tid,
        Team1_ID: team1,
        Team2_ID: team2,
        Winner_ID: winner,
      });

      alert("Match Result Saved ⚔️");
      setTid("");
      setTeam1("");
      setTeam2("");
      setWinner("");
      if (onMatchSaved) onMatchSaved();
    } catch (error) {
      console.error("Error saving match:", error);
      alert("Failed to save match result.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">
        Match Result
      </h2>
      <form onSubmit={saveMatch} className="space-y-3">
        <input
          placeholder="Tournament ID"
          value={tid}
          onChange={(e) => setTid(e.target.value)}
          className="w-full bg-white/5 border border-red-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Team 1 ID"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          className="w-full bg-white/5 border border-red-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Team 2 ID"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          className="w-full bg-white/5 border border-red-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Winner ID"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          className="w-full bg-white/5 border border-red-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />

        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/20 active:scale-[0.98]"
        >
          Save Match
        </button>
      </form>
    </div>
  );
}

export default AddMatch;

