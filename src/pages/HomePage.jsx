import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import matches from "../data/matches";

function HomePage() {
  return (
    <div className="p-6">
      <Navbar />

      <div className="grid gap-4 md:grid-cols-2">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;