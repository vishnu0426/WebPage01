import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-vh-100 bg-black text-white p-4">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                404
            </h1>
            <p className="text-xl text-gray-400 mb-8">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
                Return to AGNOJARVIS
            </Link>
        </div>
    );
}
