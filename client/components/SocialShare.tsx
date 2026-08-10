import React from "react";
import { Mail, ExternalLink } from "lucide-react";

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
}

export default function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "OneAlgorithm - Technology Solutions",
  className = "",
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  const handleShare = (platform: string, shareUrl: string) => {
    if (platform === "email") {
      window.location.href = shareUrl;
    } else {
      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=600,height=400",
      );
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}>
      <span className="text-sm font-medium text-gray-600 mb-1 sm:mb-0">
        Share:
      </span>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare("linkedin", shareLinks.linkedin)}
        className="group flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] rounded-full bg-[#0077B5] hover:bg-[#0077B5]/90 active:bg-[#0077B5]/80 text-white transition-colors duration-200 touch-manipulation"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook", shareLinks.facebook)}
        className="group flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 active:bg-[#1877F2]/80 text-white transition-colors duration-200 touch-manipulation"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* X (Twitter) */}
      <button
        onClick={() => handleShare("twitter", shareLinks.twitter)}
        className="group flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] rounded-full bg-black hover:bg-gray-800 active:bg-gray-700 text-white transition-colors duration-200 touch-manipulation"
        aria-label="Share on X (Twitter)"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Email */}
      <button
        onClick={() => handleShare("email", shareLinks.email)}
        className="group flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] rounded-full bg-oa-blue hover:bg-oa-blue600 active:bg-oa-blue700 text-white transition-colors duration-200 touch-manipulation"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5" />
      </button>
    </div>
  );
}
