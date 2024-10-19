
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={<Home/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
