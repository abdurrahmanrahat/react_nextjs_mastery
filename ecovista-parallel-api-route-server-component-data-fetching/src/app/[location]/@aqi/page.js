import AQIComponent from "@/components/AQIComponent"

// params come from /[] routes and searchParams come from query params ?lat=32.34
const AQIPage = ({ params: { location }, searchParams: { latitude, longitude } }) => {
    return (
        <AQIComponent lat={latitude} lon={longitude} />
    )
}

export default AQIPage