import Header from "./componrnts/Header";
import Footer from "./componrnts/Footer";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
      
    </>
  );
}

export default App;
