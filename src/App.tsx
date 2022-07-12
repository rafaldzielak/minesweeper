import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Legend } from "./components/Legend/Legend";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Legend></Legend>
    </div>
  );
}

export default App;
