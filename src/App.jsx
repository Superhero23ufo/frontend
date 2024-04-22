
import './App.css';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import {Cart, Product, Login, SignUp, Shop} from './Pages/';
import Layout from './Components/Layout/Layout';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <div>
      <BrowserRouter>
        
        <Routes >
           {/* Public Routes */}
          <Route element={<Layout/>}>
            <Route path='/' element= {<Shop/>}/>
            <Route path='product' element= {<Product/>}>
              <Route path=':productId' element={<Product/>}/>
            </Route>
          </Route>

          {/* No navbar */}
          <Route path='login' element= {<Login token={token}/>}/>
          <Route path='signup' element= {<SignUp 
                   user={user}
                  setUser={setUser}
                  token={token}
                  setToken={setToken}/>}/>

          {/* Private Routes */}
          <Route element=''>
            <Route path='/cart' 
            element= {<Cart token={token}/> }/>
          </Route>


        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
