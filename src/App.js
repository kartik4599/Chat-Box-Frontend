import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
