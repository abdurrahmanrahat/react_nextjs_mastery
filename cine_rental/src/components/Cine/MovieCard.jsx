import { useContext, useState } from "react";
import TagSvg from "../../assets/tag.svg";
import { MovieContext } from "../../contexts";
import { getImageURL } from "../../utils/cine-utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { state, dispatch } = useContext(MovieContext);

  const handleModalOpen = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const handleAddToCart = (e, movie) => {
    e.stopPropagation();

    const alreadyInCart = state.cartData.find((item) => item.id === movie.id);

    if (!alreadyInCart) {
      //   setCartData([...cartData, movie]);
      dispatch({
        type: "ADD_TO_CART",
        payload: movie,
      });
    } else {
      console.error(
        `The movie ${movie.title} has already been added in the cart!`
      );
    }
  };

  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleModalOpen(movie)}>
          <img
            className="w-full object-cover"
            src={getImageURL(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src={TagSvg} alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
};

export default MovieCard;
