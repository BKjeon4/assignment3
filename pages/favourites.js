import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites(){

const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
if (!favouritesList) return null; 

  if(favourites.length === 0){

    return(
      <PageHeader text="Nothing Here" subtext="Add a favourite book"/>
    );

  }

  return(
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books"/>

      <Row className="gy-4">

        {favourites.map(id=>(
          <Col lg={3} md={6} key={id}>
            <BookCard workId={id}/>
          </Col>
        ))}

      </Row>
    </>
  );
}