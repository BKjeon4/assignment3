import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  }

  if (!book) return null;

  return (
    <Container>

      <Row>

        <Col lg={4}>

          <img
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            onError={(e) => {
              e.target.src = "https://placehold.co/400x600?text=No+Cover";
            }}
          />

        </Col>

        <Col lg={8}>

          <h3>{book.title}</h3>

          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {book.subject_people && (
            <>
              <h5>Characters</h5>
              <p>{book.subject_people.join(", ")}</p>
            </>
          )}

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              <p>{book.subject_places.join(", ")}</p>
            </>
          )}

          {book.links && (
            <>
              <h5>More Information</h5>
              {book.links.map((l, i) => (
                <div key={i}>
                  <a href={l.url} target="_blank">{l.title}</a>
                </div>
              ))}
            </>
          )}

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          )}

        </Col>

      </Row>

    </Container>
  );
}