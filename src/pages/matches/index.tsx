import { useEffect } from 'react'
import { useMatchesDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/actions'
import MatchCardList from './MatchCardList'
import React from 'react'

export default function LiveMatch() {
  const matchDispatch = useMatchesDispatch()

  useEffect(()=>{
    fetchMatches(matchDispatch)
  },[matchDispatch])

  return (
    <div>
      <h1 className='text-gray-900 font-bold text-xl'>Live Games</h1>
      <div className='mt-2 justify-start flex items-center w-full'>
        <MatchCardList />
      </div>
    </div>
  )
}