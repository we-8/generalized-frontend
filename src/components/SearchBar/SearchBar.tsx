import '../../styles/components-css/SearchBar.css';


type searchProps = {
  value:string;
  onChange : (value:string) => void;
};
const SearchBar:React.FC<searchProps> = ({value,onChange}) => {


  return (
    <div className='app__searchBar'>
      <input type='text' placeholder='Search our products...' value={value} onChange={(e) =>onChange(e.target.value)} />
    </div>
  )
}

export default SearchBar;