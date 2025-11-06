import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const FinancialInfoStep = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Family Size Input */}
      <div className="space-y-2">
        <Label htmlFor="family_size" className="text-sm font-semibold text-gray-700">
          Family Size *
        </Label>
        <Input
          id="family_size"
          type="number"
          min="1"
          max="20"
          placeholder="Number of family members"
          value={data.familysize || ""}
          onChange={(e) => onChange("familysize", parseInt(e.target.value) || null)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
        />
      </div>

      {/* Income Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="income_range" className="text-sm font-semibold text-gray-700">
          Annual Family Income *
        </Label>
        <select
          id="income_range"
          value={data.incomerange}
          onChange={(e) => onChange("incomerange", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer font-medium"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select income range</option>
          <option value="0-250000">₹0 - ₹2.5 Lakh</option>
          <option value="250000-500000">₹2.5 - ₹5 Lakh</option>
          <option value="500000-800000">₹5 - ₹8 Lakh</option>
          <option value="800000-1200000">₹8 - ₹12 Lakh</option>
          <option value="1200000+">₹12 Lakh+</option>
        </select>
      </div>

      {/* Disability Checkbox */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
          <input
            id="disability"
            type="checkbox"
            checked={data.hasdisability || false}
            onChange={(e) => onChange("hasdisability", e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <Label htmlFor="disability" className="text-sm font-semibold text-gray-700 cursor-pointer mb-0">
            I have a disability
          </Label>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-green-900">💰 Tip:</span> Accurate financial information helps us find scholarships suited to your needs.
        </p>
      </div>
    </div>
  )
}

export default FinancialInfoStep
