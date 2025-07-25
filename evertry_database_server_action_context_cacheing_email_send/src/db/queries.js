import { EventModel } from "@/models/event-models";
import { UserModel } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";
import mongoose from "mongoose";

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

async function findUserByCredentials(credentials) {
    const user = await UserModel.findOne(credentials).lean();

    if(user){
        return replaceMongoIdInObject(user)
    }
    return null
}

async function updateInterest(eventId, authId) {
    const event = await EventModel.findById(eventId)

    if(event){
        const foundEventUser = event.interested_ids.find(id => id.toString() === authId)

        if(foundEventUser){
            event.interested_ids.pull(new mongoose.Types.ObjectId(authId))
        } else{
            event.interested_ids.push(new mongoose.Types.ObjectId(authId))
        }

        event.save()
    }
}

async function updateGoing(eventId, authId) {
    const event = await EventModel.findById(eventId)

    event.going_ids.push(new mongoose.Types.ObjectId(authId))

    event.save()
}


export {
    createUser, findUserByCredentials, getAllEVents,
    getEVentById, updateGoing, updateInterest
};

