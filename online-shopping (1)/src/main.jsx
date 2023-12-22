import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './Components/Context/AuthProvider.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Clothes from './Components/Categories/Clothes/Clothes.jsx'
import Electronics from './Components/Categories/Electronics/Electronics.jsx'
import Grocery from './Components/Categories/Grocery/Grocery.jsx'
import Laptops from './Components/Categories/Laptops/Laptops.jsx'
import Medicine from './Components/Categories/Medicine/Medicine.jsx'
import Mobiles from './Components/Categories/Mobiles/Mobiles.jsx'
import ProductWithId from './Components/ProductDetailsCard/ProductWithId.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Login from './Components/LogIn/Login.jsx'
import Prac from './Components/Prac/Prac.jsx'
import AdressConfirmation from './Components/Cart/AdressConfirmation.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='categories' element={<Categories />}/>
      <Route path='cart' element={<Cart />} />
      <Route path='login' element={<Login />}/>
      <Route path='prac' element={<Prac />} />
      <Route path='cart/AddressConfirmation' element={<AdressConfirmation />}/>
      <Route path='categories/clothes' element={<Clothes />} />
      <Route path='categories/electronics' element={<Electronics />} />
      <Route path='categories/grocery' element={<Grocery />} />
      <Route path='categories/laptops' element={<Laptops />} />
      <Route path='categories/medicine' element={<Medicine />} />
      <Route path='categories/mobiles' element={<Mobiles />} />
      <Route path='categories/:category/:productId' element={<ProductWithId />} />
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
