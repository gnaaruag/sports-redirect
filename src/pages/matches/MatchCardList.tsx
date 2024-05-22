import React from 'react';
import { useMatchesState } from '../../context/matches/context'
import MatchCard from './MatchCard.tsx'

export default function Matches() {
  const state: any = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state
  console.log("matches: ",matches);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches.map((match : any) =>{
        return(
          <MatchCard key={match.id} id={match.id} />
        )
      })}
    </>
  )
}