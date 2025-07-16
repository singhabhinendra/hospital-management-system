'use client'

import { useState, useEffect } from 'react'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('patients')
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAllReports, setShowAllReports] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [reportData, setReportData] = useState<{
    type: string;
    dateRange: { startDate: string; endDate: string };
    generatedAt: string;
    summary: {
      totalRecords: number;
      averageValue: number;
      growthRate: string;
    };
  } | null>(null)

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
    { id: 1, name: 'Monthly Patient Report', type: 'Patients', date: '2024-01-15', status: 'Completed', size: '2.3 MB', downloadUrl: '#' },
    { id: 2, name: 'Revenue Analysis Q4', type: 'Revenue', date: '2024-01-14', status: 'Completed', size: '1.8 MB', downloadUrl: '#' },
    { id: 3, name: 'Doctor Performance Review', type: 'Doctors', date: '2024-01-13', status: 'In Progress', size: 'Processing...', downloadUrl: null },
    { id: 4, name: 'Appointment Trends', type: 'Appointments', date: '2024-01-12', status: 'Completed', size: '3.1 MB', downloadUrl: '#' },
    { id: 5, name: 'Department Statistics', type: 'Departments', date: '2024-01-11', status: 'Completed', size: '1.5 MB', downloadUrl: '#' },
    { id: 6, name: 'Inventory Report', type: 'Inventory', date: '2024-01-10', status: 'Completed', size: '2.7 MB', downloadUrl: '#' },
    { id: 7, name: 'Weekly Patient Demographics', type: 'Patients', date: '2024-01-09', status: 'Completed', size: '1.2 MB', downloadUrl: '#' },
    { id: 8, name: 'Emergency Department Analytics', type: 'Departments', date: '2024-01-08', status: 'Completed', size: '4.5 MB', downloadUrl: '#' }
  ]

  const [scheduleForm, setScheduleForm] = useState({
    reportType: 'patients',
    frequency: 'weekly',
    startDate: new Date().toISOString().split('T')[0],
    time: '09:00',
    email: '',
    emailList: [] as string[]
  })

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
    console.log('Export button clicked, format:', format)
    
    if (!reportData) {
      alert('Please generate a report first before exporting.')
      return
    }

    console.log('Report data available, proceeding with export...')

    // Create sample data for export
    const sampleData = [
      { ID: 1, Name: 'John Doe', Date: '2024-01-15', Value: '150', Status: 'Completed' },
      { ID: 2, Name: 'Jane Smith', Date: '2024-01-14', Value: '200', Status: 'Active' },
      { ID: 3, Name: 'Bob Johnson', Date: '2024-01-13', Value: '175', Status: 'Pending' },
      { ID: 4, Name: 'Alice Brown', Date: '2024-01-12', Value: '225', Status: 'Completed' },
      { ID: 5, Name: 'Charlie Wilson', Date: '2024-01-11', Value: '180', Status: 'Active' }
    ]

    if (format === 'csv') {
      try {
        console.log('Generating CSV export...')
        // Export as CSV
        const headers = Object.keys(sampleData[0]).join(',')
        const rows = sampleData.map(row => Object.values(row).join(',')).join('\n')
        const csvContent = headers + '\n' + rows
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        console.log('CSV export completed successfully')
      } catch (error) {
        console.error('CSV export failed:', error)
        alert('CSV export failed. Please try again.')
        return
      }
      
    } else if (format === 'excel') {
      try {
        console.log('Generating Excel export...')
        // Export as Excel (using simple HTML table format)
        const headers = Object.keys(sampleData[0]).map(key => `<th>${key}</th>`).join('')
        const rows = sampleData.map(row => 
          `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join('')}</tr>`
        ).join('')
        
        const htmlContent = `
          <table border="1">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        `
        
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `${reportType}_report_${new Date().toISOString().split('T')[0]}.xls`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        console.log('Excel export completed successfully')
      } catch (error) {
        console.error('Excel export failed:', error)
        alert('Excel export failed. Please try again.')
        return
      }
      
    } else if (format === 'pdf') {
      try {
        console.log('Generating PDF export...')
        // For PDF, we'll create a printable version
        const printWindow = window.open('', '_blank')
        
        if (!printWindow) {
          alert('Please allow popups for this site to export PDF reports.')
          return
        }
        
        const reportTypeLabel = reportTypes.find(t => t.value === reportType)?.label || reportType
        
        printWindow.document.write(`
          <html>
            <head>
              <title>${reportTypeLabel} Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; }
                h1 { color: #333; }
                .report-info { margin: 20px 0; }
              </style>
            </head>
            <body>
              <h1>${reportTypeLabel}</h1>
              <div class="report-info">
                <p><strong>Date Range:</strong> ${dateRange.startDate} to ${dateRange.endDate}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Total Records:</strong> ${reportData.summary.totalRecords}</p>
                <p><strong>Average Value:</strong> ${reportData.summary.averageValue}</p>
              </div>
              <table>
                <thead>
                  <tr>
                    ${Object.keys(sampleData[0]).map(key => `<th>${key}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${sampleData.map(row => 
                    `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join('')}</tr>`
                  ).join('')}
                </tbody>
              </table>
            </body>
          </html>
        `)
        
        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
          printWindow.print()
        }, 250)
        console.log('PDF export window opened successfully')
      } catch (error) {
        console.error('PDF export failed:', error)
        alert('PDF export failed. Please try again.')
        return
      }
    }
    
    // Show success message
    const typeLabels: Record<string, string> = {
      csv: 'CSV',
      excel: 'Excel',
      pdf: 'PDF'
    }
    alert(`${typeLabels[format]} export completed successfully!`)
  }

  const scheduleReport = () => {
    if (!scheduleForm.email) {
      alert('Please enter an email address for scheduled reports.')
      return
    }

    // Simulate scheduling API call
    console.log('Scheduling report with:', scheduleForm)
    
    // In a real application, this would make an API call to schedule the report
    setTimeout(() => {
      alert(`Report scheduled successfully! ${scheduleForm.frequency.charAt(0).toUpperCase() + scheduleForm.frequency.slice(1)} ${scheduleForm.reportType} reports will be sent to ${scheduleForm.email} starting ${scheduleForm.startDate} at ${scheduleForm.time}.`)
      setShowScheduleModal(false)
      setScheduleForm({
        reportType: 'patients',
        frequency: 'weekly',
        startDate: new Date().toISOString().split('T')[0],
        time: '09:00',
        email: '',
        emailList: []
      })
    }, 1000)
  }

  const addEmailToList = () => {
    if (scheduleForm.email && !scheduleForm.emailList.includes(scheduleForm.email)) {
      setScheduleForm({
        ...scheduleForm,
        emailList: [...scheduleForm.emailList, scheduleForm.email],
        email: ''
      })
    }
  }

  const removeEmailFromList = (emailToRemove: string) => {
    setScheduleForm({
      ...scheduleForm,
      emailList: scheduleForm.emailList.filter(email => email !== emailToRemove)
    })
  }

  const downloadReport = (report: typeof recentReports[0]) => {
    if (!report.downloadUrl) {
      alert('This report is not available for download yet.')
      return
    }

    // Simulate file download
    console.log('Downloading report:', report.name)
    
    // Create a mock file download
    const reportContent = `Report: ${report.name}\nType: ${report.type}\nGenerated: ${report.date}\nStatus: ${report.status}\nSize: ${report.size}\n\nSample Report Data:\nID,Name,Value,Status\n1,Sample Data 1,100,Active\n2,Sample Data 2,200,Completed\n3,Sample Data 3,150,Pending`
    
    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${report.name.replace(/\s+/g, '_')}_${report.date}.txt`
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert(`Downloaded: ${report.name}`)
  }

  const viewReport = (report: typeof recentReports[0]) => {
    // Create a detailed view modal/window
    const reportWindow = window.open('', '_blank', 'width=800,height=600')
    
    if (!reportWindow) {
      alert('Please allow popups to view reports.')
      return
    }

    const reportTypeLabel = reportTypes.find(t => t.value === report.type.toLowerCase())?.label || report.type
    
    reportWindow.document.write(`
      <html>
        <head>
          <title>${report.name} - Report View</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              background-color: #f5f5f5; 
            }
            .header { 
              background: #2563eb; 
              color: white; 
              padding: 20px; 
              border-radius: 8px; 
              margin-bottom: 20px; 
            }
            .content { 
              background: white; 
              padding: 20px; 
              border-radius: 8px; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
            }
            .stat-grid { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
              gap: 15px; 
              margin: 20px 0; 
            }
            .stat-card { 
              background: #f8fafc; 
              padding: 15px; 
              border-radius: 6px; 
              border-left: 4px solid #2563eb; 
            }
            .stat-label { 
              font-size: 12px; 
              color: #64748b; 
              margin-bottom: 5px; 
            }
            .stat-value { 
              font-size: 24px; 
              font-weight: bold; 
              color: #1e293b; 
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px; 
            }
            th, td { 
              border: 1px solid #e2e8f0; 
              padding: 12px; 
              text-align: left; 
            }
            th { 
              background-color: #f1f5f9; 
              font-weight: bold; 
            }
            .status-completed { 
              background: #dcfce7; 
              color: #166534; 
              padding: 4px 8px; 
              border-radius: 12px; 
              font-size: 12px; 
            }
            .status-active { 
              background: #dbeafe; 
              color: #1d4ed8; 
              padding: 4px 8px; 
              border-radius: 12px; 
              font-size: 12px; 
            }
            .status-pending { 
              background: #fef3c7; 
              color: #92400e; 
              padding: 4px 8px; 
              border-radius: 12px; 
              font-size: 12px; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${report.name}</h1>
            <p>Report Type: ${reportTypeLabel} | Generated: ${report.date} | Status: ${report.status}</p>
          </div>
          
          <div class="content">
            <h2>Report Summary</h2>
            <div class="stat-grid">
              <div class="stat-card">
                <div class="stat-label">Total Records</div>
                <div class="stat-value">${Math.floor(Math.random() * 1000) + 100}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">File Size</div>
                <div class="stat-value">${report.size}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Processing Time</div>
                <div class="stat-value">${Math.floor(Math.random() * 10) + 1}min</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Data Quality</div>
                <div class="stat-value">${Math.floor(Math.random() * 20) + 80}%</div>
              </div>
            </div>

            <h3>Sample Data Preview</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name/Description</th>
                  <th>Value</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>Sample Record 1</td>
                  <td>$${Math.floor(Math.random() * 1000) + 100}</td>
                  <td>2024-01-15</td>
                  <td><span class="status-completed">Completed</span></td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Sample Record 2</td>
                  <td>$${Math.floor(Math.random() * 1000) + 100}</td>
                  <td>2024-01-14</td>
                  <td><span class="status-active">Active</span></td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>Sample Record 3</td>
                  <td>$${Math.floor(Math.random() * 1000) + 100}</td>
                  <td>2024-01-13</td>
                  <td><span class="status-pending">Pending</span></td>
                </tr>
                <tr>
                  <td>004</td>
                  <td>Sample Record 4</td>
                  <td>$${Math.floor(Math.random() * 1000) + 100}</td>
                  <td>2024-01-12</td>
                  <td><span class="status-completed">Completed</span></td>
                </tr>
                <tr>
                  <td>005</td>
                  <td>Sample Record 5</td>
                  <td>$${Math.floor(Math.random() * 1000) + 100}</td>
                  <td>2024-01-11</td>
                  <td><span class="status-active">Active</span></td>
                </tr>
              </tbody>
            </table>
            
            <div style="margin-top: 30px; text-align: center;">
              <button onclick="window.print()" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; margin-right: 10px;">Print Report</button>
              <button onclick="window.close()" style="background: #6b7280; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;">Close</button>
            </div>
          </div>
        </body>
      </html>
    `)
    
    reportWindow.document.close()
    console.log('Opened report view for:', report.name)
  }

  const deleteReport = (report: typeof recentReports[0]) => {
    const confirmed = window.confirm(`Are you sure you want to delete the report "${report.name}"? This action cannot be undone.`)
    
    if (confirmed) {
      console.log('Deleting report:', report.name)
      
      // In a real application, this would make an API call to delete the report
      // For now, we'll simulate the deletion
      setTimeout(() => {
        alert(`Report "${report.name}" has been deleted successfully.`)
        // Note: In a real app, you would update the state to remove the report from the list
        // For this demo, we'll just show the success message
      }, 500)
    }
  }

  // Filter reports based on search and filter criteria
  const filteredReports = recentReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === '' || report.type === typeFilter
    const matchesStatus = statusFilter === '' || report.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
          >
            <span>📧</span>
            <span>Schedule Report</span>
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
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                      reportType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl flex-shrink-0">{type.icon}</span>
                      <div className="flex-1">
                        <span className="font-medium text-sm md:text-base block">{type.label}</span>
                        <span className="text-xs text-gray-500 block mt-1">
                          {type.value === 'patients' && 'Demographics and patient statistics'}
                          {type.value === 'appointments' && 'Appointment trends and scheduling data'}
                          {type.value === 'revenue' && 'Financial performance and revenue analysis'}
                          {type.value === 'doctors' && 'Doctor performance and productivity metrics'}
                          {type.value === 'departments' && 'Department-wise statistics and utilization'}
                          {type.value === 'inventory' && 'Stock levels and inventory management'}
                        </span>
                      </div>
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
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => exportReport('pdf')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span className="text-lg">📄</span>
                    <span>Export PDF</span>
                  </button>
                  <button
                    onClick={() => exportReport('excel')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span className="text-lg">📊</span>
                    <span>Export Excel</span>
                  </button>
                  <button
                    onClick={() => exportReport('csv')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <span className="text-lg">📋</span>
                    <span>Export CSV</span>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Choose your preferred export format for the generated report data
                </p>
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
          
          <button 
            onClick={() => setShowAllReports(true)}
            className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
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

      {/* View All Reports Modal */}
      {showAllReports && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">All Reports</h2>
              <button 
                onClick={() => setShowAllReports(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="mb-4 flex space-x-4">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Patients">Patients</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Doctors">Doctors</option>
                  <option value="Appointments">Appointments</option>
                  <option value="Departments">Departments</option>
                  <option value="Inventory">Inventory</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div className="grid gap-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{report.name}</h3>
                        <p className="text-sm text-gray-600">{report.type}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">📅 {report.date}</span>
                          <span className="text-xs text-gray-500">📁 {report.size}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            report.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {report.downloadUrl && (
                          <button 
                            onClick={() => downloadReport(report)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            📥 Download
                          </button>
                        )}
                        <button 
                          onClick={() => viewReport(report)}
                          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                        >
                          👁️ View
                        </button>
                        <button 
                          onClick={() => deleteReport(report)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Schedule Report</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={scheduleForm.reportType}
                  onChange={(e) => setScheduleForm({...scheduleForm, reportType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={scheduleForm.frequency}
                  onChange={(e) => setScheduleForm({...scheduleForm, frequency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={scheduleForm.startDate}
                    onChange={(e) => setScheduleForm({...scheduleForm, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Recipients</label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={scheduleForm.email}
                    onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                    placeholder="Enter email address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addEmailToList}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md"
                  >
                    Add
                  </button>
                </div>
                
                {scheduleForm.emailList.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {scheduleForm.emailList.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded">
                        <span className="text-sm">{email}</span>
                        <button
                          onClick={() => removeEmailFromList(email)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={scheduleReport}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Schedule Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
