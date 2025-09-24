import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { Course } from "@/models/course-model";
import { Module } from "@/models/module-model";
import { Testimonial } from "@/models/testimonial-model";
import { User } from "@/models/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
    const courses = await Course.find({}).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor"]).populate({
        path: "category", // the field name of which we want to refer with another collection
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean()

    return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
    const course = await Course.findById(id).populate({
        path: "category", // the field name of which we want to refer with another collection
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial,
        populate: {
            path: "user",
            model: User
        }
    }).populate({
        path: "modules",
        model: Module
    }).lean();

    return replaceMongoIdInObject(course)
}

export async function getCourseDetailsByInstructor(instructorId) {
    const courses = await Course.find({ instructor: instructorId }).lean()

    // get enrollments
    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course._id.toString());

            return enrollment
        })
    )

    const totalEnrollments = enrollments.reduce(function (acc, obj){
        return acc + obj.length;
    }, 0)

    // get testimonials
    const testimonials = await Promise.all(
        courses.map(async (course) => {
            const testimonial = await getTestimonialsForCourse(course._id.toString());
            return testimonial;
        })
    );

    console.log("testimonials", testimonials)

    const totalTestimonials = testimonials.flat()

    const avgRating = (totalTestimonials.reduce(function (acc, obj) {
        return acc + obj.rating;
    }, 0)) / totalTestimonials.length;



    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: avgRating.toPrecision(2)
    }
}