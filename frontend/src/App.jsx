import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Signup from './componenets/Signup'
import Home from './componenets/Home'
import './index.css'
import './output.css'
import Login from './componenets/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Signup />} />
        <Route path = '/home' element={<Home />} />
        <Route path = '/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;