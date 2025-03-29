'use client'
import CustomDropdown from '../components/CustomDropdown/CustomDropdown'
import { DepartmentType, EmployeeType, PriorityType } from '../types'
import Condition from "../components/Condition/Condition"
import styles from "./HomePage.module.css"

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
          flexDirection: 'column',
          margin: "auto",
          maxWidth: "1680px",
        }}
      >
        <div style={{ display: 'flex', gap: '1rem' }}>
          <CustomDropdown
            departments={departments}
            priorities={priorities}
            employees={employees}
          />
        </div>
        <div className={styles.conditionWrapper}>
          <Condition title={"დასაწყები"} color={"yellow"} />
          <Condition title={"პროგრესში"} color={"orange"} />
          <Condition title={"მზად ტესტირებისთვის"} color={"pink"} />
          <Condition title={"დასრულებული"} color={"blue"} />
        </div>
      </div>
    </div>
  )
}

export default HomePage