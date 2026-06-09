import { useParams } from "react-router-dom";
import { getMatchById } from "../services/matchService";

function MatchDetailsPage() {
  const { id } = useParams();

  const match = getMatchById(id);

  if (!match) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Match Not Found
      </h1>

      <p>
        The requested match does not exist.
      </p>
    </div>
  );
}

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Match Details
      </h1>

      <div className="bg-white border rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-3">
          {match.team1} vs {match.team2}
        </h2>

        <p className="text-xl mb-2">
          Score: {match.score}
        </p>

        <p className="text-green-600 font-medium">
          {match.status}
        </p>
      </div>
    </div>
  );
}

export default MatchDetailsPage;