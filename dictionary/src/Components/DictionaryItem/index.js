import { Link } from "react-router-dom";
import "./index.css";

const DictionaryItem = (props) => {
  const { eachItem } = props;
  const { _id, title, description, lexicalCategory } = eachItem;

  return (
    <Link to={`/word-details/${_id}`} className="link-item">
      <h1 className="li-item-heading">{title}</h1>
      <p className="li-item-para">
        ({lexicalCategory}) {description}
      </p>
      <hr className="hr-class" />
    </Link>
  );
};

export default DictionaryItem;
