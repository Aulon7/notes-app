import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { Slide, ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} transition={Slide} hideProgressBar={false}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
