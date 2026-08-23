import { Clapperboard, Heart,  } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface IHeader {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  search:string
  setSearch: Dispatch<SetStateAction<string>>;
}
function Header({setIsFormOpen,search,setSearch}:IHeader) {

const favoriteCount = useSelector((state:RootState)=> state.favorites.favorits.length)

  return (
    <header className="mb-6 flex flex-col  gap-3">
      <div className="flex items-center justify-between p-5 bg-slate-900 text-gray-200 ">
        <h1 className="text-lg font-bold flex justify-center items-center gap-2">
          {" "}
          <Clapperboard />
          Movie Manager
        </h1>
        <div className="flex gap-2  justify-center items-center text-base ">
        <Heart  className="text-red-500" size={16} fill="red" />Favorites
          <span >({favoriteCount})</span>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between  p-5">
        <div className="flex gap-4 items-center w-1/2">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search"  placeholder="Search"   value={search} onChange={(e) => setSearch(e.target.value)}/>
          </label>

          <select defaultValue="Pick a font" className="select select-ghost w-1/4">
            <option>All Genres</option>
            <option>Sci-Fi</option>
            <option>Drama</option>
            <option>Crime</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={()=> setIsFormOpen(true)}>+  Add Movie</button>
      </div>
    </header>
  );
}

export default Header;
