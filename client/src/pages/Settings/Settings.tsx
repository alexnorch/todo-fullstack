import { Link } from "react-router-dom";

// Icons
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { BsPalette, BsChevronRight } from "react-icons/bs";

export default function Settings() {
  return (
    <>
      <section className="settings__section">
        <h3 className="settings__section__heading">
          <CgProfile />
          <span>Profile</span>
        </h3>
        <ul className="settings__section__list">
          <li>
            <Link to="profile">
              <span>Edit profile</span>
              <BsChevronRight />
            </Link>
          </li>
          <li>
            <Link to="password">
              <span>Change password</span>
              <BsChevronRight />
            </Link>
          </li>
        </ul>
      </section>
      <section className="settings__section">
        <h3 className="settings__section__heading">
          <BiCategory />
          <span>Categories</span>
        </h3>
        <ul className="settings__section__list">
          <li>
            <Link to="new-category">
              <span>Create new category</span>
              <BsChevronRight />
            </Link>
          </li>
        </ul>
      </section>
      <section className="settings__section">
        <h3 className="settings__section__heading">
          <BsPalette />
          <span>Theme</span>
        </h3>
        <ul className="settings__section__list">
          <li>
            <Link to="theme">
              <span>Manage my theme</span>
              <BsChevronRight />
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
