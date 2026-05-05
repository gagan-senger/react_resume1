import React from "react";
import { Link, useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();

    // Create dynamic breadcrumb
    const pathnames = location.pathname.split("/").filter(x => x);

    return (
        <section className="mt-20">
            <div className="max-w-5xl mx-auto px-4">

                {/* Breadcrumb */}
                <div className="text-center text-sm text-gray-600 mb-2">
                    <Link to="/" className="hover:underline">Home</Link>
                    {pathnames.map((name, index) => {
                        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                        const isLast = index === pathnames.length - 1;

                        return (
                            <span key={name}>
                                {" / "}
                                {isLast ? (
                                    <span className="text-gray-800 capitalize">{name}</span>
                                ) : (
                                    <Link to={routeTo} className="hover:underline capitalize">
                                        {name}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </div>

                {/* Title */}
                <h1 className="text-4xl text-center font-medium tracking-wide mb-8">
                    ABOUT
                </h1>

                {/* Content */}
                <div className="text-[17px] font-[font2] font-light text-gray-800 leading-6 space-y-6 text-left mb-50">

                    <p>
                        Established in 2009, Perfume24x7 began as a local fragrance destination with a simple idea — to make genuine, premium perfumes easily accessible to fragrance lovers. Over the years, we have grown into a trusted name for customers looking for authentic global perfume brands combined with personal service.
                    </p>

                    <p>
                        At Perfume24x7, we house a wide range of international fragrances across perfumes, premium deodorants, fragrance mists, aftershaves, and kids’ perfumes. Our collection features renowned brands such as Burberry, Calvin Klein, Hugo Boss, Elizabeth Arden, Gucci, Issey Miyake, Davidoff, and many more.
                    </p>

                    <p>
                        What sets us apart is our belief that buying a fragrance should be a pleasant and personal experience. Whether you are choosing a signature scent for yourself or selecting the perfect gift, our team is always ready to assist you with recommendations and doorstep delivery, along with complimentary gift wrapping.
                    </p>

                    <p>
                        We also believe that premium fragrances should be accessible year-round, which is why we offer attractive deals and offers throughout the year.
                    </p>

                    <p>
                        So the next time you are looking for your favourite perfume or planning a special gift, Perfume24x7 is just a call away.
                    </p>

                </div>
            </div>
        </section>
    );
};

export default About;