import react,{useState} from 'react';
import './App.css';
import BingoBoard from './Components/BingoBoard';
import BingoDisplay from './Components/BingoDisplay';


const ShuffleArray=(array)=>{
  if(!array || !array.length)return [];
  for (let i=array.length - 1;i>0;i--){
    const j=(Math.floor(Math.random()*(i+1)));
    [array[i],array[j]]=[array[j],array[i]]
  }
  return array;
}
const generateNumbers=()=>{
  let numbers=[];
  for(let i=1;i<=75;i++){
      numbers.push(i);
  }
  numbers=ShuffleArray(numbers)
  return numbers.slice(0,25);
}
const generateNumbersDisplay=()=>{
  let Displaynumber=[];
  for(let i=1;i<=75;i++){
    Displaynumber.push(i);
  }
  Displaynumber=ShuffleArray(Displaynumber)
  return Displaynumber;
}

function App() {
  const [numbers, setNumbers] = useState(generateNumbers())
  const [markedCell, setmarkedCell] = useState(Array(25).fill(false))
  const [Displaynumber, setDisplaynumber] = useState(generateNumbersDisplay)
  const [isActive, setisActive] = useState(false)
  const resetGame=()=>{
    if (window.confirm('Are you sure you want to reset the game? All progress will be lost.')){
    setNumbers(generateNumbers)
    setmarkedCell(Array(25).fill(false))
    setDisplaynumber(generateNumbersDisplay)
    setisActive(false)
    }
  }
  const handleStart=()=>{
     setisActive(true);
     setDisplaynumber(generateNumbersDisplay)
  }
  return (
    <div className="App">
      <h1>Bingo Game</h1>
     
      <BingoBoard numbers={numbers} markedCell={markedCell} setmarkedCell={setmarkedCell} setisActive={setisActive} isActive={isActive}/>
      <div className="button_reset_start">
        <button className='button_class' onClick={handleStart}>Start Game</button>
      <button className='button_class' onClick={resetGame} >Reset Game</button>
      </div>
      
      <BingoDisplay Displaynumber={Displaynumber} isActive={isActive}/>
    </div>
  );
}

export default App;
