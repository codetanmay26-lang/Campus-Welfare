import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X, Heart } from "lucide-react"
import { useState } from "react"
import Logo from "@/components/Logo"

// Feature Icons - Clean Outlined Style
const FeatureIcon = ({ type }) => {
  if (type === "instant") {
    return (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 2L32 16H24L26 32L16 18H22L14 2Z" stroke="#3B82F6" strokeWidth="1.5" fill="none" />
        <circle cx="24" cy="24" r="22" stroke="#3B82F6" strokeWidth="1.5" opacity="0.3" />
      </svg>
    )
  }
  if (type === "target") {
    return (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" stroke="#10B981" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="14" stroke="#10B981" strokeWidth="1.5" opacity="0.6" />
        <circle cx="24" cy="24" r="8" stroke="#10B981" strokeWidth="1.5" opacity="0.3" />
        <circle cx="24" cy="24" r="3" fill="#10B981" />
      </svg>
    )
  }
  if (type === "book") {
    return (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 10C8 8.9 8.9 8 10 8H38C39.1 8 40 8.9 40 10V38C40 39.1 39.1 40 38 40H10C8.9 40 8 39.1 8 38V10Z" stroke="#8B5CF6" strokeWidth="1.5" />
        <line x1="24" y1="8" x2="24" y2="40" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="14" x2="20" y2="14" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
        <line x1="12" y1="20" x2="20" y2="20" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
        <line x1="12" y1="26" x2="20" y2="26" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
      </svg>
    )
  }
  if (type === "globe") {
    return (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" stroke="#F59E0B" strokeWidth="1.5" />
        <path d="M24 6C24 6 18 12 18 24C18 36 24 42 24 42" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />
        <path d="M24 6C24 6 30 12 30 24C30 36 24 42 24 42" stroke="#F59E0B" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="24" cy="24" rx="18" ry="6" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" />
      </svg>
    )
  }
}

// Hero Illustration
const HeroIllustration = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="180" fill="#DBEAFE" opacity="0.3" className="animate-pulse" />
      <circle cx="200" cy="200" r="140" fill="#BFDBFE" opacity="0.2" />
      
      <g className="animate-float" style={{animationDelay: '0s'}}>
        <rect x="80" y="100" width="100" height="130" rx="12" fill="#3B82F6" opacity="0.9" />
        <circle cx="130" cy="130" r="15" fill="#FFFFFF" opacity="0.8" />
        <rect x="95" y="160" width="70" height="8" rx="4" fill="#FFFFFF" opacity="0.6" />
        <rect x="95" y="175" width="50" height="6" rx="3" fill="#FFFFFF" opacity="0.4" />
      </g>

      <g className="animate-float" style={{animationDelay: '0.5s'}}>
        <rect x="220" y="130" width="100" height="130" rx="12" fill="#10B981" opacity="0.8" />
        <circle cx="270" cy="160" r="15" fill="#FFFFFF" opacity="0.8" />
        <rect x="235" y="190" width="70" height="8" rx="4" fill="#FFFFFF" opacity="0.6" />
        <rect x="235" y="205" width="50" height="6" rx="3" fill="#FFFFFF" opacity="0.4" />
      </g>

      <g className="animate-bounce">
        <circle cx="200" cy="200" r="20" fill="#FBBF24" opacity="0.6" />
        <circle cx="200" cy="200" r="15" fill="#FBBF24" />
        <path d="M200 185 L205 200 L200 215 L195 200 Z" fill="#FEF3C7" />
      </g>

      <circle cx="120" cy="280" r="8" fill="#EC4899" opacity="0.7" className="animate-bounce" style={{animationDelay: '0.2s'}} />
      <circle cx="280" cy="300" r="6" fill="#8B5CF6" opacity="0.6" className="animate-bounce" style={{animationDelay: '0.4s'}} />
      <circle cx="160" cy="320" r="7" fill="#06B6D4" opacity="0.7" className="animate-bounce" style={{animationDelay: '0.1s'}} />
    </svg>
  )
}

