import React from 'react';
import { useMatchesState } from '../../context/matches/context'
import MatchCard from './MatchCard.tsx'
import { SyncLoader } from 'react-spinners';

export default function Matches() {
  const state: any = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state

  if (matches.length === 0 && isLoading) {
    return <div className='flex justify-center items-center'><SyncLoader color="#3b82f6" size={10}/></div>

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