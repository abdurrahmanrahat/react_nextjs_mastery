import { EventModel } from "@/models/event-models";
import { UserModel } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";

async function getAllEVents() {
    const allEvents = await EventModel.find().lean()
    return replaceMongoIdInArray(allEvents)
}

async function getEVentById(eventId) {
    const allEvents = await EventModel.findById(eventId).lean()
    return replaceMongoIdInObject(allEvents)
}

async function createUser(user) {
    return await UserModel.create(user)
}

export {
    createUser, getAllEVents,
    getEVentById
};

