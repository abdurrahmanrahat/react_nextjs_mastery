// "use client";

import Image from "next/image";
import Link from "next/link";

const PhotoCard = ({ photo }) => {
  //   const router = useRouter();

  //   const handlePhotoCardClick = () => {
  //     router.push(`photos/${photo.id}`);
  //   };
  return (
    <Link href={`photos/${photo.id}`} className="group">
      <Image src={photo.url} alt={photo.title} width={700} height={700} />

      <div className="title-container">
        <h4 className="title">{photo.title}</h4>
      </div>
    </Link>
  );
};

export default PhotoCard;
