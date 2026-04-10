import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import PageHeader from "@/components/PageHeader";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

async function handleSubmit(e) {
  e.preventDefault();
  if (!user.trim() || !password.trim()) {
    setWarning("Please fill user and password.");
    return;
  }
  try {
    await authenticateUser(user, password);
    await updateAtom();
    router.push("/");
  } catch (err) {
    setWarning(err.message);
  }
}

  return (
    <Container>
      <PageHeader text="Login" subtext="Enter your login information below:" />
      <Row className="justify-content-md-center">
        <Col md={6}>
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User:</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}