import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser, FaSearch } from "react-icons/fa";
import { FaUserCircle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

// Define the SearchBox component
function SearchBox() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        placeholder="Search..."
      />
    </div>
  );
}

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  // Toggle search box visibility
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={120} h={50} />
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleSearch} // Toggle search box visibility when clicked
            className="text-2xl relative flex items-center justify-center"
          >
            <FaSearch />
          </button>
        </div>

        {/* Render the SearchBox component based on the state */}
        {isSearchOpen && <SearchBox />}

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div className="text-3xl cursor-pointer relative flex justify-center">
                <Link to="/admin-panel/all-products">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </Link>
              </div>
            )}
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-fuchsia-600 hover:bg-amber-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-fuchsia-600 hover:bg-amber-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
