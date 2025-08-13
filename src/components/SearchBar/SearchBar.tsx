import "../../styles/components-css/SearchBar.css";
import { IoSearch } from "react-icons/io5";

type searchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
const SearchBar: React.FC<searchProps> = ({ value, onChange }) => {
  return (
    <div className="app__searchBar">
      <input
        className="app__searchBar--input"
        type="text"
        placeholder="Search our products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <IoSearch fontSize={25} />
    </div>
  );
};

export default SearchBar;
