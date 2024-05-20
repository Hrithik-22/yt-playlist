import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import axios_helper from "../api/axios_helper";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LinkCard({ data, setData }) {
  const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(null);
  // Function to extract playlistId from the input URL
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
        setError("Please provide a valid YouTube playlist URL"); // Set the error state if the URL is invalid
        return;
      }
  
      setError(null); // Reset the error state
  
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
    <Card className="w-4/5">
      <CardHeader className="flex gap-3 justify-center">
        <div className="flex flex-col">
          <p className="text-2xl">Youtube Playlist Length Calculator</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 flex-wrap md:flex-row md:items-center">
        <div className="flex flex-row items-center w-full">
          <Input
            type="text"
            variant="underlined"
            placeholder="Enter a youtube playlist url"
            className="mr-8 flex-grow"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button radius="none" onClick={handleSubmit}>
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
