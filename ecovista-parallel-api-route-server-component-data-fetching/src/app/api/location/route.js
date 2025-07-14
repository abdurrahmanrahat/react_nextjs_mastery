import { getLocations } from "./location.utils";

export async function  GET() {
    const locationData = getLocations()

    return Response.json(locationData)
}