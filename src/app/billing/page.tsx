'use client'

import { useState, useEffect } from 'react'

interface BillingRecord {
  _id: string
  patientId: {
    _id: string
    firstName: string
    lastName: string
    patientId: string
    insurance?: {
      provider: string
      policyNumber: string
    }
  }
  invoiceNumber: string
  date: string
  services: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  tax: number
  discount: number
  total: number
  amountPaid: number
  balance: number
  status: 'pending' | 'paid' | 'partially-paid' | 'overdue'
  paymentMethod?: string
  dueDate: string
  createdAt: string
}

export default function BillingPage() {
  const [bills, setBills] = useState<BillingRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState<BillingRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [newBill, setNewBill] = useState({
    patientId: '',
    services: [{ description: '', quantity: 1, unitPrice: 0 }],
    discount: 0,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
  })
  const [patients, setPatients] = useState([])

  const serviceTemplates = [
    { description: 'General Consultation', unitPrice: 150 },
    { description: 'Specialist Consultation', unitPrice: 250 },
    { description: 'Emergency Room Visit', unitPrice: 500 },
    { description: 'X-Ray', unitPrice: 100 },
    { description: 'Blood Test', unitPrice: 75 },
    { description: 'MRI Scan', unitPrice: 800 },
    { description: 'CT Scan', unitPrice: 600 },
    { description: 'Surgery (Minor)', unitPrice: 2000 },
    { description: 'Surgery (Major)', unitPrice: 8000 },
    { description: 'Physical Therapy Session', unitPrice: 120 },
    { description: 'Medication Administration', unitPrice: 50 },
    { description: 'Room Charges (per day)', unitPrice: 300 }
  ]

  // Simulate API data
  useEffect(() => {
    const loadSampleData = () => {
      const sampleBills: BillingRecord[] = [
        {
          _id: '1',
          patientId: {
            _id: 'p1',
            firstName: 'John',
            lastName: 'Doe',
            patientId: 'PAT-001',
            insurance: {
              provider: 'Health Plus Insurance',
              policyNumber: 'HP-123456'
            }
          },
          invoiceNumber: 'INV-2024-001',
          date: '2024-01-15',
          services: [
            { description: 'General Consultation', quantity: 1, unitPrice: 150, total: 150 },
            { description: 'Blood Test', quantity: 2, unitPrice: 75, total: 150 }
          ],
          subtotal: 300,
          tax: 30,
          discount: 0,
          total: 330,
          amountPaid: 330,
          balance: 0,
          status: 'paid',
          paymentMethod: 'Credit Card',
          dueDate: '2024-02-14',
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          _id: '2',
          patientId: {
            _id: 'p2',
            firstName: 'Jane',
            lastName: 'Smith',
            patientId: 'PAT-002'
          },
          invoiceNumber: 'INV-2024-002',
          date: '2024-01-14',
          services: [
            { description: 'Specialist Consultation', quantity: 1, unitPrice: 250, total: 250 },
            { description: 'MRI Scan', quantity: 1, unitPrice: 800, total: 800 }
          ],
          subtotal: 1050,
          tax: 105,
          discount: 50,
          total: 1105,
          amountPaid: 500,
          balance: 605,
          status: 'partially-paid',
          dueDate: '2024-02-13',
          createdAt: '2024-01-14T14:30:00Z'
        },
        {
          _id: '3',
          patientId: {
            _id: 'p3',
            firstName: 'Mike',
            lastName: 'Johnson',
            patientId: 'PAT-003'
          },
          invoiceNumber: 'INV-2024-003',
          date: '2024-01-10',
          services: [
            { description: 'Emergency Room Visit', quantity: 1, unitPrice: 500, total: 500 },
            { description: 'X-Ray', quantity: 2, unitPrice: 100, total: 200 },
            { description: 'Room Charges (per day)', quantity: 2, unitPrice: 300, total: 600 }
          ],
          subtotal: 1300,
          tax: 130,
          discount: 0,
          total: 1430,
          amountPaid: 0,
          balance: 1430,
          status: 'overdue',
          dueDate: '2024-01-25',
          createdAt: '2024-01-10T09:15:00Z'
        }
      ]
      setBills(sampleBills)
      setIsLoading(false)
    }

    // Load sample patients
    const samplePatients = [
      { _id: 'p1', firstName: 'John', lastName: 'Doe', patientId: 'PAT-001' },
      { _id: 'p2', firstName: 'Jane', lastName: 'Smith', patientId: 'PAT-002' },
      { _id: 'p3', firstName: 'Mike', lastName: 'Johnson', patientId: 'PAT-003' }
    ]
    setPatients(samplePatients)

    loadSampleData()
  }, [])

  const calculateServiceTotal = (quantity: number, unitPrice: number) => quantity * unitPrice

  const calculateBillTotal = () => {
    const subtotal = newBill.services.reduce((sum, service) => 
      sum + calculateServiceTotal(service.quantity, service.unitPrice), 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax - newBill.discount
    return { subtotal, tax, total }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { subtotal, tax, total } = calculateBillTotal()
      
      const billData: BillingRecord = {
        _id: Date.now().toString(),
        patientId: patients.find(p => p._id === newBill.patientId),
        invoiceNumber: `INV-${new Date().getFullYear()}-${(bills.length + 1).toString().padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        services: newBill.services.map(service => ({
          ...service,
          total: calculateServiceTotal(service.quantity, service.unitPrice)
        })),
        subtotal,
        tax,
        discount: newBill.discount,
        total,
        amountPaid: 0,
        balance: total,
        status: 'pending',
        dueDate: newBill.dueDate,
        createdAt: new Date().toISOString()
      }

      setBills([billData, ...bills])
      setShowAddForm(false)
      setNewBill({
        patientId: '',
        services: [{ description: '', quantity: 1, unitPrice: 0 }],
        discount: 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })
    } catch (error) {
      console.error('Error creating bill:', error)
    }
  }

  const handlePayment = () => {
    if (!selectedBill) return

    const payment = parseFloat(paymentAmount)
    const newAmountPaid = selectedBill.amountPaid + payment
    const newBalance = selectedBill.total - newAmountPaid
    
    let newStatus: BillingRecord['status'] = 'pending'
    if (newBalance <= 0) newStatus = 'paid'
    else if (newAmountPaid > 0) newStatus = 'partially-paid'

    const updatedBill = {
      ...selectedBill,
      amountPaid: newAmountPaid,
      balance: Math.max(0, newBalance),
      status: newStatus,
      paymentMethod
    }

    setBills(bills.map(bill => bill._id === selectedBill._id ? updatedBill : bill))
    setShowPaymentModal(false)
    setSelectedBill(null)
    setPaymentAmount('')
  }

  const addService = () => {
    setNewBill({
      ...newBill,
      services: [...newBill.services, { description: '', quantity: 1, unitPrice: 0 }]
    })
  }

  const removeService = (index: number) => {
    setNewBill({
      ...newBill,
      services: newBill.services.filter((_, i) => i !== index)
    })
  }

  const updateService = (index: number, field: string, value: any) => {
    const updatedServices = newBill.services.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    )
    setNewBill({ ...newBill, services: updatedServices })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'partially-paid':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.patientId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.patientId.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || bill.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getTotalRevenue = () => {
    return bills.reduce((sum, bill) => sum + bill.amountPaid, 0).toFixed(2)
  }

  const getPendingAmount = () => {
    return bills.reduce((sum, bill) => sum + bill.balance, 0).toFixed(2)
  }

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Billing Management</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
            📊 Financial Report
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            💰 Create Invoice
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Invoices</p>
              <p className="text-3xl font-bold text-blue-600">{bills.length}</p>
            </div>
            <div className="text-blue-500 text-3xl">📄</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">${getTotalRevenue()}</p>
            </div>
            <div className="text-green-500 text-3xl">💰</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Amount</p>
              <p className="text-3xl font-bold text-red-600">${getPendingAmount()}</p>
            </div>
            <div className="text-red-500 text-3xl">⏳</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue Bills</p>
              <p className="text-3xl font-bold text-orange-600">
                {bills.filter(b => b.status === 'overdue').length}
              </p>
            </div>
            <div className="text-orange-500 text-3xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by patient name or invoice number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partially-paid">Partially Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bills...</p>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No bills found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBills.map((bill) => (
                  <tr key={bill._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bill.invoiceNumber}</div>
                        <div className="text-sm text-gray-500">{new Date(bill.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {bill.patientId.firstName} {bill.patientId.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{bill.patientId.patientId}</div>
                        {bill.patientId.insurance && (
                          <div className="text-sm text-gray-500">
                            {bill.patientId.insurance.provider}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${bill.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        {bill.services.length} service{bill.services.length !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${bill.amountPaid.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${bill.balance.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bill.status)}`}>
                        {bill.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {bill.balance > 0 && (
                        <button 
                          onClick={() => {setSelectedBill(bill); setShowPaymentModal(true)}}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Pay
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        View
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Invoice Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Invoice</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                  <select
                    value={newBill.patientId}
                    onChange={(e) => setNewBill({...newBill, patientId: e.target.value})}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient: any) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName} ({patient.patientId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
              </div>

              {/* Services */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Services</h3>
                  <button
                    type="button"
                    onClick={addService}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    + Add Service
                  </button>
                </div>
                
                <div className="space-y-3">
                  {newBill.services.map((service, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded">
                      <div className="col-span-5">
                        <select
                          value={service.description}
                          onChange={(e) => {
                            const template = serviceTemplates.find(t => t.description === e.target.value)
                            updateService(index, 'description', e.target.value)
                            if (template) updateService(index, 'unitPrice', template.unitPrice)
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          style={{ color: '#111827', backgroundColor: '#ffffff' }}
                        >
                          <option value="">Select Service</option>
                          {serviceTemplates.map(template => (
                            <option key={template.description} value={template.description}>
                              {template.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          value={service.quantity}
                          onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value) || 1)}
                          min="1"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          style={{ color: '#111827', backgroundColor: '#ffffff' }}
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Price"
                          value={service.unitPrice}
                          onChange={(e) => updateService(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          style={{ color: '#111827', backgroundColor: '#ffffff' }}
                        />
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm font-medium">
                          ${calculateServiceTotal(service.quantity, service.unitPrice).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-span-1">
                        {newBill.services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount ($)</label>
                  <input
                    type="number"
                    value={newBill.discount}
                    onChange={(e) => setNewBill({...newBill, discount: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
              </div>

              {/* Bill Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Bill Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${calculateBillTotal().subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${calculateBillTotal().tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-${newBill.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t pt-1">
                    <span>Total:</span>
                    <span>${calculateBillTotal().total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Record Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Invoice: {selectedBill.invoiceNumber}</p>
                <p className="text-sm text-gray-600">
                  Patient: {selectedBill.patientId.firstName} {selectedBill.patientId.lastName}
                </p>
                <p className="text-sm text-gray-600">Balance Due: ${selectedBill.balance.toFixed(2)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  max={selectedBill.balance}
                  min="0"
                  step="0.01"
                  className={inputClassName}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className={inputClassName}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                >
                  <option value="cash">Cash</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="check">Check</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  Record Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
