import matches from "../data/matches";
import api from "./api";


export function getAllMatches() {
  return matches;
}

export function getMatchById(id) {
  return matches.find(
    (match) => match.id === Number(id)
  );
}

export async function getLiveMatches() {
  const response = await api.get("/matches/v1/live");

  const liveMatches = [];

  response.data.typeMatches.forEach((typeMatch) => {
    typeMatch.seriesMatches?.forEach((series) => {
      const matches =
        series.seriesAdWrapper?.matches || [];

      matches.forEach((match) => {
        liveMatches.push({
          id: match.matchInfo.matchId,

          team1:
            match.matchInfo.team1.teamName,

          team2:
            match.matchInfo.team2.teamName,

          status:
            match.matchInfo.status,

          score:
            match.matchScore?.team1Score
              ?.inngs1
              ? `${match.matchScore.team1Score.inngs1.runs}/${match.matchScore.team1Score.inngs1.wickets}`
              : "Score unavailable",
        });
      });
    });
  });

  return liveMatches;
}

export async function getMatchInfo(matchId) {
  const response = await api.get(
    `/mcenter/v1/${matchId}`
  );
  console.log(response.data);
  const info = response.data.matchInfo;

  return {
    id: info.matchId,

    team1: info.team1.teamName,

    team2: info.team2.teamName,

    format: info.matchFormat,

    description: info.matchDescription,

    state: info.state,

    venue: info.venue?.ground || "Unknown Venue",
  };
}
