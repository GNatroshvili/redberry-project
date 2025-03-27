'use client'
 import CustomDropdown from '../components/CustomDropdown/CustomDropdown'
 import { DepartmentType, EmployeeType, PriorityType } from '../types'
 
 type Props = {
   departments: DepartmentType[]
   priorities: PriorityType[]
   employees: EmployeeType[]
 }
 
 function HomePage({ departments, priorities, employees }: Props) {
   console.log(departments, priorities, employees)
   return (
     <div>
       <div
         style={{
           display: 'flex',
           gap: '1rem',
           flexDirection: 'column',
           padding: '1rem',
         }}
       >
         <div style={{ display: 'flex', gap: '1rem' }}>
           <CustomDropdown
             departments={departments}
             priorities={priorities}
             employees={employees}
           />
         </div>
       </div>
     </div>
   )
 }
 
 export default HomePage