import  { useContext, useState } from "react";
import './Navbar.css'
import logo from '../Asset/logo.png'
import cart_icon from '../Asset/cart_icon.png'
import { Link } from "react-router-dom";
import { ShppContext } from "../../Context/ShopContext";
const Navbar = () => {

const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

    const[menu, setMenu] = useState("shop");
     const {getTotalCartItems} = useContext(ShppContext);

    return (
        <div className="navbar">
          <div className="nav-logo">
            <img src={logo} alt=""/>
            <p>SHOPPER</p>
            </div>  
            <ul className="nav-menu">
           
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/shop'>Shop</Link> {menu=== "shop"?<hr/>:<></>} </li>
                <li onClick={()=>{setMenu("mens")}}><Link  style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu=== "mens"?<hr/>:<></>} </li>
                <li onClick={()=>{setMenu("womens")}}><Link  style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu=== "womens"?<hr/>:<></>} </li>
                <li onClick={()=>{setMenu("kids")}}><Link  style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu=== "kids"?<hr/>:<></>} </li>
            </ul>
            
            <div className="nav-login-cart">
               <Link to='/login' className='btn btn-outline-secondary btn-lg' role="button">Login</Link>
                <Link to ='/cart'><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
        </div>
    )
}


export default Navbar