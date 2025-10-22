import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Navbar } from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path='/home' element={ <Home /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
