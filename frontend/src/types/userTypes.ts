export type Role = 'Student' | 'Professional' | 'Freelancer' | 'Competitive Exam Aspirant' | 'Other';

export type userUpdateObj = {
  name: string
  role?: Role
  avatarUrl?: string
  theme: string
}

export type userDataObj = {
  id: string
  name: string
  email: string
  role?: Role
  avatarUrl?: string
  theme: "dark" | "light",
  createdAt: string
}

export type userStoredObj = {
    id?: string
    name?: string,
    email?: string
    theme?: string
}