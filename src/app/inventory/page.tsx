'use client'

import { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'

interface InventoryItem {
  _id: string
  name: string
  category: string
  sku: string
  description: string
  quantity: number
  minQuantity: number
  unitPrice: number
  supplier: string
  expiryDate?: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired'
  location: string
  lastUpdated: string
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    sku: '',
    description: '',
    quantity: '',
    minQuantity: '',
    unitPrice: '',
    supplier: '',
    expiryDate: '',
    location: ''
  })

  const categories = [
    'Medicines', 'Medical Equipment', 'Surgical Instruments', 'Consumables',
    'Laboratory Supplies', 'Emergency Supplies', 'Cleaning Supplies', 'Office Supplies'
  ]

  const suppliers = [
    'MedSupply Corp', 'HealthTech Solutions', 'Pharma Distributors Inc',
    'Medical Equipment Ltd', 'Bio-Lab Supplies', 'SurgiCare International'
  ]

  const locations = [
    'Main Pharmacy', 'Emergency Room', 'Operating Theater', 'Laboratory',
    'ICU Storage', 'General Ward', 'Outpatient Clinic', 'Central Warehouse'
  ]

  // Simulate API data - In real app, this would come from backend
  useEffect(() => {
    const loadSampleData = () => {
      const sampleItems: InventoryItem[] = [
        {
          _id: '1',
          name: 'Paracetamol 500mg',
          category: 'Medicines',
          sku: 'MED-001',
          description: 'Pain relief medication',
          quantity: 500,
          minQuantity: 100,
          unitPrice: 0.25,
          supplier: 'Pharma Distributors Inc',
          expiryDate: '2025-12-31',
          status: 'in-stock',
          location: 'Main Pharmacy',
          lastUpdated: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Digital Thermometer',
          category: 'Medical Equipment',
          sku: 'EQP-001',
          description: 'Non-contact infrared thermometer',
          quantity: 25,
          minQuantity: 10,
          unitPrice: 45.99,
          supplier: 'MedSupply Corp',
          status: 'in-stock',
          location: 'Emergency Room',
          lastUpdated: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Surgical Gloves (Box)',
          category: 'Consumables',
          sku: 'CON-001',
          description: 'Latex-free surgical gloves, size M',
          quantity: 15,
          minQuantity: 20,
          unitPrice: 12.50,
          supplier: 'SurgiCare International',
          status: 'low-stock',
          location: 'Operating Theater',
          lastUpdated: new Date().toISOString()
        },
        {
          _id: '4',
          name: 'Blood Test Tubes',
          category: 'Laboratory Supplies',
          sku: 'LAB-001',
          description: 'EDTA blood collection tubes',
          quantity: 0,
          minQuantity: 50,
          unitPrice: 0.75,
          supplier: 'Bio-Lab Supplies',
          status: 'out-of-stock',
          location: 'Laboratory',
          lastUpdated: new Date().toISOString()
        },
        {
          _id: '5',
          name: 'Insulin Pens',
          category: 'Medicines',
          sku: 'MED-002',
          description: 'Disposable insulin injection pens',
          quantity: 80,
          minQuantity: 30,
          unitPrice: 8.99,
          supplier: 'Pharma Distributors Inc',
          expiryDate: '2024-06-30',
          status: 'expired',
          location: 'Main Pharmacy',
          lastUpdated: new Date().toISOString()
        }
      ]
      setItems(sampleItems)
      setIsLoading(false)
    }

    loadSampleData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const itemData = {
        ...newItem,
        quantity: parseInt(newItem.quantity),
        minQuantity: parseInt(newItem.minQuantity),
        unitPrice: parseFloat(newItem.unitPrice),
        _id: editingItem ? editingItem._id : Date.now().toString(),
        lastUpdated: new Date().toISOString(),
        status: getItemStatus(parseInt(newItem.quantity), parseInt(newItem.minQuantity), newItem.expiryDate)
      }

      if (editingItem) {
        setItems(items.map(item => item._id === editingItem._id ? itemData as InventoryItem : item))
      } else {
        setItems([...items, itemData as InventoryItem])
      }

      setShowAddForm(false)
      setEditingItem(null)
      setNewItem({
        name: '', category: '', sku: '', description: '', quantity: '',
        minQuantity: '', unitPrice: '', supplier: '', expiryDate: '', location: ''
      })
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const getItemStatus = (quantity: number, minQuantity: number, expiryDate?: string): InventoryItem['status'] => {
    if (expiryDate && new Date(expiryDate) < new Date()) return 'expired'
    if (quantity === 0) return 'out-of-stock'
    if (quantity <= minQuantity) return 'low-stock'
    return 'in-stock'
  }

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setNewItem({
      name: item.name,
      category: item.category,
      sku: item.sku,
      description: item.description,
      quantity: item.quantity.toString(),
      minQuantity: item.minQuantity.toString(),
      unitPrice: item.unitPrice.toString(),
      supplier: item.supplier,
      expiryDate: item.expiryDate || '',
      location: item.location
    })
    setShowAddForm(true)
  }

  const handleDelete = (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    setItems(items.filter(item => item._id !== itemId))
  }

  const handleStockUpdate = (itemId: string, newQuantity: number) => {
    setItems(items.map(item => 
      item._id === itemId 
        ? { 
            ...item, 
            quantity: newQuantity, 
            status: getItemStatus(newQuantity, item.minQuantity, item.expiryDate),
            lastUpdated: new Date().toISOString()
          }
        : item
    ))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800'
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'out-of-stock':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getTotalValue = () => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0).toFixed(2)
  }

  const getLowStockCount = () => {
    return items.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length
  }

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <div className="flex space-x-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              📊 Generate Report
            </button>
            <button
              onClick={() => {setShowAddForm(true); setEditingItem(null)}}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              📦 Add New Item
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-3xl font-bold text-blue-600">{items.length}</p>
            </div>
            <div className="text-blue-500 text-3xl">📦</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-3xl font-bold text-green-600">${getTotalValue()}</p>
            </div>
            <div className="text-green-500 text-3xl">💰</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Low Stock Alert</p>
              <p className="text-3xl font-bold text-red-600">{getLowStockCount()}</p>
            </div>
            <div className="text-red-500 text-3xl">⚠️</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Categories</p>
              <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
            </div>
            <div className="text-purple-500 text-3xl">🏷️</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items by name, SKU, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Items List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading inventory...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No items found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                        <div className="text-sm text-gray-500">{item.supplier}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleStockUpdate(item._id, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            style={{ color: '#111827', backgroundColor: '#ffffff' }}
                          />
                          <span className="text-gray-500">/ {item.minQuantity} min</span>
                        </div>
                      </div>
                      {item.expiryDate && (
                        <div className="text-xs text-gray-500">
                          Expires: {new Date(item.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.unitPrice.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        Total: ${(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => {setShowAddForm(false); setEditingItem(null)}}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={newItem.sku}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <select
                    name="supplier"
                    value={newItem.supplier}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map(supplier => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleChange}
                    min="0"
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Quantity</label>
                  <input
                    type="number"
                    name="minQuantity"
                    value={newItem.minQuantity}
                    onChange={handleChange}
                    min="0"
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price ($)</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={newItem.unitPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    name="location"
                    value={newItem.location}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={newItem.expiryDate}
                    onChange={handleChange}
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  rows={3}
                  className={inputClassName}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  placeholder="Enter item description..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {setShowAddForm(false); setEditingItem(null)}}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AuthenticatedLayout>
  )
}
