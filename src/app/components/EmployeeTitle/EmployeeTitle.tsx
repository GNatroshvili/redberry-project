import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import styles from "./EmployeeTitle.module.css"

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
      <img className={styles.img} src={avatar} alt={`${name} ${surname}`} width={28} height={28} />
      <span className={styles.name}>
        {name} {surname}
      </span>
    </div>
  );
};

export default EmployeeTitle;
