import { useRouter } from 'next/router';
import useSWR from 'swr';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';
import Error from 'next/error';


export default function WorkDetails() {
const router = useRouter();
const { workId } = router.query;


const { data, error } = useSWR(
workId ? `https://openlibrary.org/works/${workId}.json` : null
);


if (!data && !error) return null;
if (error || !data) return <Error statusCode={404} />;


return (
<>
<PageHeader heading={data.title} />
<BookDetails book={data} workId={workId} />
</>
);
}