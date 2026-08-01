import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSEO } from "../hooks/use-seo";

const NotFound = () => {
  // noindex, and an explicit description. Setting only a title left the previous
  // page's description, canonical and social tags in place, so a mistyped URL
  // could be indexed wearing the homepage's metadata.
  useSEO({
    title: "404 — Page Not Found | OneAlgorithm",
    description: "This page could not be found.",
    noindex: true,
  });
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          404 — Page Not Found at OneAlgorithm
        </h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
