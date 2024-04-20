import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Signup from './componenets/Signup'
import ChatPage  from './componenets/Home'
import './index.css'
import './output.css'
import Login from './componenets/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<Signup />} />
        <Route path = '/home' element={<ChatPage />} />
        <Route path = '/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;