import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";  
import { Routes, Route } from "react-router-dom";        
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import BookDetail from "./components/ViewBookDetail.jsx/BookDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./Store/Auth";
import Favourite from "./components/Profile/Favourite";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";


const App = () => {

  const dispatch = useDispatch()
  const roll = useSelector((state)=> state.auth.roll)
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("roll")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("roll")))
    }
  }, []);
  return (
    <div >
      
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route  path="/all-books" element={<AllBooks/>} />
          <Route  path="/cart" element={<Cart/>} />
          <Route  path="/profile" element={<Profile/>}>
          {roll === "user" ? (
            <Route index element={<Favourite/>} />
            ) : 
            (<Route index element={<AllOrders/>} />)}
            {roll === "admin" && <Route path="/profile/add-book" element={<AddBook/>} />
          }
          
          <Route path="/profile/orderHistory" element={<UserOrderHistory/>} />
          <Route path="/profile/settings" element={<Setting/>} />
          </Route>
          <Route  path="/Login" element={<Login/>} />
          <Route  path="/update-book/:id" element={<UpdateBook/>} />
          <Route  path="/Signup" element={<SignUp/>} /> 
          <Route  path="/view-book-detail/:id" element={<BookDetail/>} /> 
        </Routes>
        <Footer/>
        
      
      
      
    </div>
  )
}

export default App
