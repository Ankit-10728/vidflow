const ErrorPage = ({ message }) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-lg text-gray-400">{message}</p>

            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-5 py-2 bg-white text-black rounded-lg"
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorPage;