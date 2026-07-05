import AddTeam from "./assets/AddTeam.jsx";
import AddTournament from "./AddTournament.jsx";
import AddMatch from "./AddMatch.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-gray-900 text-white p-10">
      <h1 className="text-5xl font-bold text-center text-cyan-400 mb-12">
        🎮 E-Sports Tournament Organizer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-400">
          <AddTeam />
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-blue-400">
          <AddTournament />
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-red-400">
          <AddMatch />
        </div>
      </div>
    </div>
  );
}

export default App;
