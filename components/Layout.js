import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout({ children }) {

  return (
    <>
      <MainNav />

      <Container style={{ marginTop: "80px" }}>
        {children}
      </Container>
    </>
  );

}