import React , {useState}from 'react'
import './BingoCell.css'
function BingoCell({number,isMarked,onClick}) {
    
  return (
    <div className={`bingo-cell ${isMarked? 'marked': ''}`} onClick={onClick}>
        {number}
    </div>
  )
}

export default BingoCell