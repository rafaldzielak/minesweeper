import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { MinesweeperWithHooks } from "./pages/MineSweeperWithHooks";
import { MinesweeperWithReactRedux } from "./pages/MineSweeperWithReactRedux";
import { MinesweeperWithUseReducer } from "./pages/MineSweeperWithUseReducer";
import { store } from "./store";

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
            <li>
              <Link to='/game-with-use-reducer'>Game With Use Reducer</Link>
            </li>
            <li>
              <Link to='/game-with-react-redux'>Game With React Redux</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/game-with-hooks/:username' element={<MinesweeperWithHooks />} />
          <Route path='/game-with-hooks' element={<MinesweeperWithHooks />} />
          <Route path='/game-with-use-reducer' element={<MinesweeperWithUseReducer />} />
          <Route
            path='/game-with-react-redux'
            element={
              <Provider store={store}>
                <MinesweeperWithReactRedux />
              </Provider>
            }
          />
          <Route path='*' element={<Navigate replace to='/' />}></Route>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

const Home: FC = () => <h2>Minesweeper!</h2>;

export default App;
