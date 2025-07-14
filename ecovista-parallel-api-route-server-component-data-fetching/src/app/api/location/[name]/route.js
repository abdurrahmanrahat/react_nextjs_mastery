import { getLocationByName } from "../location.utils"

export async function  GET(request, {params}) {
    const locationData = getLocationByName(params?.name)

    return Response.json(locationData)
}