import React, { useEffect } from "react";
import { useMatchesState, useMatchesDispatch } from "../../context/matches/context";
import MatchCard from "./MatchCard.tsx";
import { SyncLoader } from "react-spinners";
import { fetchMatches } from "../../context/matches/actions";
import { Match } from "../../context/matches/types";

export default function Matches() {
  const state: any = useMatchesState();
  const matchDispatch = useMatchesDispatch();
  const { matches, isLoading, isError, errorMessage } = state;

  useEffect(() => {
    fetchMatches(matchDispatch);
  }, [matchDispatch]);

  const filterMatches = (matchData: Match[]): Match[] => {
    const userData = localStorage.getItem('userData');
    if (!userData) return matchData;

    const { preferences } = JSON.parse(userData);
    if (preferences.selectedSports.length === 0 || preferences.selectedTeams.length === 0) return matchData;

    const { selectedSports, selectedTeams } = preferences;

    return matchData.filter((match: Match) => {
      const sportMatch = selectedSports.includes(match.sportName);
      const teamMatch = match.teams.some(team => selectedTeams.includes(team.name));
      return sportMatch || teamMatch;
    });
  };

  const filteredMatches = filterMatches(matches);
  console.log(filteredMatches)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <SyncLoader color="#3b82f6" size={10} />
      </div>
    );
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="overflow-x-scroll flex">
      {filteredMatches.map((match: any) => (
        <MatchCard key={match.id} id={match.id} />
      ))}
    </div>
  );
}
