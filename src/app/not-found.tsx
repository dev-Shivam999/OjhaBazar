// pages/404.js
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600 mt-4">Oops! Page not found.</p>
                <p className="text-gray-500 mt-2">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300" href="/">
                    
                        Go Back Home
                    
                </Link>
            </div>
        </div>
    );
}