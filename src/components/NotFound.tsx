import { Link } from "react-router";


const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-6">Oops! Page not found</p>
            <p className="text-gray-400 mb-8">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition"
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
