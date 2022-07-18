import { Link } from "react-router-dom";
import { signOutUser } from "../services/auth";

const Header = ({ isAdmin }) => {
  return (
    <nav
      id="header"
      className="w-full  py-1 bg-gradient-to-r from-green-500 to-green-300  text-white"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-8 py-3">
        <div
          className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-white-700 pt-4 md:pt-0">
              <Link
                className="inline-block no-underline text-white hover:text-white hover:underline py-2 px-4"
                to="/card"
              >
                Card
              </Link>
              <Link
                className="inline-block no-underline text-white hover:text-white hover:underline py-2 px-4"
                to="/"
              >
                Home
              </Link>
              {isAdmin &&
                <Link
                  className="inline-block no-underline text-white hover:text-white hover:underline py-2 px-4"
                  to="/add-product"
                >
                  Add product
                </Link>}
              {isAdmin &&
                <Link
                  className="inline-block no-underline text-white hover:text-white hover:underline py-2 px-4"
                  to="/add-shop"
                >
                  Add shop
                </Link>}
              <Link
                className="inline-block no-underline text-white hover:text-white hover:underline py-2 px-4"
                to="/orders"
              >
                Orders
              </Link>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-2">
          <Link
            className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-white-800 text-xl "
            to="/"
          >
            Shop
          </Link>
        </div>

        <div className="order-2 md:order-3 flex items-center" id="nav-content">
          {!isAdmin &&
            <Link
              className="inline-block no-underline text-green-50 hover:text-white hover:underline py-2 px-4"
              to="/sign"
            >
              Sign in
            </Link>}
          {isAdmin &&
            <button
              onClick={signOutUser}
              className="inline-block no-underline text-green-100 hover:text-white hover:underline py-2 px-4"
            >
              Logout
            </button>}
        </div>
      </div>
    </nav>
  );
};

export default Header;
