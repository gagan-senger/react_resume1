import features from "../../data/features";

export const Features = () => {
    return (
        <section className="py-12 md:py-20 text-center">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-700 mb-10 md:mb-16">
                    Why Perfume 24X7 ?
                </h3>

                {/* FIXED LAYOUT */}
                <div className="
                    grid grid-cols-2 gap-6
                    md:grid-cols-3
                    lg:flex lg:flex-wrap lg:justify-center lg:gap-10
                ">

                    {features.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="
                                    flex flex-col items-center text-center
                                    p-2 lg:p-0
                                    lg:w-[280px]">
                                <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 text-gray-800" />

                                <h2 className="text-sm sm:text-base md:text-xl font-medium text-gray-700 mb-2">
                                    {item.title}
                                </h2>

                                <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};
