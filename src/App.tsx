import "./App.css";
import { Scoreboard } from "./components/Scoreboard";
import { Top } from "./components/Top/Top";

function App() {
  return (
    <div className='App'>
      <Top feature='Flag' firstAction='ctrl' secondAction='click'>
        Minesweeper
      </Top>
      <Scoreboard time='000' levels={["beginner", "intermediate", "expert"]} mines='010' onReset={() => {}} />
    </div>
  );
}

export default App;
