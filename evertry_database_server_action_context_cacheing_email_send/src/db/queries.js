import { EventModel } from "@/models/event-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";

async function getAllEVents() {
    const allEvents = await EventModel.find().lean()
    return replaceMongoIdInArray(allEvents)
}

async function getEVentById(eventId) {
    const allEvents = await EventModel.findById(eventId).lean()
    return replaceMongoIdInObject(allEvents)
}

export {
    getAllEVents,
    getEVentById
};

