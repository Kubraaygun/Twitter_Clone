import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import FeedPage from "./pages/FeedPage"

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<AuthPage/>}/>
    <Route path="/home" element={<FeedPage/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App