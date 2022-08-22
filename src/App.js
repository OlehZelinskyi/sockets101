import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Room from "./Room/Room";
import Textarea from "./Textarea";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:roomId" element={<Room />} />
        <Route path="/:roomId/textarea" element={<Textarea />} />
      </Routes>
    </Router>
  );
}

export default App;
