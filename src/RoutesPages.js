import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Usuarios_admin from "./users/usuarios_admin"
import Home from "./dashboard/home"

const RoutesPages = ()=>{
return (
    <Router>
        <Routes>
            <Route path="/home" element={<Home></Home>} ></Route>
        </Routes>
    </Router>
);
}
export default RoutesPages;