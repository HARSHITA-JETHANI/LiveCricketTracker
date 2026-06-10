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

  const data = response.data;

  return {
    id: data.matchid,

    team1: data.team1.teamname,

    team2: data.team2.teamname,

    format: data.matchformat,

    description: data.matchdesc,

    state: data.state,

    status: data.status,

    venue: data.venueinfo?.ground || "Unknown Venue",

    city: data.venueinfo?.city || "",

    series: data.seriesname,
  };
}

export async function getMatchScorecard(matchId) {
  const response = await api.get(
    `/mcenter/v1/${matchId}/scard`
  );

console.log(response.data.scorecard[0].bowler[0]);
  return response.data.scorecard.map((innings) => ({
    innings: innings.batteamname,

    score: `${innings.score}/${innings.wickets}`,

    overs: innings.overs,

    batsmen: innings.batsman,

    bowlers: innings.bowler,
    
  })
);
}

