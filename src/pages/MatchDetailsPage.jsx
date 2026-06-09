import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

import { getMatchInfo } from "../services/matchService";

function MatchDetailsPage() {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatch = async () => {
      try {
        const data = await getMatchInfo(id);
        setMatch(data);
      } catch (err) {
        setError("Failed to load match details.");
      } finally {
        setLoading(false);
      }
    };

    loadMatch();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Match Details
      </h1>

      <div className="bg-white border rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {match.team1} vs {match.team2}
        </h2>

        <p className="mb-2">
          <strong>Format:</strong> {match.format}
        </p>

        <p className="mb-2">
          <strong>Description:</strong> {match.description}
        </p>

        <p className="mb-2">
          <strong>Status:</strong> {match.state}
        </p>

        <p>
          <strong>Venue:</strong> {match.venue}
        </p>
      </div>
    </div>
  );
}

export default MatchDetailsPage;