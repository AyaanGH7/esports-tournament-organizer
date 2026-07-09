import { useState } from "react";
import axios from "axios";

function AddTeam({ onTeamAdded }) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [captain, setCaptain] = useState("");

  const addTeam = async (e) => {
    e.preventDefault();
    if (!name || !region || !captain) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/teams", {
        Team_Name: name,
        Region: region,
        Captain_Name: captain,
      });

      alert("Team Added 🎮");
      setName("");
      setRegion("");
      setCaptain("");
      if (onTeamAdded) onTeamAdded();
    } catch (error) {
      console.error("Error adding team:", error);
      alert("Failed to add team.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
        Add Team
      </h2>
      <form onSubmit={addTeam} className="space-y-3">
        <input
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Region (e.g. NA, EU, Asia)"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />

        <input
          placeholder="Captain Name"
          value={captain}
          onChange={(e) => setCaptain(e.target.value)}
          className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />

        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
        >
          Add Team
        </button>
      </form>
    </div>
  );
}

export default AddTeam;

