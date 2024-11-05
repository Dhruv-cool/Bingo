import { useEffect } from "react"
import React,{useState} from 'react'
import './BingoDisplay.css'
const DisplayNumbers=({items,interval,isActive})=>{
    const [currentindex, setcurrentindex] = useState(0)
    const playsound=(number)=>{
       const audio= new Audio(`/Sounds/${number}.wav`)
       audio.play();
    };
    useEffect(()=>{
        if(items.length===0 || !isActive)return;
        playsound(items[currentindex]);
        const timer=setInterval(()=>{
            setcurrentindex((prevIndex) => {
                // If we reached the end of the array, stop the interval
                if (prevIndex >= items.length - 1) {
                  clearInterval(timer);
                  return prevIndex;
                }
                const nextIndex = prevIndex + 1;
                playsound(items[nextIndex]); // Play sound for the next item
                return nextIndex;
        });
    },interval);
    return () => clearInterval(timer); // Cleanup on unmount
}, [items, interval,isActive,currentindex]);
return (
    <div>
      <p className="display_size">{isActive && items[currentindex]}</p>
    </div>
  );
}

function BingoDisplay({Displaynumber,isActive}) {
    const timeInterval=5000
  return (
    <div className='Bingo-display'>
        <h2>Generated Numbers</h2>
        <DisplayNumbers items={Displaynumber} interval={timeInterval} isActive={isActive}/>
    </div>
  )
}

export default BingoDisplay