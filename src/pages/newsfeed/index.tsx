import React from 'react'
import Articles from './Articles'
import Favourites from './Favourites'

function News() {
  return (
	<div className='flex'>
	  <Articles/>
	  <Favourites/>
	</div>
  )
}

export default News
