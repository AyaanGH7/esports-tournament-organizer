import { useState } from "react";
import axios from "axios";

function AddMatch() {
  const [tid, setTid] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [winner, setWinner] = useState("");

  const saveMatch = async () => {
    await axios.post("http://localhost:5000/matches", {
      Tournament_ID: tid,
      Team1_ID: team1,
      Team2_ID: team2,
      Winner_ID: winner,
    });

    alert("Match Result Saved ⚔️");
  };

  return (
    <div>
      <h2>Match Result</h2>

      <input
        placeholder="Tournament ID"
        onChange={(e) => setTid(e.target.value)}
      />

      <br />

      <input
        placeholder="Team 1 ID"
        onChange={(e) => setTeam1(e.target.value)}
      />

      <br />

      <input
        placeholder="Team 2 ID"
        onChange={(e) => setTeam2(e.target.value)}
      />

      <br />

      <input
        placeholder="Winner ID"
        onChange={(e) => setWinner(e.target.value)}
      />

      <br />

      <button onClick={saveMatch}>Save Match</button>
    </div>
  );
}

export default AddMatch;
