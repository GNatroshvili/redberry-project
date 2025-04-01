interface CheckboxIconProps {
    stroke: string
    checked?: boolean
  }
  
  const CheckboxIcon: React.FC<CheckboxIconProps> = ({ stroke, checked }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
      <rect
        width={20.5}
        height={20.5}
        x={0.75}
        y={0.75}
        stroke={stroke}
        strokeWidth={1.5}
        rx={5.25}
      />
      {checked && (
        <path
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16.333 7.333 9 14.667l-3.333-3.334"
        />
      )}
    </svg>
  )
  export default CheckboxIcon



