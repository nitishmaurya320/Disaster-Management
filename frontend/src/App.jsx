import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DisasterEducationModule from './Pages/DisasterModule'
import EarthquakeModule from './Pages/Earthquake'
import EmergencyContacts from './Pages/EmergencyContact'
import UserLayout from './Layout/UserLayout'
import TeamPage from './Pages/Team'

const App = () => {
  return (
    <>
  
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}/>
    <Route path="/modules" element={<DisasterEducationModule/>}/>
    <Route path="/earthquake" element={<EarthquakeModule/>}/>
    <Route path="/emergency-contacts" element={<EmergencyContacts/>}/>
     <Route path="/team" element={<TeamPage/>}/>
      </Route>
    
    </Routes>
      
    </BrowserRouter>
    
    
    </>
  )
}

export default App