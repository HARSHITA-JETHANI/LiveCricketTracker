import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

import {
  getMatchInfo,
  getMatchScorecard,
} from "../services/matchService";


function MatchDetailsPage() {
  const { id } = useParams();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scorecard, setScorecard] = useState([]);
  const [expandedInnings, setExpandedInnings] = useState(0);

  useEffect(() => {
    const loadMatch = async () => {
      try {
        const matchData = await getMatchInfo(id);

        const scoreData =await getMatchScorecard(id);

        setMatch(matchData);
        setScorecard(scoreData);
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
      <Link
        to="/"
        className="inline-block mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back to Matches
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        Match Details
      </h1>

      <div className="bg-white border rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {match.team1} vs {match.team2}
        </h2>

        <p className="mb-2">
          <strong>Description:</strong> {match.description}
        </p>

        <p className="mb-2">
          <strong>Series:</strong> {match.series}
        </p>

        <p className="mb-2">
          <strong>Format:</strong> {match.format}
        </p>

        <p className="mb-2">
          <strong>State:</strong> {match.state}
        </p>

        <p className="mb-2">
          <strong>Status:</strong> {match.status}
        </p>

        <p className="mb-2">
          <strong>Venue:</strong> {match.venue}
        </p>

        <p>
          <strong>City:</strong> {match.city}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">
          Scorecard
        </h2>

        {scorecard.map((innings, index) => (
  <div
    key={index}
    className="bg-white border rounded-xl shadow-md mb-4"
  >
    <button
      onClick={() =>
        setExpandedInnings(
          expandedInnings === index
            ? null
            : index
        )
      }
      className="w-full text-left p-4"
    >
      <h3 className="text-xl font-semibold">
        {expandedInnings === index
          ? "▼"
          : "▶"}{" "}
        {innings.innings}
      </h3>

      <p>
        {innings.score}
        {" "}
        ({innings.overs} overs)
      </p>
    </button>

    {expandedInnings === index && (
      <div className="p-4 border-t">
  <h4 className="font-semibold mb-2">
    Batters
  </h4>

  <div className="overflow-x-auto">
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2 text-left">
            Player
          </th>

          <th className="border p-2">
            R
          </th>

          <th className="border p-2">
            B
          </th>

          <th className="border p-2">
            4s
          </th>

          <th className="border p-2">
            6s
          </th>

          <th className="border p-2">
            SR
          </th>
        </tr>
      </thead>

      <tbody>
        {innings.batsmen.map(
          (player, playerIndex) => (
            <tr key={playerIndex}>
              <td className="border p-2">
                {player.name}
              </td>

              <td className="border p-2 text-center">
                {player.runs}
              </td>

              <td className="border p-2 text-center">
                {player.balls}
              </td>

              <td className="border p-2 text-center">
                {player.fours}
              </td>

              <td className="border p-2 text-center">
                {player.sixes}
              </td>

              <td className="border p-2 text-center">
                {player.strkrate}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>

  <h4 className="font-semibold mt-6 mb-2">
  Bowlers
</h4>

<div className="overflow-x-auto">
  <table className="w-full border">
    <thead>
      <tr>
        <th className="border p-2 text-left">
          Bowler
        </th>

        <th className="border p-2">
          O
        </th>

        <th className="border p-2">
          M
        </th>

        <th className="border p-2">
          R
        </th>

        <th className="border p-2">
          W
        </th>

        <th className="border p-2">
          Econ
        </th>
      </tr>
    </thead>

    <tbody>
      {innings.bowlers?.map(
        (player, playerIndex) => (
          <tr key={playerIndex}>
            <td className="border p-2">
              {player.name}
            </td>

            <td className="border p-2 text-center">
              {player.overs}
            </td>

            <td className="border p-2 text-center">
              {player.maidens}
            </td>

            <td className="border p-2 text-center">
              {player.runs}
            </td>

            <td className="border p-2 text-center">
              {player.wickets}
            </td>

            <td className="border p-2 text-center">
              {player.economy}
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
</div>
      </div>

      )}
    </div>
  ))}
        </div>

</div>
);
}

export default MatchDetailsPage;