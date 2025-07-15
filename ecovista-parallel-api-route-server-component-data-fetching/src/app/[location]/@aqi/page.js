import AQIComponent from "@/components/AQIComponent"
import NoLocationInfo from "@/components/NoLocationInfo"
import { getResolvedLatLong } from "@/lib/location-info"

// params come from /[] routes and searchParams come from query params ?lat=32.34
const AQIPage = async ({ params: { location }, searchParams: { latitude, longitude } }) => {
    const resolved = await getResolvedLatLong(location, latitude, longitude)

    if (resolved?.lat && resolved?.lon) {
        return <AQIComponent lat={resolved.lat} lon={resolved.lon} />
    } else {
        return <NoLocationInfo location={location} />
    }

}

export default AQIPage