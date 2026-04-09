import QuoteCalculator from '@/components/calculator/QuoteCalculator'
import { DEFAULT_TAGRENS_PRICE_CONFIG } from '@/lib/calculators/tagrens'

export default function CalculatorMockup() {
  return (
    <div className="rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="rounded-md bg-white border border-gray-200 px-3 py-1 text-xs text-gray-400 text-center">
            hansen-tagrens.dk/tilbud
          </div>
        </div>
      </div>

      {/* Calculator */}
      <div className="p-4 md:p-6 bg-[#f8f9fa]">
        <QuoteCalculator
          tenantId="demo"
          calculatorId="demo"
          priceConfig={DEFAULT_TAGRENS_PRICE_CONFIG}
          primaryColor="#1B3C2E"
        />
      </div>
    </div>
  )
}
