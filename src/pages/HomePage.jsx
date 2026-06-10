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
  const [filter, setFilter] = useState("all");


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

  const filteredMatches = matches.filter((match) => {
  const status = match.status?.toLowerCase() || "";

  const isCompleted =
    status.includes("won") ||
    status.includes("drawn") ||
    status.includes("abandoned") ||
    status.includes("tied");

  if (filter === "live") {
    return !isCompleted;
  }

  if (filter === "completed") {
    return isCompleted;
  }

  return true;
  });

  return (
    <div className="p-6">
      <Navbar />

      <div className="flex gap-3 mb-6">
  <button
    onClick={() => setFilter("all")}
    className="px-4 py-2 border rounded"
  >
    All
  </button>

  <button
    onClick={() => setFilter("live")}
    className="px-4 py-2 border rounded"
  >
    Live
  </button>

  <button
    onClick={() => setFilter("completed")}
    className="px-4 py-2 border rounded"
  >
    Completed
  </button>
</div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredMatches.map((match) => (
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