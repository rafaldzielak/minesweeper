import { FC } from "react";
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { MinesweeperWithHooks } from "./pages/MineSweeperWithHooks";

function App() {
  return (
    <div className='App'>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/game-with-hooks'>GameWithHooks</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/game-with-hooks/:username' element={<MinesweeperWithHooks />} />
          <Route path='/game-with-hooks' element={<MinesweeperWithHooks />} />
          <Route path='*' element={<Navigate replace to='/' />}></Route>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

const Home: FC = () => <h2>Minesweeper!</h2>;

export default App;
