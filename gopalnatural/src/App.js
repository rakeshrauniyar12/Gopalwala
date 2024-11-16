import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
function App() {
  return (
  <Router>
      <div id="appMain">
      <Header/>
      <Navbar/>
      <Home/>
      </div>
    </Router>
 
  );
}

export default App;
