import React from "react";

const About = () => {
    return (
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

                {/* Heading */}
                <h2 className="text-black text-xl sm:text-2xl md:text-4xl font-extralight font-[font3] uppercase">
                    About Perfume24x7.com
                </h2>

                {/* Paragraphs */}
                <div className="mt-6 flex flex-col gap-4">
                    <p className="text-gray-800 font-[font2] text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        Perfume24x7.com is India's largest online retailer of perfumes,
                        colognes and deodorants. We offer competitive prices, delivery and
                        top-notch customer service to our customers.
                    </p>

                    <p className="text-gray-800 font-[font2] text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                        Our mission is to provide the best quality products at the most
                        affordable prices. We have a wide range of products from leading
                        brands like Calvin Klein, Hugo Boss, Gucci and many more. Our team
                        of experts are always available to help you find the perfect scent
                        for any occasion. With our easy-to-use website and mobile app, you
                        can shop for your favorite fragrances anytime, anywhere!
                    </p>
                </div>

            </div>
        </section>
    );
};

export default About;