// Step Illustrations for "How It Works"
const StepIllustration = ({ step }) => {
  if (step === 1) {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="30" r="15" fill="#3B82F6" />
        <path d="M30 65 Q30 55 50 55 Q70 55 70 65" fill="#3B82F6" />
        <rect x="25" y="75" width="50" height="6" rx="3" fill="#DBEAFE" />
        <rect x="25" y="85" width="35" height="6" rx="3" fill="#DBEAFE" />
        <circle cx="80" cy="80" r="12" stroke="#10B981" strokeWidth="2" fill="none" className="animate-pulse" />
        <path d="M77 82 L82 87" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (step === 2) {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="18" fill="#8B5CF6" opacity="0.2" />
        <circle cx="50" cy="35" r="14" fill="#8B5CF6" />
        <circle cx="38" cy="32" r="4" fill="#FFFFFF" />
        <circle cx="62" cy="32" r="4" fill="#FFFFFF" />
        <path d="M40 40 Q50 48 60 40" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        
        <g className="animate-pulse" style={{animationDelay: '0s'}}>
          <circle cx="25" cy="60" r="5" fill="#EC4899" />
          <line x1="30" y1="60" x2="45" y2="60" stroke="#EC4899" strokeWidth="2" opacity="0.5" />
        </g>
        <g className="animate-pulse" style={{animationDelay: '0.3s'}}>
          <circle cx="75" cy="70" r="5" fill="#06B6D4" />
          <line x1="55" y1="70" x2="70" y2="70" stroke="#06B6D4" strokeWidth="2" opacity="0.5" />
        </g>
        <g className="animate-pulse" style={{animationDelay: '0.6s'}}>
          <circle cx="50" cy="80" r="5" fill="#10B981" />
          <line x1="50" y1="50" x2="50" y2="75" stroke="#10B981" strokeWidth="2" opacity="0.5" />
        </g>
      </svg>
    )
  }
  if (step === 3) {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="50" height="60" rx="4" fill="#FBBF24" opacity="0.3" />
        <rect x="28" y="25" width="44" height="50" rx="2" fill="#FBBF24" />
        
        <rect x="33" y="32" width="30" height="3" rx="1.5" fill="#FFFFFF" />
        <rect x="33" y="40" width="35" height="3" rx="1.5" fill="#FFFFFF" />
        <rect x="33" y="48" width="28" height="3" rx="1.5" fill="#FFFFFF" />
        <rect x="33" y="56" width="32" height="3" rx="1.5" fill="#FFFFFF" />
        
        <g className="animate-bounce">
          <circle cx="72" cy="65" r="14" fill="#10B981" />
          <path d="M68 65 L72 69 L78 61" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
    )
  }
}

const Landing = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="animate-fadeInDown">
            <Logo size="md" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium animate-fadeInDown" style={{animationDelay: '0.1s'}}>Features</a>
            <a href="#howitworks" className="text-gray-600 hover:text-gray-900 font-medium animate-fadeInDown" style={{animationDelay: '0.2s'}}>How it works</a>
            <button onClick={() => navigate("/auth")} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 animate-fadeInDown" style={{animationDelay: '0.3s'}}>
              Get Started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fadeInDown">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#howitworks" className="text-gray-600 hover:text-gray-900 font-medium">How it works</a>
              <button onClick={() => navigate("/auth")} className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slideInLeft">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your <span className="text-blue-600">Perfect</span> Scholarship
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stop searching through hundreds of websites. Our smart matching algorithm finds scholarships you actually qualify for in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate("/auth")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-lg text-lg">
                Start Finding Scholarships
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="h-96 animate-slideInRight">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Students Love Us</h2>
            <p className="text-xl text-gray-600">Smart matching meets real results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Instant Match", desc: "Find scholarships in seconds, not hours", icon: "instant" },
              { title: "Best Fit", desc: "Only see scholarships you qualify for", icon: "target" },
              { title: "Comprehensive", desc: "Access to government and private scholarships", icon: "book" },
              { title: "For Everyone", desc: "No matter your background or circumstances", icon: "globe" }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all hover:border-gray-300 animate-fadeInUp group cursor-pointer"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <FeatureIcon type={feature.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="howitworks" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to your scholarship</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "1", title: "Create Profile", desc: "Tell us about yourself - your course, income, category", step: 1 },
              { num: "2", title: "Get Matched", desc: "Our algorithm finds scholarships you qualify for", step: 2 },
              { num: "3", title: "Apply Now", desc: "Apply directly through scholarship websites", step: 3 }
            ].map((item, idx) => (
              <div 
                key={item.num} 
                className="flex flex-col items-center text-center animate-fadeInUp"
                style={{animationDelay: `${idx * 0.15}s`}}
              >
                <div className="mb-6">
                  <StepIllustration step={item.step} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-lg text-blue-100">Scholarships Available</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <p className="text-lg text-blue-100">Students Helped</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">₹50L+</div>
              <p className="text-lg text-blue-100">Funding Distributed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center border border-gray-200 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Scholarship?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of students who found their perfect match</p>
          <Button onClick={() => navigate("/auth")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-6 rounded-lg text-lg">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer - UPDATED */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side */}
            <div>
              <div className="mb-6">
                <Logo size="sm" />
              </div>
              <p className="text-gray-400">Find the perfect scholarship for your future</p>
            </div>

            {/* Right Side - Product Links Only */}
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#howitworks" className="hover:text-white">How it works</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section with Credit */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by CodeRage</span>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2025 ScholarMatch. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
