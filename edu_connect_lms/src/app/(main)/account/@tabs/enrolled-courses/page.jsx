// import { CourseProgress } from "@/components/course-progress";
import { auth } from "@/../auth";
import { getEnrollmentsForUser } from "@/services/queries/enrollments";
import { getUserByEmail } from "@/services/queries/users";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/enrolled-coursecard";

async function EnrolledCourses() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const loggedInUser = await getUserByEmail(session?.user?.email);

  const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments?.length > 0 ? (
        <>
          {enrollments.map((enrollment) => (
            <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </>
      ) : (
        <p>No Enrollment Found</p>
      )}
    </div>
  );
}

export default EnrolledCourses;
