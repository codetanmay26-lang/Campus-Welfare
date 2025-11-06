import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { auth } from "@/config/firebase"
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from "sonner"
import { Heart, Download, ExternalLink, Calendar, FileText, ArrowLeft } from "lucide-react"
import jsPDF from "jspdf"
import scholarshipsData from "@/data/scholarships.json"
import Logo from "@/components/Logo"

// Scholarship Icon
const ScholarshipIcon = () => {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8L42 16V24C42 34 24 40 24 40C24 40 6 34 6 24V16L24 8Z" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="6" stroke="#3B82F6" strokeWidth="1.5" />
    </svg>
  )
}

// Badge Icon
const BadgeIcon = () => {
  return (
    <svg className="w-5 h-5 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15 10H23L17 15L19 23L12 18L5 23L7 15L1 10H9L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const Results = () => {
  const navigate = useNavigate()
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(new Set())
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    loadResults()
    checkUser()
  }, [])

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        loadFavorites(user.uid)
      }
    })
  }

  const loadFavorites = (id) => {
    const savedFavorites = localStorage.getItem(`favorites_${id}`)
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }

  const loadResults = async () => {
    const profileJson = sessionStorage.getItem("profileData")
    if (!profileJson) {
      toast.error("No profile data found")
      navigate("/profile")
      return
    }

    const profile = JSON.parse(profileJson)
    const data = scholarshipsData

    const eligible = data.filter((scholarship) => {
      if (!scholarship.categoryeligibility.includes(profile.category)) return false
      const incomeMax = parseInt(profile.incomerange.split("-")[1]?.replace("+", "") || "999999999")
      if (scholarship.incomemax && incomeMax > scholarship.incomemax) return false
      if (profile.age) {
        if (scholarship.agemin && profile.age < scholarship.agemin) return false
        if (scholarship.agemax && profile.age > scholarship.agemax) return false
      }
      if (scholarship.gendereligibility && scholarship.gendereligibility.length > 0) {
        if (!scholarship.gendereligibility.includes(profile.gender)) return false
      }
      if (scholarship.requiresdisability && !profile.hasdisability) return false
      if (scholarship.courseeligibility && scholarship.courseeligibility.length > 0) {
        if (!scholarship.courseeligibility.includes(profile.course)) return false
      }
      if (scholarship.yeareligibility && scholarship.yeareligibility.length > 0) {
        if (!scholarship.yeareligibility.includes(profile.year)) return false
      }
      if (scholarship.stateapplicability && 
          !scholarship.stateapplicability.includes("ALL") &&
          !scholarship.stateapplicability.includes(profile.state)) return false
      return true
    })

    setScholarships(eligible)
    setLoading(false)
  }

  const toggleFavorite = (scholarshipId) => {
    if (!userId) {
      toast.error("Please login to save favorites")
      return
    }

    const newFavorites = new Set(favorites)
    if (newFavorites.has(scholarshipId)) {
      newFavorites.delete(scholarshipId)
      toast.success("Removed from favorites")
    } else {
      newFavorites.add(scholarshipId)
      toast.success("Added to favorites")
    }
    setFavorites(newFavorites)
    localStorage.setItem(`favorites_${userId}`, JSON.stringify([...newFavorites]))
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(20)
    doc.text("Your Eligible Scholarships", 20, 20)
    doc.setFontSize(12)
    doc.text(`Total: ${scholarships.length} scholarships`, 20, 35)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45)

    let yPos = 60
    scholarships.forEach((scholarship, index) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      doc.setFontSize(14)
      doc.text(`${index + 1}. ${scholarship.name}`, 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (scholarship.benefits) {
        doc.text(`Benefits: ${scholarship.benefits}`, 25, yPos)
        yPos += 6
      }
      if (scholarship.deadline) {
        doc.text(`Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}`, 25, yPos)
        yPos += 6
      }
      yPos += 10
    })

    doc.save("scholarships.pdf")
    toast.success("PDF downloaded!")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center animate-fadeInUp">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Finding your scholarships...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
          <button onClick={() => navigate("/profile")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap animate-fadeInDown">
            <ArrowLeft className="w-5 h-5" />
            Edit Profile
          </button>
          <div className="flex-1 text-center animate-fadeInDown" style={{animationDelay: '0.1s'}}>
            <h1 className="text-2xl font-bold text-gray-900">
              {scholarships.length} Scholarships Found
            </h1>
          </div>
          <Button onClick={downloadPDF} variant="outline" className="flex items-center gap-2 whitespace-nowrap animate-fadeInDown" style={{animationDelay: '0.2s'}}>
            <Download className="w-5 h-5" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {scholarships.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center animate-fadeInUp">
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No scholarships found yet</h2>
            <p className="text-gray-600 mb-6">Update your profile to see more matching scholarships</p>
            <Button onClick={() => navigate("/profile")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Update Profile
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {scholarships.map((scholarship, idx) => (
              <div 
                key={scholarship.id} 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow animate-fadeInUp"
                style={{animationDelay: `${(idx % 3) * 0.1}s`}}
              >
                {/* Card Header */}
                <div className="p-6 flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ScholarshipIcon />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{scholarship.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{scholarship.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(scholarship.id)}
                    className={`p-3 rounded-lg transition-colors ${
                      favorites.has(scholarship.id)
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-400 hover:text-red-600"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${favorites.has(scholarship.id) ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="px-6 pb-6 space-y-4">
                  {/* Benefits */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Benefits</p>
                    <p className="text-lg font-bold text-blue-600">{scholarship.benefits}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(scholarship.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BadgeIcon />
                      <div>
                        <p className="text-xs text-gray-500">Eligibility</p>
                        <p className="font-semibold text-gray-900">
                          {scholarship.categoryeligibility.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Documents</p>
                        <p className="font-semibold text-gray-900">{scholarship.requireddocuments?.length || 0} docs</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  {scholarship.requireddocuments && scholarship.requireddocuments.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Required Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.requireddocuments.map((doc, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                  {scholarship.applicationurl && (
                    <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <a href={scholarship.applicationurl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button onClick={() => navigate("/favorites")} variant="outline" className="flex-1 border-gray-300 rounded-lg">
                    View Saved
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Results
