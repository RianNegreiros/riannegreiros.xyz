import { ProjectsCard } from "../lib/interface";
import { client } from "../lib/sanity";
import ProjectCard from "../components/ProjectCard";

async function getData() {
  const query = `*[_type == 'project'] | order(_createdAt desc) {
        title,
          _id,
          link,
          description,
          tags,
          "imageUrl": image.asset->url
        
    }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 30 } });

  return data;
}

export default async function ProjectsPage() {
  const data: ProjectsCard[] = await getData();

  return (

    <ProjectCard data={data} />
  );
}