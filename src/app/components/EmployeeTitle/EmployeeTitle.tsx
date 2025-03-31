import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

type Props = {
  name: string;
  surname: string;
  avatar: string;
  isChecked: boolean;
  onChange: () => void;
};

const EmployeeTitle = ({
  name,
  surname,
  avatar,
  isChecked,
  onChange,
}: Props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Checkbox for selecting employee */}
      <CustomCheckbox isChecked={isChecked} handleChange={onChange} />

      {/* Employee's avatar */}
      <img src={avatar} alt={`${name} ${surname}`} width={28} height={28} />

      {/* Employee's name */}
      <span>
        {name} {surname}
      </span>
    </div>
  );
};

export default EmployeeTitle;
