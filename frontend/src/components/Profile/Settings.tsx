import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ChangeNameModal from "../Modals/ChangeNameModal";
import { USER_BY_USERNAME, userByUsername } from "../../Redux/ActionType/User";
import { useEffect } from "react";
import ChangeAddressModal from "../Modals/ChangeAddressModal";
import UploadUserProfileImage from "../Modals/ChangeImageModal";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user.user);
  const User = useSelector((state: RootState) => state?.User.user);
  const myAddress = useSelector((state: RootState) => state?.address?.address);

  useEffect(() => {
    (async () => {
      let data = await userByUsername(user.username, user.accessToken);
      dispatch({
        type: USER_BY_USERNAME,
        payload: data,
      });
    })();
  }, []);
  return (
    <div className="m-10  h-full ">
      <p className="text-4xl text-center font-medium  ">Utente</p>
      <div className="w-1/2 bg-white rounded-md my-5 mx-auto shadow-md p-3">
        <div className="my-6 flex justify-between items-center">
          <div>
            <p>Nome:</p>
            <p>{User?.name}</p>
          </div>
          <div>
            <ChangeNameModal />
          </div>
        </div>{" "}
        <hr />
        <div className="my-6 flex justify-between">
          <div>
            <p>Indirizzo:</p>
            <p>
              {myAddress?.street +
                " " +
                myAddress?.houseNumber +
                " " +
                myAddress?.city?.toUpperCase()}
            </p>
          </div>
          <div>
            <ChangeAddressModal addressId={myAddress.id} />
          </div>
        </div>{" "}
        <hr />
        <div className="my-6 flex justify-between">
          <div>
            <p>Immagine:</p>
            <img
              className="w-10 h-10 ml-5 mt-2 rounded-full"
              src={User?.image}
              alt="user photo"
            />
          </div>
          <div>
            <UploadUserProfileImage />
          </div>
        </div>{" "}
        <hr />
      </div>
    </div>
  );
};

export default Settings;
