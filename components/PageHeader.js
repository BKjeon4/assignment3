import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {

  return (
    <Card className="bg-light mb-4">
      <Card.Body className="text-center">

        <h1 className="text-primary">{text}</h1>

        {subtext && (
          <div style={{ fontSize: "1rem", color: "#333" }}>
            {subtext}
          </div>
        )}

      </Card.Body>
    </Card>
  );

}