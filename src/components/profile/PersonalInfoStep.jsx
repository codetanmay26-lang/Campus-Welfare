import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const PersonalInfoStep = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Age Input */}
      <div className="space-y-2">
        <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
          Age *
        </Label>
        <Input
          id="age"
          type="number"
          min="16"
          max="40"
          placeholder="Enter your age"
          value={data.age || ""}
          onChange={(e) => onChange("age", parseInt(e.target.value) || null)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
        />
      </div>

      {/* Gender Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">
          Gender *
        </Label>
        <select
          id="gender"
          value={data.gender}
          onChange={(e) => onChange("gender", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer font-medium"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
          Category *
        </Label>
        <select
          id="category"
          value={data.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer font-medium"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select category</option>
          <option value="GEN">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
      </div>

      {/* State Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
          State *
        </Label>
        <select
          id="state"
          value={data.state}
          onChange={(e) => onChange("state", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer font-medium"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select state</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Delhi">Delhi</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="West Bengal">West Bengal</option>
          <option value="Telangana">Telangana</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Punjab">Punjab</option>
        </select>
      </div>

      {/* District Input */}
      <div className="space-y-2">
        <Label htmlFor="district" className="text-sm font-semibold text-gray-700">
          District
        </Label>
        <Input
          id="district"
          placeholder="Enter your district"
          value={data.district || ""}
          onChange={(e) => onChange("district", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
        />
      </div>
    </div>
  )
}

export default PersonalInfoStep
