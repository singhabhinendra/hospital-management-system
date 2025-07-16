'use client'

import { useState, useEffect } from 'react'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('patients')
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportData, setReportData] = useState(null)

  const reportTypes = [
    { value: 'patients', label: 'Patient Demographics Report', icon: '👥' },
    { value: 'appointments', label: 'Appointments Summary', icon: '📅' },
    { value: 'revenue', label: 'Revenue Analysis', icon: '💰' },
    { value: 'doctors', label: 'Doctor Performance', icon: '👨‍⚕️' },
    { value: 'departments', label: 'Department Statistics', icon: '🏥' },
    { value: 'inventory', label: 'Inventory Report', icon: '📦' }
  ]

  const quickStats = [
    { title: 'Total Reports Generated', value: '234', icon: '📊', color: 'bg-blue-500' },
    { title: 'This Month', value: '45', icon: '📈', color: 'bg-green-500' },
    { title: 'Pending Reviews', value: '12', icon: '⏳', color: 'bg-yellow-500' },
    { title: 'Archived Reports', value: '189', icon: '🗄️', color: 'bg-purple-500' }
  ]

  const recentReports = [
    { id: 1, name: 'Monthly Patient Report', type: 'Patients', date: '2024-01-15', status: 'Completed' },
    { id: 2, name: 'Revenue Analysis Q4', type: 'Revenue', date: '2024-01-14', status: 'Completed' },
    { id: 3, name: 'Doctor Performance Review', type: 'Doctors', date: '2024-01-13', status: 'In Progress' },
    { id: 4, name: 'Appointment Trends', type: 'Appointments', date: '2024-01-12', status: 'Completed' }
  ]

  const generateReport = async () => {
    setIsGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      setReportData({
        type: reportType,
        dateRange,
        generatedAt: new Date().toISOString(),
        summary: {
          totalRecords: Math.floor(Math.random() * 1000) + 100,
          averageValue: Math.floor(Math.random() * 100) + 50,
          growthRate: (Math.random() * 20 - 10).toFixed(1)
        }
      })
      setIsGenerating(false)
    }, 2000)
  }

  const exportReport = (format: string) => {
    // Simulate export functionality
    alert(`Exporting report in ${format.toUpperCase()} format...`)
  }

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            📤 Export Data
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            📧 Schedule Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-full text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generator */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Generate New Report</h2>
          
          <div className="space-y-6">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setReportType(type.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      reportType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className={inputClassName}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className={inputClassName}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating Report...</span>
                </div>
              ) : (
                '📊 Generate Report'
              )}
            </button>
          </div>

          {/* Report Results */}
          {reportData && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Report Generated Successfully</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{reportData.summary.totalRecords}</p>
                  <p className="text-sm text-gray-600">Total Records</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{reportData.summary.averageValue}</p>
                  <p className="text-sm text-gray-600">Average Value</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${parseFloat(reportData.summary.growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {reportData.summary.growthRate}%
                  </p>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => exportReport('pdf')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  📄 Export PDF
                </button>
                <button
                  onClick={() => exportReport('excel')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  📊 Export Excel
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  📋 Export CSV
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reports</h2>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.type}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">{report.date}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium">
            View All Reports →
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Growth Trend</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600">Chart visualization would appear here</p>
              <p className="text-sm text-gray-500">Integration with Chart.js or similar library</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Distribution</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600">Pie chart visualization would appear here</p>
              <p className="text-sm text-gray-500">Department-wise revenue breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
