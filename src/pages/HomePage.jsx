import MatchCard from "../components/MatchCard";
import matches from "../data/matches";

function HomePage() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          Live Cricket Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Track ongoing cricket matches.
        </p>
      </header>

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