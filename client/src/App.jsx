import './App.css'
import {Routes, Route} from "react-router-dom"
import IndexPage from "./pages/IndexPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Layout from "./Layout"
import Register from "./pages/RegisterPager.jsx";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';
function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<Register/>} />
        </Route>
    </Routes>
  )
}

export default App
