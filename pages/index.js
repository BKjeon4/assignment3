/********************************************************************************* * WEB422 – Assignment 3
* * I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html * * Name: Byungwook Jeon Student ID: 011654159 Date: 2026-04-10
*
* Vercel App (Deployed) Link: * ********************************************************************************/

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home(){

const router = useRouter();

const {register,handleSubmit,formState:{errors}} = useForm();

function submit(data){

const cleaned = Object.fromEntries(
Object.entries(data).filter(([k,v])=>v!=="")
);

router.push({
pathname:"/books",
query:cleaned
});

}

return(
<Container>
<PageHeader
text="Search for Books"
subtext="Browse the extensive collection of books available on openlibrary.org."
/>

<Form onSubmit={handleSubmit(submit)}>

<Form.Group className="mb-3">
<Form.Label>Author</Form.Label>
<Form.Control
{...register("author",{required:true})}
className={errors.author?"is-invalid":""}
/>
{errors.author && <div className="text-danger">Author is required</div>}
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Title</Form.Label>
<Form.Control {...register("title")} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Subject</Form.Label>
<Form.Control {...register("subject")} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Language</Form.Label>
<Form.Control {...register("language")} />
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>First Publish Year</Form.Label>
<Form.Control {...register("first_publish_year")} />
</Form.Group>

<Button type="submit">Search</Button>

</Form>
</Container>
)
}