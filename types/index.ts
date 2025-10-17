export type ApplicationStatus = 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED'

export interface Application {
  id: string
  userId: string
  company: string
  position: string
  url?: string | null
  status: ApplicationStatus
  location?: string | null
  salary?: string | null
  appliedOn: Date
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string | null
  createdAt: Date
  updatedAt: Date
}
