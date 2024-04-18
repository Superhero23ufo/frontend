
import './App.css';

import {BrowserRouter, Routes , Route} from 'react-router-dom';
import {Cart, Product, Shop as HomePage, Login, SignUp, Shop} from './Pages/';
import Layout from './Components/Layout/Layout';

import Footer from './Components/Footer/Footer';
// import  men_banner from './Components/Asset/banner_mens.png'
// import women_banner from './Components/Asset/banner_women.png'
// import kid_banner from './Components/Asset/banner_kids.png'

function App() {

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
          <Route path='login' element= {<Login/>}/>
          <Route path='signup' element= {<SignUp/>}/>
          

          {/* Private Routes */}
          <Route element=''>
            <Route path='/cart' element= {<Cart/>}/>
          </Route>
          

          {/* <Route path='/mens' element= {<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path='/womens' element= {<ShopCategory banner={women_banner}category="women"/>}/>
          <Route path='/kids' element= {<ShopCategory banner={kid_banner} category="kid"/>}/> */}

        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
