import Image from "next/image";

const StarRating = ({ rating }) => {
  const stars = new Array(rating).fill(0);
  return (
    <>
      {stars.map((_, index) => (
        <Image
          key={index}
          src={`/icons/star.svg`}
          width={20}
          height={20}
          alt="star"
        />
      ))}
    </>
  );
};

export default StarRating;
