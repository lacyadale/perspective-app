// File: Perspective/03_Tech_App_Dev/WheelMate/frontend/src/pages/WheelMate.js

import React, { useState } from "react"

export default function WheelMate() {
  const [filters, setFilters] = useState({
    minPremium: 0.3,
    maxIVRank: 70,
    avoidEarnings: true,
    avoidBreakdowns: true,
  })

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const runScreener = async () => {
    setLoading(true)
    // placeholder fetch — replace with your backend API later
    const mockResults = [
      { symbol: "AAPL", premium: 0.42, ivRank: 61, safe: true },
      { symbol: "TSLA", premium: 0.58, ivRank: 72, safe: false },
    ]
    setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">📊 WheelMate Screener</h1>
      <p className="text-gray-600 mb-4">Find high-probability, low-risk options trades using your custom strategy.</p>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
        <h2 className="font-semibold mb-2">🎯 Filters</h2>
        <label>
          Min Premium ($):
          <input
            type="number"
            value={filters.minPremium}
            onChange={(e) => setFilters({ ...filters, minPremium: parseFloat(e.target.value) })}
            className="ml-2 border rounded px-2 py-1"
          />
        </label>
        <br />
        <label>
          Max IV Rank:
          <input
            type="number"
            value={filters.maxIVRank}
            onChange={(e) => setFilters({ ...filters, maxIVRank: parseInt(e.target.value) })}
            className="ml-2 border rounded px-2 py-1"
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={filters.avoidEarnings}
            onChange={(e) => setFilters({ ...filters, avoidEarnings: e.target.checked })}
          />
          Avoid Earnings
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={filters.avoidBreakdowns}
            onChange={(e) => setFilters({ ...filters, avoidBreakdowns: e.target.checked })}
          />
          Avoid Technical Breakdowns
        </label>
        <br />
        <button
          onClick={runScreener}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Scanning..." : "Run Screener"}
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">✅ Results</h2>
        {results.length === 0 ? (
          <p>No results yet. Run the screener to get trade ideas.</p>
        ) : (
          <ul>
            {results.map((r) => (
              <li key={r.symbol}>
                <strong>{r.symbol}</strong>: Premium ${r.premium.toFixed(2)}, IV Rank {r.ivRank},{" "}
                {r.safe ? "🟢 Safe" : "🔴 Risky"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
