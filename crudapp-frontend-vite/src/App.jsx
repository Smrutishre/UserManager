import { BrowserRouter, Routes, Route } from 'react-router-dom'
<<<<<<< HEAD
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar'
import Home from './pages/Home'
import AddUser from './users/AddUser'
import EditUser from './users/EditUser'
import ViewUser from './users/ViewUser'

=======
import Navbar from './components/Navbar'
import Home from './components/Home'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import ViewUser from './components/ViewUser'
import './styles/App.css'  // Updated path
>>>>>>> 025b6d4038249a5eba9ee3da4700de6a4ae47375

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