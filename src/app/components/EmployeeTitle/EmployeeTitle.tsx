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
      <CustomCheckbox isChecked={isChecked} handleChange={onChange} />
      <img src={avatar} alt={`${name} ${surname}`} width={28} height={28} />
      <span>
        {name} {surname}
      </span>
    </div>
  );
};

export default EmployeeTitle;
