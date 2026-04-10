import useSWR from "swr";
import { useRouter } from "next/router";
import { Table, Pagination } from "react-bootstrap";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function Books(){

  const router = useRouter();

  const [page,setPage] = useState(1);

  let queryString = {...router.query};

  let parts = [];

  Object.entries(queryString).forEach(([k,v])=>{
    parts.push(`${k}:${v}`);
  });

  if(parts.length>0){
    queryString = parts.join(" AND ");
  }

  const {data,error} = useSWR(
    `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10`
  );

  if(!data) return null;

  const goPrev = ()=> page>1 && setPage(page-1);
  const goNext = ()=> setPage(page+1);

  return(
    <>
      <PageHeader text="Search Results" subtext={queryString}/>

      <Table hover bordered>

        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>

        <tbody>

        {data.docs.map((book,i)=>(
          <tr key={i} onClick={()=>router.push(book.key)}>
            <td>{book.title}</td>
            <td>{book.first_publish_year || "N/A"}</td>
          </tr>
        ))}

        </tbody>

      </Table>

      <Pagination className="justify-content-center">

        <Pagination.Prev onClick={goPrev}/>
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={goNext}/>

      </Pagination>

    </>
  );
}