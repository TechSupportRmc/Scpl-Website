import React from 'react'
import Navbar from '../../Components/navbar/Navbar'
import Hero from '../../Components/hero/Hero'
import Cards from '../../Components/cards/Cards'
import About from '../../Components/about/About'
import Bulkdrug from '../../Components/bulkdrug/Bulkdrug'
import SliderCard from '../../Components/slider/Slider'
import Certification from '../../Components/certification/Certification'
// import Contact from '../../Components/contact/Contact'
import Footer from '../../Components/footer/Footer'
import ContactForm from '../../Components/new/ContactForm'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Cards/>
      <About/>
      <Bulkdrug/>
      <SliderCard/>
      <Certification/>
      {/* <Contact/> */}
      <ContactForm/>
      <Footer/>
    </div>
  )
}

export default Homepage
