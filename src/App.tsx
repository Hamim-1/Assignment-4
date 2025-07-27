import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App;