import{
    BrowerRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "../page/Login";
import Itens from "../page/Itens";
import Movimentacoes from "../page/Movimentacoes";
import Register from "../page/Register";
import {useAuth} from "../page/AuthContext";
import Navbar from "../page/Navbar";

function Private({ children}){
    const {token}= useAuth();
    return token ? children : < Navigate to="/" replace/>
}

export default function AppRoutes(){
    return(
        <BrowerRouter>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                
                <Route
                    path="/itens"
                    element={
                        <Private>
                            <Itens/>
                        </Private>
                    }                
                />
                <Route
                    path="/movientacoes"
                    element={
                        <Private>
                            <Movimentacoes/>
                        </Private>
                    }                
                />

            </Routes>
        </BrowerRouter>
    );
}