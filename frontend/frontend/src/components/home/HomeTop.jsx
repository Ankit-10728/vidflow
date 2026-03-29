import { Link } from "react-router-dom"
import { store } from "../../app/store"
import { useSelector } from "react-redux"

function HomeTop() {
    const { isAuthenticated, isAuthChecked } = useSelector((state) => state.user);
    // if (!isAuthChecked) return null;

    return (
        <section className="relative  bg-[#181523] overflow-hidden">

            <div className="absolute top-0 right-0 w-125 h-125
                bg-linear-to-br from-red-700 via-rose-600 to-pink-600
                blur-3xl opacity-25">
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-14 py-20
                flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 relative flex justify-center">


                    <div className="absolute w-80 h-80 md:w-96 md:h-96
                        bg-red-600/20
                        rounded-3xl
                        -rotate-6">
                    </div>


                    <div className="relative w-80 h-80 md:w-96 md:h-96
                        rounded-3xl overflow-hidden shadow-2xl">

                        <img
                            src="/3d-cinema-projector.jpg"
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />


                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>

                </div>


                <div className="flex-1 text-center lg:text-left">

                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Create. Share. <span className="text-red-500">Inspire.</span>
                    </h1>

                    <p className="text-gray-400 mt-6 max-w-xl mx-auto lg:mx-0">
                        Join thousands of creators building powerful video
                        and micro-content experiences. Your audience is waiting.
                    </p>



                    <div className=" mt-10 flex flex-col sm:flex-row gap-15 justify-center lg:justify-start">
                        <Link to={isAuthenticated ? "/add-post" : "/login"}>
                            <button className=" uppercase font-semibold rounded-full 
                            py-3 px-15 text-white
                            bg-linear-to-r from-red-500 to-rose-500
                            hover:scale-105 transition-all duration-100">
                                {isAuthenticated ? "Add Post" : "Login"}
                            </button>
                        </Link>

                        <Link to={isAuthenticated ? "/tweet/add-tweet" : "/signup"}>
                            <button className="uppercase w-full h-full font-semibold rounded-full 
                             px-15 text-white
                            border border-red-500
                            hover:bg-red-500 hover:text-white
                            transition-all duration-300">
                                {isAuthenticated ? "Add Tweet" : "Sign Up"}
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeTop