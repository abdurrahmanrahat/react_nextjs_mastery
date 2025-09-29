import { getCourseDetails, getCourseDetailsByInstructor } from "@/services/queries/courses";
import { getAReport } from "@/services/queries/reports";
import { getUserByEmail, getUserDetails } from "@/services/queries/users";
import { auth } from "../../auth";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateReviewsData = async (reviews) => {
    const populatedReviews = await Promise.all(
        reviews.map(async (review) => {
            const student = await getUserDetails(review?.user?._id);

            review["studentName"] = `${student?.firstName} ${student?.lastName}`;

            return review;
        })
    )

    return populatedReviews;
}

const populateEnrollmentsData = async (enrollments) => {
    const populatedEnrollments = await Promise.all(
        enrollments.map(async (enrollment) => {
            const student = await getUserDetails(enrollment?.student?._id);

            enrollment["studentName"] = `${student?.firstName} ${student?.lastName}`;
            enrollment["studentEmail"] = student?.email;

            const filter = {
                course: enrollment?.course?._id,
                student: enrollment?.student?._id,
            }
            const report = await getAReport(filter);

            enrollment["progress"] = 0;
            enrollment["quizMark"] = 0;

            if (report) {
                // progress
                const course = await getCourseDetails(enrollment?.course?._id);

                const totalModules = course?.modules?.length;
                const totalCompletedModules = report?.totalCompletedModeules.length;
                const progress = (totalCompletedModules / totalModules) * 100;

                enrollment["progress"] = progress.toFixed(0);

                // quiz mark
                const quizzes = report?.quizAssessment?.assessments;
                const quizzesTaken = quizzes.filter((q) => q.attempted);

                const totalCorrect = quizzesTaken
                    .map((quiz) => {
                        const item = quiz.options;
                        return item.filter((o) => {
                            return o.isCorrect === true && o.isSelected === true;
                        });
                    })
                    .filter((elem) => elem.length > 0)
                    .flat();

                const marksFromQuizzes = totalCorrect?.length * 5;

                enrollment["quizMark"] = marksFromQuizzes;
            }

            return enrollment;
        })
    )

    return populatedEnrollments;
}

export async function getInstructorDashboardData(dataType) {
    try {
        const session = await auth();
        const instructor = await getUserByEmail(session?.user?.email);

        const data = await getCourseDetailsByInstructor(instructor?.id, true);

        switch (dataType) {
            case COURSE_DATA: return data?.courses;
            case REVIEW_DATA: return populateReviewsData(data?.reviews);
            case ENROLLMENT_DATA: return populateEnrollmentsData(data?.enrollments);

            default: return data;
        }
    } catch (error) {
        throw new Error(error)
    }
}