import Link from "next/link";
import Card from "./Card";

const NoLocationInfo = ({ location }) => {
  return (
    <Card>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h2 className="">No Location found in the location: {location}</h2>
        <Link href={`/`} className="px-3 py-2 bg-red-600 text-white rounded-md">
          Go Home
        </Link>
      </div>
    </Card>
  );
};

export default NoLocationInfo;
