import { Link } from "react-router-dom"

function Home01() {
    return (
        <>
            <section

                className="relative  flex flex-col-reverse md:flex-row mx-auto justify-between items-center gap-9 md:gap-4 max-w-325 py-4  my-12">
                <svg width="736" height="423" className="absolute   top-12.5 sm:top-50 sm:-right-37.5" viewBox="0 0 736 423"
                    fill="none">
                    <path d="M738.5 4.5C491.667 -7.66666 -0.900015 58.9 3.49999 422.5" stroke="url(#paint0_linear_16_172)"
                        strokeWidth="6"></path>
                    <defs>
                        <linearGradient id="paint0_linear_16_172" x1="700.5" y1="-3.99998" x2="14.5" y2="361"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#343045"></stop>
                            <stop offset="0.213542" stopColor="#C0B7E8"></stop>
                            <stop offset="0.71875" stopColor="#8176AF"></stop>
                            <stop offset="1" stopColor="#343045"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="absolute sm:right-28 md:right-6" width="383" height="700" viewBox="0 0 383 846" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.19293 60C-0.0879101 140.127 37.2087 433.314 212.642 485.053C388.075 536.792 391.776 746.576 371.697 845"
                        stroke="url(#paint0_linear_16_173)" strokeWidth="6"></path>
                    <defs>
                        <linearGradient id="paint0_linear_16_173" x1="16.5" y1="39.5" x2="363" y2="814"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0.0104167" stopColor="#343045"></stop>
                            <stop offset="0.229167" stopColor="#C0B7E8"></stop>
                            <stop offset="0.776042" stopColor="#8176AF"></stop>
                            <stop offset="1" stopColor="#343045"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="absolute -top-14 sm:right-7" width="416" height="675" viewBox="0 0 416 675" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M415 3C325.774 17.8434 155.913 102.224 190.271 320.998C224.63 539.772 78.4065 646.155 1 672"
                        stroke="url(#paint0_linear_16_171)" strokeWidth="6"></path>
                    <defs>
                        <linearGradient id="paint0_linear_16_171" x1="365.5" y1="28" x2="110" y2="594"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor="#343045"></stop>
                            <stop offset="0.276042" stopColor="#8176AF"></stop>
                            <stop offset="0.739583" stopColor="#C0B7E8"></stop>
                            <stop offset="1" stopColor="#343045"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div className="md:w-130 z-20">
                    <h1 className="text-3xl md:text-[36px] lg:text-[46px] leading-14 text-white font-bold">
                        <span className="text-pink-300">Stream! </span>Your stories with <span className="text-pink-300"> The World</span></h1>
                    <p className="text-base text-white mt-4 md:mt-9 mb-10 md:mb-16"> Upload, share, and discover amazing videos from creators everywhere.
                        Build your channel, grow your audience, and turn ideas into impact.</p>
                    <Link to="all-posts">
                        <div className="flex gap-6 sm:gap-10">
                            <button className="uppercase font-bold text-xs rounded-[40px] py-2 lg:py-4 px-4 lg:px-9 text-[#302c42]  bg-linear-to-r from-[#F8C8DC] to-[#C0B7E8]">Explore World</button><svg
                                className="w-8 h-6 sm:w-12 sm:h-9" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.8334 19L2.16669 19M43.8334 19L27.1667 35.6667M43.8334 19L27.1667 2.33333"
                                    stroke="#C0B7E8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div>
                    </Link>
                </div>

                <div className="relative z-20 w-87.5 h-87.5 md:w-105 md:h-105 
                bg-black/20 backdrop-blur-md rounded-full 
                overflow-hidden shadow-xl 
                flex items-center justify-center">

                    <img
                        src="/view-3d-cinema-clapperboard.jpg"
                        alt="3D cinema clapperboard"
                        loading="lazy"
                        className="w-[85%] h-[85%] object-cover rounded-full 
               transition-transform duration-300 hover:scale-105"
                    />

                </div>


            </section></>
    )
}

export default Home01