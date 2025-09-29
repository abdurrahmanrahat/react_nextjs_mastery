import {
  getInstructorDashboardData,
  REVIEW_DATA,
} from "@/lib/dashboard-helper";
import { getCourseDetails } from "@/services/queries/courses";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const ReviewsPage = async ({ params: { courseId } }) => {
  const course = await getCourseDetails(courseId);

  const reviews = await getInstructorDashboardData(REVIEW_DATA);

  const reviewsForCourse = reviews.filter((review) => {
    return review?.courseId.toString() === courseId;
  });

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={reviewsForCourse} />
    </div>
  );
};

export default ReviewsPage;
