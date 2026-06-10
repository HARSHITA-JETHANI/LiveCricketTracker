import { Link } from "react-router-dom";

function MatchCard({ match }) {
  const statusText = match.status?.toLowerCase() || "";

    let badgeText = "LIVE";
    let badgeClass = "bg-green-100 text-green-800";

    if (
      statusText.includes("won") ||
      statusText.includes("drawn") ||
      statusText.includes("abandoned") ||
      statusText.includes("tied")
    ) {
      badgeText = "COMPLETED";
      badgeClass = "bg-gray-100 text-gray-800";
    }

  return (
    <Link to={`/match/${match.id}`}>
      <div className="bg-white border rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 h-full">
        <h2 className="text-2xl font-bold mb-4">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${badgeClass}`}
          >
            {badgeText}
          </span>
          🏏 {match.team1} vs {match.team2}
        </h2>

        <p className="text-4xl font-bold mb-3 text-indigo-700">
          {match.score}
        </p>

        <p className="text-gray-700 font-medium leading-relaxed">
          {match.status}
        </p>
        
      </div>
    </Link>
  );
}
console.log(status);

export default MatchCard;