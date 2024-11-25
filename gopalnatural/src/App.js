import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Content from "./Component/Content";
function App() {
  return (
  <Router>
      <div id="appMain">
      <Header/>
      <Navbar/>
      <Content/>
      <Footer/>
      </div>
    </Router>
 
  );
}

export default App;
