import apiClient from './api';
import { ApiResponse } from './auth';

export interface Patient {
  _id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  allergies: string[];
  medicalHistory: Array<{
    condition: string;
    diagnosedDate: string;
    notes: string;
  }>;
  currentMedications: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
  }>;
  insurance?: {
    provider?: string;
    policyNumber?: string;
    groupNumber?: string;
    validUntil?: string;
  };
  status: 'active' | 'inactive' | 'discharged';
  registrationDate: string;
  lastVisit?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientCreateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  allergies?: string[];
  insurance?: {
    provider?: string;
    policyNumber?: string;
    groupNumber?: string;
    validUntil?: string;
  };
  notes?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PatientQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

class PatientService {
  // Get all patients
  async getPatients(params: PatientQueryParams = {}): Promise<PaginatedResponse<Patient>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await apiClient.get<ApiResponse<{ patients: Patient[] } & PaginatedResponse<Patient>>>(
      `/patients?${queryParams.toString()}`
    );
    
    return {
      data: response.data.patients,
      pagination: response.data.pagination
    };
  }

  // Get patient by ID
  async getPatient(id: string): Promise<Patient> {
    const response = await apiClient.get<ApiResponse<{ patient: Patient }>>(`/patients/${id}`);
    return response.data.patient;
  }

  // Create new patient
  async createPatient(patientData: PatientCreateData): Promise<Patient> {
    const response = await apiClient.post<ApiResponse<{ patient: Patient }>>('/patients', patientData);
    return response.data.patient;
  }

  // Update patient
  async updatePatient(id: string, patientData: Partial<PatientCreateData>): Promise<Patient> {
    const response = await apiClient.put<ApiResponse<{ patient: Patient }>>(`/patients/${id}`, patientData);
    return response.data.patient;
  }

  // Delete patient (soft delete)
  async deletePatient(id: string): Promise<Patient> {
    const response = await apiClient.delete<ApiResponse<{ patient: Patient }>>(`/patients/${id}`);
    return response.data.patient;
  }

  // Get patient's appointments
  async getPatientAppointments(id: string) {
    const response = await apiClient.get<ApiResponse<{ appointments: any[] }>>(`/patients/${id}/appointments`);
    return response.data.appointments;
  }

  // Add medical history entry
  async addMedicalHistory(id: string, historyData: { condition: string; diagnosedDate: string; notes: string }) {
    const response = await apiClient.post<ApiResponse<{ patient: Patient }>>(`/patients/${id}/medical-history`, historyData);
    return response.data.patient;
  }

  // Get patients statistics
  async getPatientStats() {
    const response = await apiClient.get<ApiResponse<any>>('/patients/stats/overview');
    return response.data;
  }
}

// Create singleton instance
const patientService = new PatientService();

export default patientService;
