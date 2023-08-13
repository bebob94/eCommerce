import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { USER_BY_USERNAME, userByUsername } from "../../Redux/ActionType/User";

interface FormData {
  file: File | null;
}

const UploadUserProfileImage = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<FormData>({ file: null });
  const user = useSelector((state: RootState) => state?.User.user);
  const User = useSelector((state: RootState) => state?.user.user);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({ file: event.target.files[0] });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file as Blob);
    try {
      const response = await fetch(
        "http://localhost:8080/User/uploadimage/" + user.id,
        {
          method: "PUT",
          body: formDataToSend,
          headers: {
            Authorization: "Bearer " + User.accessToken,
          },
        }
      );
      if (response.ok) {
        (async () => {
          let data = await userByUsername(User.username, User.accessToken);
          dispatch({
            type: USER_BY_USERNAME,
            payload: data,
          });
        })();
        setShow(false);
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      <button
        data-modal-target="ChangeName-modal"
        data-modal-toggle="ChangeName-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleShow}
      >
        Modifica
      </button>
      <div
        style={{ display: show ? "block" : "none" }}
        id="ChangeName-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="ChangeName-modal"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Modifica immagine
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit} action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    immagine
                  </label>
                  <input type="file" onChange={handleChange} />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Salva Modifiche
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
export default UploadUserProfileImage;
