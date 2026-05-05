import React from 'react'
import Hero from '../components/UI/Hero'
import About from '../components/UI/About'
import { Arrival } from './Arrival'
import { Features } from '../components/UI/Feature'
import TestimonialSlider from '../components/UI/TestimonialSlider'
// import { Footer } from '../components/UI/Footer'



const Home = () => {
    return (
        <main>
            <section className="hero">
                <Hero />
                <Arrival limit={4} />
                <Features />
                <TestimonialSlider />
                <About />
            </section>
        </main>
    )
}

export default Home;