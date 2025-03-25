export type Priority = 'low' | 'medium' | 'high'
export type TagColor = 'pink' | 'blue' | 'orange' | 'yellow' | 'purple'

export type DepartmentType =  { 
    id: number; 
    name: string 
}

export type StatusType =  {
    id: number,
    name: string,
}

export type PriorityType = {
    id: number
    name: string
    icon: string
}

export type EmployeeType = {
    id: number
    name: string
    surname: string
    avatar: string
    department_id: number
}

