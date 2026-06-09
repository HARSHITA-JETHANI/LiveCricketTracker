import { Link } from "react-router-dom";

function MatchCard({ match }) {
  return (
    <Link to={`/match/${match.id}`}>
      <div className="bg-white border rounded-xl p-5 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-3">
          🏏 {match.team1} vs {match.team2}
        </h2>

        <p className="text-2xl font-bold mb-2">
          {match.score}
        </p>

        <p className="text-green-600 font-medium">
          {match.status}
        </p>
      </div>
    </Link>
  );
}

export default MatchCard;