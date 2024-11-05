import React, { useEffect, useState } from 'react'
import BingoCell from './BingoCell'
import './BingoBoard.css'

import Customalert from './Customalert'
function BingoBoard({numbers,markedCell,setmarkedCell,setisActive,isActive}) {
    const [bingo, setbingo] = useState(false)
    const [showcustomalert, setshowcustomalert] = useState(false)
    const handleClick = (index) => {
        if(isActive){
        const newMarkedCells = [...markedCell];
        newMarkedCells[index] = !newMarkedCells[index];
        setmarkedCell(newMarkedCells);
        }
        else{
            alert('Start Game')
        }
      };

  const checkForBingo = (markedCell) => {
    const size = 5;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (markedCell.slice(i * size, i * size + size).every(Boolean)) {
       // setbingo(true);
        return true;
      }
      if (markedCell.filter((_, idx) => idx % size === i).every(Boolean)) {
       //setbingo(true);
        return true;
      }
    }

    // Check diagonals
    if (markedCell.filter((_, idx) => idx % (size + 1) === 0).every(Boolean)) {
      //setbingo(true);
      return true ;
    }
    if (markedCell.filter((_, idx) => (idx % (size - 1) === 0 && idx !== 0 && idx !== markedCell.length - 1)).every(Boolean)) {
      //setbingo(true);
      return true;
    }
    return false
  };
 useEffect(()=>{
    if(checkForBingo(markedCell)){
        setbingo(true);
    }
 },[markedCell])
  
  useEffect(()=>{
    if(bingo){
        setshowcustomalert(true)
        const audio=new Audio('/Sounds/Bingo.mp3')
        audio.play();
        setbingo(false);
        setmarkedCell(Array(25).fill(false));
        setisActive(false)
    }
  },[bingo,markedCell,isActive,setisActive,setmarkedCell]);
  return (
    <div>
    <div className={`Bingo-Board ${showcustomalert ? 'blurred':''}`}>
        {numbers.map((number,index) => (
         <BingoCell key={index} number={number}
         isMarked={markedCell[index]}
         onClick={()=>{handleClick(index);
           
         }}
         />
        ))}
    </div>
    {showcustomalert && (
      <Customalert
      message={"BINGO"}
      onClose={()=>{setshowcustomalert(false)}}/>
    )}
    </div>
  )
}

export default BingoBoard