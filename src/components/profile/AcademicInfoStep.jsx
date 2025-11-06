import { Label } from "@/components/ui/label"

const AcademicInfoStep = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Course Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="course" className="text-sm font-semibold text-gray-700">
          Course *
        </Label>
        <select
          id="course"
          value={data.course}
          onChange={(e) => onChange("course", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer font-medium"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select your course</option>
          <option value="B.Tech">B.Tech (Engineering)</option>
          <option value="B.Sc">B.Sc (Science)</option>
          <option value="B.Com">B.Com (Commerce)</option>
          <option value="B.A">B.A (Arts)</option>
          <option value="BCA">BCA (Computer Science)</option>
          <option value="M.Tech">M.Tech (Masters Engineering)</option>
          <option value="M.Sc">M.Sc (Masters Science)</option>
          <option value="MBA">MBA (Business)</option>
        </select>
      </div>

      {/* Year Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="year" className="text-sm font-semibold text-gray-700">
          Year of Study *
        </Label>
        <select
          id="year"
          value={data.year}
          onChange={(e) => onChange("year", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer font-medium"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-blue-900">📚 Info:</span> Your course and year help us match you with the most relevant scholarships.
        </p>
      </div>
    </div>
  )
}

export default AcademicInfoStep
