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

export type TaskType = {
    id: number;
    name: string;
    description: string;
    due_date: string | null;
    department_id: number;
    status_id: number;
    priority_id: number;
    employee_id: number;
    total_comments: number;
    department?: DepartmentType; 
    status?: StatusType; 
    priority?: PriorityType;
    employee?: EmployeeType; 
  };

