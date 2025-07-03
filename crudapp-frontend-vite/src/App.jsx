import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import ViewUser from './components/ViewUser'
import './styles/App.css'  // Updated path

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/viewuser/:id" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App