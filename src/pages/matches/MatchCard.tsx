import { useEffect, useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { API_ENDPOINT } from '../../config/constants'
import { Match } from '../../context/matches/types.ts'
import React from 'react'

interface Props {
  id : number
}



export default function MatchCard(props : Props, State : Match) {
  const [match,setMatch] = useState<Match>(State)
  const [isRotating, setIsRotating] = useState(false);

  const fetchMatch = async (id : number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matche');
      }

      const data = await response.json();

      setMatch(data)
      console.log(match);
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  }

  useEffect(()=>{
    fetchMatch(props.id);
  }, [props.id]);

  const handleIconClick = async () => {
    setIsRotating(true);
    await fetchMatch(props.id);
    setTimeout(() => setIsRotating(false), 1000); // Adjust duration to match your CSS animation duration
  };

  return (
    <>
      {match.isRunning && <div className='border-2 mx-2 mb-1 rounded border-black p-2 bg-gray-300 dark:bg-slate-900'>
         <div className=' flex justify-between w-48'>
           <h3 className='font-bold text-black-800'>{match.sportName}</h3>
           <ArrowPathIcon
              className={`h-6 w-6 transition-all ease-in-out ${isRotating ? 'rotate-90' : ''}`}
              aria-hidden="true"
              onClick={handleIconClick}
            />
         </div>
         <p className='text-sm text-gray-600 dark:text-blue-500'>{match.location}</p>
         <div className='flex flex-col my-2'>
           <div className='flex justify-between mt-1'>
             <p className='font-semibold'>{match.teams[0].name}</p>
             <p className='font-semibold'>{match.score[match.teams[0].name]}</p>
           </div>
           <div className='flex justify-between'>
             <p className='font-semibold'>{match.teams[1].name}</p>
             <p className='font-semibold'>{match.score[match.teams[1].name]}</p>
           </div>
         </div>
       </div>}
    </>
  )
}