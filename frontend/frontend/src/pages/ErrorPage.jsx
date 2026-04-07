import { Link } from "react-router-dom";

export default function ErrorPage({
    code = "404",
    message = "Page Not Found",
    description = "The page you are looking for doesn’t exist or has been moved.",
}) {
    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <div className="absolute inset-0">
                <img
                    src="/pageNotFound.jpg"
                    alt="background"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-7xl font-bold text-red-500 mb-4">
                    {code}
                </h1>

                <h2 className="text-2xl font-semibold mb-2">
                    {message}
                </h2>

                <div className="flex flex-col gap-5 m-9">
                    <Link
                        to="/"
                        className="inline-flex items-center text-xl gap-2 text-white hover:text-gray-300 transition"
                    >
                        ← Back to home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                    >
                        Go Back
                    </button>

                </div>
            </div>






        </div>
    );
}