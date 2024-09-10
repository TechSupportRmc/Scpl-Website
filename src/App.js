import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

import HomePage from './pages/home_page/Homepage'
import AboutPage from './pages/about_page/AboutPage'
import CompliancesPage from './pages/compliances_page/CompliancesPage'
import ProductPage from './pages/product_page/ProductPage'
import ContactPage from './pages/contact_page/ContactPage'
import DashboardPage from './pages/dashboard_page/DashboardPage'
import RegistrationPage from './pages/regisrartion_page/RegistrationPage'
import CreateUser from './pages/compliances_page/create-user/CreateUser'
import LoginUser from './pages/compliances_page/login-user/LoginUser'

// Main Product Import

import Methyl from './pages/product_page/productList/methyl/Methyl'
import Octyl from './pages/product_page/productList/octyl/Octyl'
import Salicylic from './pages/product_page/productList/salicylic/Salicylic'
import TechSalicylic from './pages/product_page/productList/techsalicylic/TechSalicylic'
import Sodium from './pages/product_page/productList/sodium/Sodium'
import Salicylamide from './pages/product_page/productList/salicylamide/Salicylamide'
import Aspirin from './pages/product_page/productList/aspirin/Aspirin'


// Sidebae Product import
import MethylProduct1 from './pages/product_page/prod-nav/sideBarproducts/product1/MethylProduct1'
import SalicylicAcidProduct2 from './pages/product_page/prod-nav/sideBarproducts/product2/SalicylicAcidProduct2'
import SalicylicAcidProduct3 from './pages/product_page/prod-nav/sideBarproducts/product3/SalicylicAcidProduct3'
import OctylSalicylate from './pages/product_page/prod-nav/sideBarproducts/product4/OctylSalicylate'
import SalicylamideNFProduct5 from './pages/product_page/prod-nav/sideBarproducts/product5/SalicylamideNFProduct5'
import SodiumSalicyclateProduct6 from './pages/product_page/prod-nav/sideBarproducts/product6/SodiumSalicyclateProduct6'
import AspirinProduct7 from './pages/product_page/prod-nav/sideBarproducts/product7/AspirinProduct7'
import ProductCards from './pages/dashboard_page/dash_pages/product_cards/ProductCards'
import DataOfCompliances from './pages/dashboard_page/dash_pages/data-of-compliances/DataOfCompliances'
import AdminNavbar from './pages/dashboard_page/dash_pages/adminnavbar/AdminNavbar'
import Admin from './pages/dashboard_page/Admin'
import HomePageHero from './pages/dashboard_page/dash_pages/homepagehero/HomePageHero'
import HomePageCards from './pages/dashboard_page/dash_pages/homepagecards/HomePageCards'
import AboutBulkSection from './pages/dashboard_page/dash_pages/about-bulk-section/AboutBulkSection'
import NewCertification from './pages/certification/NewCertification'
import Homosalate from './pages/product_page/productList/homosalate/Homosalate'
import HomoSalate from './pages/product_page/prod-nav/sideBarproducts/product8/HomoSalate'
import ContactFormData from './pages/dashboard_page/dash_pages/about-bulk-section/ContactFormData'
// import Carousel from './pages/certification/Carousel'


import { AuthProvider } from './Components/context/AuthContext'
import ProtectedRoute from './Components/protectedroute/ProtectedRoute'


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/compliance' element={<CompliancesPage />} />
          <Route path='/newcertificate' element={<NewCertification />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={DashboardPage} />}
          />
          <Route path='/adminlogin' element={<RegistrationPage />} />


          {/* compliances routing */}
          <Route path='/userlogin' element={<LoginUser />} />
          <Route path='/createuser' element={<CreateUser />} />
          {/* <Route path='/logincompliances' element={<LoginCompliances />} /> */}

          {/* Dashboard routes */}
          <Route path='/admin' element={<Admin />} />
          <Route path='/product-cards' element={<ProductCards />} />
          <Route path='/dataofcompliances' element={<DataOfCompliances />} />
          <Route path='/adminnavbar' element={<AdminNavbar />} />
          <Route path='/herohome' element={<HomePageHero />} />
          <Route path='/homecards' element={<HomePageCards />} />
          <Route path='/homeaboutbulk' element={<AboutBulkSection />} />
          <Route path='/contactform' element={<ContactFormData />} />

          {/* Main Product Routes */}
          <Route path='/methyl' element={<Methyl />} />
          <Route path='/octyl' element={<Octyl />} />
          <Route path='/salicylic' element={<Salicylic />} />
          <Route path='/techsalicylic' element={<TechSalicylic />} />
          <Route path='/sodium' element={<Sodium />} />
          <Route path='/salicylamide' element={<Salicylamide />} />
          <Route path='/aspirin' element={<Aspirin />} />
          <Route path='/homosalate' element={<Homosalate />} />


          {/* sidebar product routes */}

          <Route path='/product-1' element={<MethylProduct1 />} />
          <Route path='/product-2' element={<SalicylicAcidProduct2 />} />
          <Route path='/product-3' element={<SalicylicAcidProduct3 />} />
          <Route path='/product-4' element={<OctylSalicylate />} />
          <Route path='/product-5' element={<SalicylamideNFProduct5 />} />
          <Route path='/product-6' element={<SodiumSalicyclateProduct6 />} />
          <Route path='/product-7' element={<AspirinProduct7 />} />
          <Route path='/product-8' element={<HomoSalate />} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
