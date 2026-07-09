import { useState, useEffect } from "react";
import axios from "axios";
import AddTeam from "./assets/AddTeam.jsx";
import AddTournament from "./AddTournament.jsx";
import AddMatch from "./AddMatch.jsx";

function App() {
  const [regionQuery, setRegionQuery] = useState("");
  const [teams, setTeams] = useState([]);

  const [gameQuery, setGameQuery] = useState("");
  const [tournaments, setTournaments] = useState([]);

  const [matches, setMatches] = useState([]);

  // Fetch match history log
  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/matches");
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  // Fetch teams by region
  const fetchTeams = async (regionVal) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/teams/search?region=${regionVal}`
      );
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Fetch tournaments by game
  const fetchTournaments = async (gameVal) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tournaments/search?game=${gameVal}`
      );
      setTournaments(response.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  // Fetch all on mount
  useEffect(() => {
    fetchMatches();
    fetchTeams("");
    fetchTournaments("");
  }, []);

  // Fetch teams dynamically as regionQuery changes
  useEffect(() => {
    fetchTeams(regionQuery);
  }, [regionQuery]);

  // Fetch tournaments dynamically as gameQuery changes
  useEffect(() => {
    fetchTournaments(gameQuery);
  }, [gameQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0c1b] to-[#161b33] text-white p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            🎮 E-Sports Tournament Organizer
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Manage teams, set up tournaments, and log matches in real-time.
          </p>
        </div>

        {/* Input Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <AddTeam onTeamAdded={() => fetchTeams(regionQuery)} />
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <AddTournament onTournamentAdded={() => fetchTournaments(gameQuery)} />
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
            <AddMatch onMatchSaved={fetchMatches} />
          </div>
        </div>

        <div className="border-t border-white/5 my-8"></div>

        {/* Search Results and Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Teams Table Section */}
          <div className="bg-white/[0.02] backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col h-[400px]">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
                👥 Search Teams by Region
              </h2>
              <p className="text-xs text-gray-500 mb-3">Type below to filter teams by their competition region</p>
              <input
                type="text"
                placeholder="Search Region (e.g. NA, EU)..."
                value={regionQuery}
                onChange={(e) => setRegionQuery(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="overflow-y-auto flex-grow rounded-xl border border-white/5">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.04] sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Team Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Region</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Captain Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {teams.length > 0 ? (
                    teams.map((team, idx) => (
                      <tr key={team.Team_ID || idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 text-sm font-medium text-white">{team.Team_Name}</td>
                        <td className="px-4 py-3.5 text-sm text-purple-300">{team.Region}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-300">{team.Captain_Name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-8 text-center text-gray-500 text-sm">
                        No teams found. Try another region filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tournaments Table Section */}
          <div className="bg-white/[0.02] backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col h-[400px]">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center gap-2">
                🏆 Search Tournaments by Game
              </h2>
              <p className="text-xs text-gray-500 mb-3">Type below to filter tournaments hosting specific game titles</p>
              <input
                type="text"
                placeholder="Search Game Title (e.g. Valorant)..."
                value={gameQuery}
                onChange={(e) => setGameQuery(e.target.value)}
                className="w-full bg-white/5 border border-blue-500/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="overflow-y-auto flex-grow rounded-xl border border-white/5">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.04] sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tournament Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Game Title</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Prize Pool</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tournaments.length > 0 ? (
                    tournaments.map((tournament, idx) => (
                      <tr key={tournament.Tournament_ID || idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 text-sm font-medium text-white">{tournament.Tournament_Name}</td>
                        <td className="px-4 py-3.5 text-sm text-cyan-300">{tournament.Game_Title}</td>
                        <td className="px-4 py-3.5 text-sm text-emerald-400 font-semibold">{tournament.Total_Prize_Pool}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-8 text-center text-gray-500 text-sm">
                        No tournaments found. Try another game filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Matches History Section */}
        <div className="bg-white/[0.02] backdrop-blur-lg p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col">
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 flex items-center gap-2">
              ⚔️ Match History Log
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Showing complete historical records with tournament, games, matching teams, and final victors.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.04]">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Match ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tournament Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Game Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Team 1</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">vs</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Team 2</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Victorious Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {matches.length > 0 ? (
                  matches.map((match, idx) => (
                    <tr key={match.Match_ID || idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400 font-mono">#{match.Match_ID}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{match.Tournament_Name}</td>
                      <td className="px-6 py-4 text-sm text-cyan-300">{match.Game_Title}</td>
                      <td className="px-6 py-4 text-sm text-purple-300">{match.Team_One}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-bold">VS</td>
                      <td className="px-6 py-4 text-sm text-blue-300">{match.Team_Two}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          🏆 {match.Winning_Team}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                      No matches registered yet. Fill in the Match Result form above to log a match.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

