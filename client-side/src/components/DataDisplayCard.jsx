import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { BsMusicNoteList } from "react-icons/bs";
import { FaFastForward } from "react-icons/fa";
import { Tabs, Tab } from "@nextui-org/tabs";
import VideoCard from "./VideoCard";

function DataDisplayCard({ data, setData }) {
  console.log(data);
  const CardTitle = [
    {
      title: "Playlist Duration",
      icon: <BsMusicNoteList />,
      hour: data?.hours,
      minutes: data?.minutes,
      seconds: data?.seconds,
    },
    {
      title: "Average Duration",
      icon: <BsMusicNoteList />,
      hour: data?.avgHour,
      minutes: data?.avgMin,
      seconds: data?.avgSec,
    },

    {
      title: "At 1.25X speed",
      icon: <FaFastForward />,
      hour: data?.speed_1x25x?.hours,
      minutes: data?.speed_1x25x?.minutes,
      seconds: data?.speed_1x25x?.seconds,
    },
    {
      title: "At 1.5X speed",
      icon: <FaFastForward />,
      hour: data?.speed_1x5x?.hours,
      minutes: data?.speed_1x5x?.minutes,
      seconds: data?.speed_1x5x?.seconds,
    },
    {
      title: "At 1.75X speed",
      icon: <FaFastForward />,
      hour: data?.speed_1x75x?.hours,
      minutes: data?.speed_1x75x?.minutes,
      seconds: data?.speed_1x75x?.seconds,
    },
    {
      title: "At 2X speed",
      icon: <FaFastForward />,
      hour: data?.speed_2x?.hours,
      minutes: data?.speed_2x?.minutes,
      seconds: data?.speed_2x?.seconds,
    },
  ];

  return (
    <Card className="w-full md:w-4/5 mx-auto">
      <CardHeader className="flex flex-col md:flex-row gap-3 justify-center">
        <div className="flex flex-col text-center md:text-left">
          <p className="text-2xl">Playlist Title: {data?.title}</p>
          <p className="text-xl">Total Videos: {data?.numberOfVideos}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
          {CardTitle.map((titleItem, index) => (
            <Card
              key={index}
              className="shadow-md cursor-pointer shadow-purple-400 scale-100 hover:scale-105 transition-all"
            >
              <CardHeader className="flex gap-3 justify-center">
                <div className="flex flex-col text-center">
                  <p className="flex gap-4 items-center justify-center">
                    {titleItem.icon}
                    {titleItem.title}
                  </p>
                  <p>
                    {titleItem.hour !== 0 && titleItem.hour ? `${titleItem.hour} Hours, ` : ""}
                    {titleItem.minutes !== 0 && titleItem.minutes ? `${titleItem.minutes} Minutes, ` : ""}
                    {titleItem.seconds !== 0 && titleItem.seconds ? `${titleItem.seconds} Seconds` : ""}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="w-full mt-4">
          <Tabs aria-label="Options">
            <Tab key="Latest" title="Latest">
              <VideoCard title={"Latest"} data={data} />
            </Tab>
            <Tab key="Oldest" title="Oldest">
              <VideoCard title={"Oldest"} data={data} />
            </Tab>
            <Tab key="Views" title="Views">
              <VideoCard title={"Views"} data={data} />
            </Tab>
            <Tab key="Likes" title="Likes">
              <VideoCard title={"Likes"} data={data} />
            </Tab>
            <Tab key="Shortest" title="Shortest">
              <VideoCard title={"Shortest"} data={data} />
            </Tab>
            <Tab key="Longest" title="Longest">
              <VideoCard title={"Longest"} data={data} />
            </Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}

export default DataDisplayCard;
