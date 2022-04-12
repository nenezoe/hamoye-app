import { Route, Routes } from "react-router-dom"
import Register from "./Register"
import Login from "./Register"

const Unauthenticated = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    )
}

export default Unauthenticated