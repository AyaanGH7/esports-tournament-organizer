import { useState } from "react";
import axios from "axios";

function AddTeam() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [captain, setCaptain] = useState("");

  const addTeam = async () => {
    await axios.post("http://localhost:5000/teams", {
      Team_Name: name,
      Region: region,
      Captain_Name: captain,
    });

    alert("Team Added 🎮");
  };

  return (
    <div>
      <h2>Add Team</h2>

      <input
        placeholder="Team Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input placeholder="Region" onChange={(e) => setRegion(e.target.value)} />

      <br />

      <input
        placeholder="Captain Name"
        onChange={(e) => setCaptain(e.target.value)}
      />

      <br />

      <button onClick={addTeam}>Add Team</button>
    </div>
  );
}

export default AddTeam;
