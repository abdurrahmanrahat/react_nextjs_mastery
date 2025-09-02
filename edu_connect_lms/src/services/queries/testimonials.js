import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/models/testimonial-model";

export async function getTestimonialsForCourse(courseId) {
    const testimonials = await Testimonial.find({ courseId: courseId }).lean();

    console.log("get testimonials =>", testimonials)
    return replaceMongoIdInArray(testimonials);
}