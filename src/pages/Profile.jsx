import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { auth, db } from "@/config/firebase"
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from "sonner"
import PersonalInfoStep from "@/components/profile/PersonalInfoStep"
import AcademicInfoStep from "@/components/profile/AcademicInfoStep"
import FinancialInfoStep from "@/components/profile/FinancialInfoStep"
import { ChevronRight, ArrowLeft } from "lucide-react"
import Logo from "@/components/Logo"

// Step Icons - Clean Outlined
const StepIcon = ({ step }) => {
  if (step === 1) {
    return (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 38C12 31 18 26 24 26C30 26 36 31 36 38" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  if (step === 2) {
    return (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12C8 10 10 8 12 8H36C38 8 40 10 40 12V36C40 38 38 40 36 40H12C10 40 8 38 8 36V12Z" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="15" y1="26" x2="33" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="15" y1="33" x2="33" y2="33" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    )
  }
  if (step === 3) {
    return (
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14C12 12 14 10 16 10H32C34 10 36 12 36 14V36C36 38 34 40 32 40H16C14 40 12 38 12 36V14Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M21 24L23 26L27 22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
}

const Profile = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  const [profileData, setProfileData] = useState({
    incomerange: "",
    age: null,
    gender: "",
    category: "",
    hasdisability: false,
    course: "",
    year: "",
    state: "",
    district: "",
    familysize: null,
  })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        loadProfile(user.uid)
      }
    })
  }

  const loadProfile = async (id) => {
    try {
      const docRef = doc(db, 'profiles', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setProfileData({
          incomerange: data.income_range || "",
          age: data.age,
          gender: data.gender || "",
          category: data.category || "",
          hasdisability: data.has_disability || false,
          course: data.course || "",
          year: data.year || "",
          state: data.state || "",
          district: data.district || "",
          familysize: data.family_size,
        })
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!profileData.age || !profileData.familysize) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)

    if (userId) {
      try {
        const firestoreData = {
          income_range: profileData.incomerange,
          age: profileData.age,
          gender: profileData.gender,
          category: profileData.category,
          has_disability: profileData.hasdisability,
          course: profileData.course,
          year: profileData.year,
          state: profileData.state,
          district: profileData.district,
          family_size: profileData.familysize,
          updated_at: new Date()
        }

        await setDoc(doc(db, 'profiles', userId), firestoreData)
        toast.success("Profile saved!")
      } catch (error) {
        toast.error("Error saving profile")
        console.error(error)
        setLoading(false)
        return
      }
    }

    sessionStorage.setItem("profileData", JSON.stringify(profileData))
    toast.success("Finding scholarships...")
    setLoading(false)
    navigate("/results")
  }

  const steps = [
    { num: 1, title: "Personal", color: "text-blue-600" },
    { num: 2, title: "Academic", color: "text-purple-600" },
    { num: 3, title: "Financial", color: "text-green-600" }
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={profileData} onChange={(field, value) => setProfileData({ ...profileData, [field]: value })} />
      case 2:
        return <AcademicInfoStep data={profileData} onChange={(field, value) => setProfileData({ ...profileData, [field]: value })} />
      case 3:
        return <FinancialInfoStep data={profileData} onChange={(field, value) => setProfileData({ ...profileData, [field]: value })} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium animate-fadeInDown">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3 animate-fadeInDown" style={{animationDelay: '0.1s'}}>
            <Logo size="sm" />
            <span className="font-semibold text-gray-900">Build Your Profile</span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Step Indicators */}
        <div className="flex gap-4 mb-12 animate-fadeInUp">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`flex-1 p-4 rounded-lg text-center transition-all cursor-pointer ${
                currentStep === step.num
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : currentStep > step.num
                  ? "bg-green-100 text-green-900 border border-green-300"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
              onClick={() => currentStep > step.num && setCurrentStep(step.num)}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                currentStep === step.num ? "bg-white bg-opacity-20" : ""
              }`}>
                <StepIcon step={step.num} />
              </div>
              <p className="font-semibold text-sm">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep - 1].title} Information
          </h2>
          <p className="text-gray-600 mb-8">Step {currentStep} of 3</p>

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium disabled:opacity-50"
            >
              Back
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-70"
              >
                {loading ? "Finding Scholarships..." : "Find My Scholarships"}
              </Button>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-blue-900">💡 Tip:</span> The more details you provide, the better scholarships we can match for you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
