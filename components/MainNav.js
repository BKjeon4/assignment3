import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import Link from "next/link";

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Byungwook Jeon</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">

          <Nav className="me-auto">
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
          </Nav>

          {token && (
            <Nav>
              <NavDropdown title={token.userName} id="user-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item as="a">Favourites</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!token && (
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link>Register</Nav.Link>
              </Link>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}