import "./App.css";
import { Top } from "./components/Top/Top";

function App() {
  return (
    <div className='App'>
      <Top feature='Flag' firstAction='ctrl' secondAction='click'>
        Minesweeper
      </Top>
    </div>
  );
}

export default App;
