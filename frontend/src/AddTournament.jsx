import { useState } from "react";
import axios from "axios";

function AddTournament() {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [prize, setPrize] = useState("");

  const addTournament = async () => {
    await axios.post("http://localhost:5000/tournaments", {
      Tournament_Name: name,
      Game_Title: game,
      Total_Prize_Pool: prize,
    });

    alert("Tournament Added 🏆");
  };

  return (
    <div>
      <h2>Add Tournament</h2>

      <input
        placeholder="Tournament Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        placeholder="Game Title"
        onChange={(e) => setGame(e.target.value)}
      />

      <br />

      <input
        placeholder="Prize Pool"
        onChange={(e) => setPrize(e.target.value)}
      />

      <br />

      <button onClick={addTournament}>Add Tournament</button>
    </div>
  );
}

export default AddTournament;
