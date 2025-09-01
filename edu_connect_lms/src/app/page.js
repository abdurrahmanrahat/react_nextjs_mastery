import { getCourses } from "@/services/queries/courses";


export default async function Home() {
  const courses = await getCourses()
  console.log("c", courses)
  return (
    <div>
      page
    </div>
  );
}
