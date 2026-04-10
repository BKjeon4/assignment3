import useSWR from "swr";
import { useRouter } from "next/router";
import { Table, Pagination, Container } from "react-bootstrap";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  let queryString = { ...router.query };
  let parts = [];

  Object.entries(queryString).forEach(([k, v]) => {
    parts.push(`${k}:${v}`);
  });

  const finalQuery = parts.length > 0 ? parts.join(" AND ") : null;

  // useSWR change   
  const { data, error } = useSWR(
    finalQuery
      ? `https://openlibrary.org/search.json?q=${finalQuery}&page=${page}&limit=10`
      : null
  );

  // return home if no query
  if (!finalQuery) {
    router.push("/");
    return null;
  }

  if (!data) return null;

  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => setPage(page + 1);

  return (
    <Container>
      <PageHeader text="Search Results" subtext={finalQuery} />

      <Table hover bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.docs.map((book, i) => (
            <tr key={i} onClick={() => router.push(book.key)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={goPrev} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={goNext} />
      </Pagination>
    </Container>
  );
}