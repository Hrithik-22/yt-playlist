
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";

function FeatureCard() {
  const acoData = [
    {
      title: "Calculate Youtube Playlist Length",
      description:
        "Easily determine the total duration of any YouTube playlist. Whether it's a collection of your favorite music videos or educational content, we've got you covered.",
    },
    {
      title: "Average Duration Insights",
      description:
        "Discover the average duration of videos within a youtube playlist. This feature is perfect for planning your viewing sessions more effectively.",
    },
    {
      title: "Flexible Playback Speeds",
      description:
        "Wonder how long it takes to watch a youtube playlist at different speeds? Find out for 1.25X, 1.5X, 1.75X, and 2X playback speeds.",
    },
    {
      title: "Smart Sorting Options",
      description:
        "Sort youtube playlist by upload date to catch up on the latest content or sort by length, views and likes to prioritize the most popular ones.",
    },
    {
      title: " In-depth Video Details",
      description:
        "Explore individual video stats in youtube playlist, including duration, views, likes, comments, and upload time. This information helps you decide which videos to watch first in youtube playlist.",
    },
  ];
  return (
    <Card className="w-4/5 ">
      <CardHeader className="flex gap-3 justify-center">
        <div className="flex flex-col">
          <p className="">
            Calculate YouTube Playlist Duration and Analyze Video Stats
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 flex-wrap md:flex-row md:items-center">
        <div className="flex flex-row items-center w-full">
          <p>
            Welcome to Youtube Playlist length calculator, your ultimate
            destination for managing and optimizing your YouTube playlist
            experience. Our unique tool empowers you to calculate the total
            duration of youtube playlists, explore average video durations, and
            dive into comprehensive watch duration analyses. But that's not all
            – we provide you with advanced sorting options based on Views and
            Likes and detailed insights into individual videos.
          </p>
        </div>
        <Divider />
        <Accordion variant="splitted">
          {acoData.map((item) => (
            <AccordionItem
              key={item.title}
              aria-label="Accordion 1"
              title={item.title}
            >
              {item.description}
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
}

export default FeatureCard;
