import { Link } from "react-router-dom";
import image from "assets/images/404.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__image">
        <img src={image} alt="not found image" />
      </div>
      <h1 className="not-found__heading">Uh-Oh...</h1>
      <p className="not-found__text">
        The page your are looking for may have been moved, deleted or possibly
        never existed
      </p>
      <Link className="not-found__link" to="..">
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
