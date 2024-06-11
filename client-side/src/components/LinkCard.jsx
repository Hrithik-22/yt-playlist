import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import axios_helper from "../api/axios_helper";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosClose } from "react-icons/io";

function LinkCard({ data, setData }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const extractPlaylistId = (url) => {
    const playlistIdMatch = url.match(/[?&]list=([^&]+)/);
    if (playlistIdMatch && playlistIdMatch[1]) {
      return playlistIdMatch[1];
    }
    return null;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    const playlistId = extractPlaylistId(inputValue);

    if (!playlistId) {
      setError("Please provide a valid YouTube playlist URL");
      return;
    }

    setError(null);

    try {
      const response = await axios_helper.post("/link", { id: playlistId });
      console.log(response.data.data);
      setData(response.data.data);
      toast.success(' Playlist data fetched successfully!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Provide a proper playlist link!!!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Card className="w-full md:w-4/5 mx-auto p-4">
        <CardHeader className="flex gap-3 justify-center">
          <div className="flex flex-col">
            <p className="text-2xl">Youtube Playlist Length Calculator</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center w-full">
            <Input
              type="text"
              variant="underlined"
              placeholder="Enter a youtube playlist url"
              className="mb-4 md:mb-0 md:mr-8 flex-grow"
              value={inputValue}
              onChange={handleInputChange}
              endContent={
                <button className="focus:outline-none " type="button" onClick={() => setInputValue("")} >
                  <IoIosClose className="size-10 text-white" />
                </button>
              }
            />
            <Button radius="none" onClick={handleSubmit} className="w-full md:w-auto">
              Submit
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </CardBody>
      </Card>
    </>
  );
}

export default LinkCard;
