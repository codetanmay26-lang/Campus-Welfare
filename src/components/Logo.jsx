const Logo = ({ size = "md", showText = true, animated = true }) => {
  const sizeMap = {
    sm: { width: 24, height: 24, textSize: "text-lg" },
    md: { width: 32, height: 32, textSize: "text-2xl" },
    lg: { width: 40, height: 40, textSize: "text-3xl" }
  }

  const sizes = sizeMap[size]

  // Add animation styles if animated
  const animationClass = animated ? "animate-float" : ""

  return (
    <div className="flex items-center gap-2">
      <style>{`
        @keyframes scholarBounce {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        @keyframes capPulse {
          0%, 100% {
            filter: drop-shadow(0 0 0px rgba(59, 130, 246, 0));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
          }
        }

        .animate-scholar-bounce {
          animation: scholarBounce 2.5s ease-in-out infinite;
        }

        .animate-cap-pulse {
          animation: capPulse 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className={animationClass}>
        <svg 
          width={sizes.width} 
          height={sizes.height} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-scholar-bounce"
        >
          {/* Scholar Hat */}
          {/* Main hat platform */}
          <path 
            d="M12 22L24 16L36 22Z" 
            stroke="#3B82F6" 
            strokeWidth="2" 
            fill="#DBEAFE" 
            opacity="0.3"
            className="animate-cap-pulse"
          />
          
          {/* Hat lines (left) */}
          <line x1="12" y1="22" x2="15" y2="28" stroke="#3B82F6" strokeWidth="1.5" opacity="0.7" />
          <line x1="12" y1="22" x2="12" y2="30" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
          
          {/* Hat lines (right) */}
          <line x1="36" y1="22" x2="33" y2="28" stroke="#3B82F6" strokeWidth="1.5" opacity="0.7" />
          <line x1="36" y1="22" x2="36" y2="30" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />

          {/* Tassel (animated falling) */}
          <line x1="24" y1="16" x2="24" y2="24" stroke="#3B82F6" strokeWidth="1.5" className="animate-pulse" />
          <circle cx="24" cy="26" r="2" fill="#3B82F6" className="animate-bounce" style={{animationDelay: '0.1s'}} />

          {/* Book beneath hat */}
          <rect x="14" y="32" width="20" height="12" rx="1" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.8" />
          <line x1="14" y1="36" x2="34" y2="36" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />
          <line x1="17" y1="38" x2="31" y2="38" stroke="#3B82F6" strokeWidth="0.8" opacity="0.4" />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className={`${sizes.textSize} font-bold text-gray-900`}>
          <span className="text-blue-600">Scholar</span>Match
        </div>
      )}
    </div>
  )
}

export default Logo
