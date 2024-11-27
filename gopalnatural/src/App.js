import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Content from "./Component/Content";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
function App() {
  return (
    <Router>
      <div id="appMain">
        <Header />
        <Navbar />
        <Content />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={2000} // Toast disappears after 5 seconds
          hideProgressBar={false} // Show a progress bar
          newestOnTop={true} // Newest toast appears on top
          closeOnClick
          rtl={false} // Right-to-left support
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
