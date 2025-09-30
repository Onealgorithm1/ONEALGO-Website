import * as React from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  fetchpriority?: "high" | "low" | "auto";
  placeholder?: string;
}

export function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  fetchpriority = "auto",
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6"/%3E%3C/svg%3E',
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-sm transition-opacity duration-300 ${isLoaded ? "opacity-0" : "opacity-100"}`}
          width={width}
          height={height}
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchpriority}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// Higher-order component for lazy loading sections
export function LazySection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {isVisible ? (
        children
      ) : (
        <div className="h-48 bg-gray-100 animate-pulse rounded-lg" />
      )}
    </div>
  );
}
