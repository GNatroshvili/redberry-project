import "@fontsource/firago";
import "@fontsource/firago/400.css";
import "@fontsource/firago/400-italic.css";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import ResponseButton from "./components/Buttons/ResponseButton/Button";
import Category from "./components/Details/Category/Category";
import PrimaryButton from "./components/Buttons/PrimaryButton/PrimaryButton";
import Condition from "./components/Condition/Condition";
import EmployeeName from "./components/EmployeeName/EmployeeName";
import AddEmployeeButton from "./components/Buttons/AddEmployeeButton/AddEmployeeButton";
import Difficulty from "./components/Details/Category/Difficulty/Difficulty";

export default function Home() {
  return (
    <>
      <Header />
      <ResponseButton title={"უპასუხე"} />
      <Category title={"დიზაინი"} color={"orange"} />
      <PrimaryButton title={"Button"} />
      <Condition title={"დასაწყები"} color={"blue"} />
      <EmployeeName name={"სატოში ნაკამოტო"} />
      <AddEmployeeButton title={"დაამატე თანამშრომელი"} />
      <Difficulty size="big" color="red" text="მაღალი" />
      <Difficulty size="big" color="green" text="დაბალი" />
      <Difficulty size="small" color="orange" text="საშუალო" />
    </>
  );
}
