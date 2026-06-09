import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import { getLiveMatches } from "../services/matchService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  const [matches, setMatches] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


  useEffect(() => {
    const loadMatches = async () => {
    try {
      const data = await getLiveMatches();

      setMatches(data);
    } catch (err) {
      setError("Failed to load live matches.");
    } finally {
      setLoading(false);
    }
  };

  loadMatches();
  }, []);

  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

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