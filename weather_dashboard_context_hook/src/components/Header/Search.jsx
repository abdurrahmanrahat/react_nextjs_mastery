import { useContext } from "react";
// import SearchIcon from "../../assets/search.svg";
import { LocationContext } from "../../context";
import { getLocationByName } from "../../data/locaton.data";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const { setSelectedLocation } = useContext(LocationContext);
  // const [searchTerm, setSearchTerm] = useState("");

  const doSearch = useDebounce((searchTerm) => {
    const fetchedLocation = getLocationByName(searchTerm);

    setSelectedLocation({ ...fetchedLocation });
  }, 600);

  const handleChange = (e) => {
    const value = e.target.value;

    doSearch(value);
  };

  return (
    <form action="#">
      <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
        <input
          className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
          type="search"
          placeholder="Search Location"
          onChange={handleChange}
          required
        />
        {/* <button type="submit" className="cursor-pointer">
          <img src={SearchIcon} />
        </button> */}
      </div>
    </form>
  );
};

export default Search;
