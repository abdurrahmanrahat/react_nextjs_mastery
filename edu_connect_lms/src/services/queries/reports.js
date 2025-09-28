import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/models/assessment-model";
import { Report } from "@/models/report-model";


export async function getAReport(filter) {
    try {
        const report = await Report.findOne(filter)
            .populate({
                path: "quizAssessment",
                model: Assessment,
            }).lean();
            
        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error(error)
    }
}