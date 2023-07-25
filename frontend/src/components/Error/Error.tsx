import { Link } from "react-router-dom";
import img from "../../icons8-info-64.png";
const Error = () => {
  return (
    <div className="mt-5 mx-4 flex font-sans font-bold ">
      <img src={img} alt="information icon" className="h-6 mr-4" />
      Please{" "}
      <Link to={"/Login"} className="text-sky-700 ml-2">
        {" "}
        Log in.
      </Link>
    </div>
  );
};

export default Error;
