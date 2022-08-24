import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({
  value,
  color = "red",
  clickFunction,
  link,
}: {
  value: string;
  color?: string;
  clickFunction?: Function;
  link?: string;
}) =>
  link ? (
    <Link className="btn" style={{ backgroundColor: color }} to={link}>
      {value}
    </Link>
  ) : (
    <button
      className="btn"
      style={{ backgroundColor: color }}
      onClick={() => (clickFunction ? clickFunction() : null)}
    >
      {value}
    </button>
  );

export default Button;
