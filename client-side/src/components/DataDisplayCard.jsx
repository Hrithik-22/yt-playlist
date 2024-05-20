
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import { BsMusicNoteList } from "react-icons/bs";
import { FaFastForward } from "react-icons/fa";
import {Tabs, Tab} from "@nextui-org/tabs";
import VideoCard from "./VideoCard";
function DataDisplayCard({ data, setData }) {
  const CardTitle = [
    { 
      title: "Playlist Duration", 
      icon: <BsMusicNoteList />,
      hour:data?.hours ,
      minutes:data?.minutes,
      seconds:data?.seconds,
    },
    { title: "Average Duration", icon: <BsMusicNoteList />,
    hour:data?.avgHour ,
    minutes:data?.avgMin,
    seconds:data?.avgSec,
   }, 
    { title: "At 1.25X speed", icon: <FaFastForward />,
    hour:data?.hour_1_25x ,
    minutes:data?.min_1_25x,
    seconds:data?.seconds_1_25x,
   },
    { title: "At 1.5X speed", icon: <FaFastForward />,
    hour:data?.hour_1_5x ,
    minutes:data?.min_1_5x,
    seconds:data?.seconds_1_5x, 
    },
    { title: "At 1.75X speed", icon: <FaFastForward />,
    hour:data?.hour_1_75x ,
    minutes:data?.min_1_75x,
    seconds:data?.seconds_1_75x,
   },
    { title: "At 2X speed", icon: <FaFastForward />,
    hour:data?.hour_2x ,
    minutes:data?.min_2x,
    seconds:data?.seconds_2x,
   },
  ];
    return (
    <Card className="w-4/5">
      <CardHeader className="flex gap-3 justify-center">
        <div className="flex flex-col">
          <p className="text-2xl">Playlist Title:  {data?.title}</p>
          <p className="text-xl">Total Videos: {data?.numberOfVideos}</p>
          
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 flex-wrap md:flex-row md:items-center">
        <div className="grid grid-rows-2 grid-cols-3 justify-evenly w-full  gap-x-8 gap-y-4 max-w-full ">
          {CardTitle.map((titleItem,index) => (
            <Card
              key={index}
              className="shadow-md  cursor-pointer  shadow-purple-400
              scale-100 hover:scale-105 transition-all"
            >
              <CardHeader className="flex gap-3 justify-center">
                <div className="flex flex-col">
                 
                  <p className="flex gap-4 items-center">
                     
                     {titleItem.icon}
                     {titleItem.title}
                  </p>
                    <p>
                      {titleItem.hour !== 0 && `${titleItem.hour} Hours, `}
                      {titleItem.minutes !== 0 && `${titleItem.minutes} Minutes, `}
                      {titleItem.seconds !== 0 && `${titleItem.seconds} Seconds`}
                    </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="flex w-full flex-col mt-4">
          <Tabs aria-label="Options" >
            <Tab key="Latest" title="Latest">
              <VideoCard title={"Latest"} data={data}/>
            </Tab>
            <Tab key="Oldest" title="Oldest">
                <VideoCard title={"Oldest"} data={data}/>
            </Tab>
            <Tab key="Views" title="Views">
                <VideoCard title={"Views"} data={data}/>
            </Tab>
            <Tab key="Likes" title="Likes">
                <VideoCard title={"Likes"} data={data}/>
            </Tab>
            <Tab key="Shortest" title="Shortest">
                <VideoCard title={"Shortest"} data={data}/>
            </Tab>
            <Tab key="Longest" title="Longest">
                <VideoCard title={"Longest"} data={data}/>
 
            </Tab>
          </Tabs>
        </div>
      </CardBody>
      
    </Card>
  );
}

export default DataDisplayCard;
