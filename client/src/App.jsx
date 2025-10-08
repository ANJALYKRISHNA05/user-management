import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css'

import Home from "./pages/Home/Home";
import Login from "./pages/login/login"
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from './pages/UserManagement/UserManagement';


import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdmin from "./components/ProtectedAdmin";

function App() {
  

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Protected><Home /></Protected>} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedAdmin><Dashboard /></ProtectedAdmin>} />
        <Route path='/userManagement' element={<ProtectedAdmin><UserManagement /></ProtectedAdmin>} />
        </Routes>
    </Router>
      
    </>
  )
}

export default App



