const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ========================
// Teams MySQL API
// ========================

// Add Team

app.post("/teams", (req, res) => {
  const { Team_Name, Region, Captain_Name } = req.body;

  const sql =
    "INSERT INTO Teams (Team_Name,Region,Captain_Name) VALUES (?,?,?)";

  db.query(sql, [Team_Name, Region, Captain_Name], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "Team Added To MySQL",
      });
    }
  });
});

// Show Teams

app.get("/teams", (req, res) => {
  db.query("SELECT * FROM Teams", (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// Search Teams By Region

app.get("/teams/search/:region", (req, res) => {
  const region = req.params.region;

  const sql = "SELECT Team_Name FROM Teams WHERE Region=?";

  db.query(sql, [region], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// ========================
// Tournament MySQL API
// ========================

// Add Tournament

app.post("/tournaments", (req, res) => {
  const { Tournament_Name, Game_Title, Total_Prize_Pool } = req.body;

  const sql =
    "INSERT INTO Tournaments (Tournament_Name,Game_Title,Total_Prize_Pool) VALUES (?,?,?)";

  db.query(
    sql,
    [Tournament_Name, Game_Title, Total_Prize_Pool],

    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: "Tournament Added To MySQL",
        });
      }
    },
  );
});

// Show Tournaments

app.get("/tournaments", (req, res) => {
  db.query(
    "SELECT * FROM Tournaments",

    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    },
  );
});

// Search Tournament LIKE

app.get("/tournaments/search/:game", (req, res) => {
  const game = req.params.game;

  const sql = "SELECT * FROM Tournaments WHERE Game_Title LIKE ?";

  db.query(sql, [`%${game}%`], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// ========================
// Matches MySQL API
// ========================

// Add Match Result

app.post("/matches", (req, res) => {
  const { Tournament_ID, Team1_ID, Team2_ID, Winner_ID } = req.body;

  const sql =
    "INSERT INTO Matches (Tournament_ID,Team1_ID,Team2_ID,Winner_ID) VALUES (?,?,?,?)";

  db.query(
    sql,

    [Tournament_ID, Team1_ID, Team2_ID, Winner_ID],

    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json({
          message: "Match Saved To MySQL",
        });
      }
    },
  );
});

// Show Matches with JOIN

app.get("/matches", (req, res) => {
  const sql = `
SELECT

Matches.Match_ID,

T1.Team_Name AS Team1,

T2.Team_Name AS Team2,

W.Team_Name AS Winner,

Tournaments.Tournament_Name


FROM Matches


JOIN Teams T1
ON Matches.Team1_ID = T1.Team_ID


JOIN Teams T2
ON Matches.Team2_ID = T2.Team_ID


JOIN Teams W
ON Matches.Winner_ID = W.Team_ID


JOIN Tournaments
ON Matches.Tournament_ID =
Tournaments.Tournament_ID

`;

  db.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// ========================
// Home API
// ========================

app.get("/", (req, res) => {
  res.send("E-Sports Tournament Backend Running 🎮");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
