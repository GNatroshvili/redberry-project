import styles from "./page.module.css";
import Header from "./components/Header";
import ResponseButton from "./Buttons/ResponseButton/Button";

export default function Home() {
  return (
    <>
      <Header />
      <ResponseButton title={"უპასუხე"}/>
    </>
  );
}
