import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import { getAllMatches } from "../services/matchService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function HomePage() {
  const [matches, setMatches] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


  useEffect(() => {
    setTimeout(() => {
      const data = getAllMatches();

      setMatches(data);
      setLoading(false);
    }, 1500);
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