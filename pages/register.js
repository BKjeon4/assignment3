import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";
import PageHeader from "@/components/PageHeader";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();
  if (!user.trim() || !password.trim() || !password2.trim()) {
    setWarning("Please fill user and password.");
    return;
  }
  try {
    await registerUser(user, password, password2);
    router.push("/login");
  } catch (err) {
    setWarning(err.message);
  }
}
  return (
    <Container>
      <PageHeader text="Register" subtext="Register for an account:" />
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
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}