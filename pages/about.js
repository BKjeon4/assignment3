import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export async function getStaticProps(){

const res = await fetch(
"https://openlibrary.org/works/OL453657W.json"
);

const book = await res.json();

return{
props:{book}
};

}

export default function About({book}){

return(

<>

<PageHeader
text="About the Developer"
subtext="Byungwook Jeon"
/>

<p>
I am a Computer Programming student who enjoys learning by building simple and clear applications.
</p>

<p>
This page shows one of my favorite books using the Open Library API.
</p>

<BookDetails
book={book}
workId="OL453657W"
showFavouriteBtn={false}
/>

</>

);

}