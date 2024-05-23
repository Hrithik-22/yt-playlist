import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { IoTimeSharp } from "react-icons/io5";
import { Image } from "@nextui-org/image";
import { FaEye } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { CiStopwatch } from "react-icons/ci";
import { Link } from "@nextui-org/link";
function getYouTubeUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
const handleWatchVideo = (videoId) => {
  const youtubeUrl = getYouTubeUrl(videoId);
  window.open(youtubeUrl, "_blank");
};
function convertToUTCTime(dateString) {
  // Create a new Date object from the ISO date string
  const date = new Date(dateString);

  // Get the UTC components
  const year = date.getUTCFullYear();
  const month = date.toLocaleString("en-US", { month: "long" }); // Get the month as a string
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  // Construct the UTC time string
  const utcTime = `${day} ${month}, ${year} ${hours}:${minutes} UTC`;

  return utcTime;
}
function VideoCard({ title, data }) {
  let sortedCardsData;

  switch (title) {
    case "Latest":
      sortedCardsData = data.videoTitle
        .map((videoTitle, index) => ({
          videoTitle,
          duration: data.vidDurations[index],
          thumbnail: data.thumbs[index].url,
          videoIds: data.videoIds[index],
          likeCount: data.likeCount[index],
          viewsCount: data.viewsCount[index],
          commentCount: data.commentCount[index],
          publishedAt: convertToUTCTime(data.publishedAt[index]),
        }))
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      break;

    case "Oldest":
      sortedCardsData = data.videoTitle
        .map((videoTitle, index) => ({
          videoTitle,
          duration: data.vidDurations[index],
          thumbnail: data.thumbs[index].url,
          videoIds: data.videoIds[index],
          likeCount: data.likeCount[index],
          viewsCount: data.viewsCount[index],
          commentCount: data.commentCount[index],
          publishedAt: convertToUTCTime(data.publishedAt[index]),
        }))
        .sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
      break;

    case "Views":
      sortedCardsData = data.videoTitle
        .map((videoTitle, index) => ({
          videoTitle,
          duration: data.vidDurations[index],
          thumbnail: data.thumbs[index].url,
          videoIds: data.videoIds[index],
          likeCount: data.likeCount[index],
          viewsCount: data.viewsCount[index],
          commentCount: data.commentCount[index],
          publishedAt: convertToUTCTime(data.publishedAt[index]),
        }))
        .sort((a, b) => b.viewsCount - a.viewsCount);
      break;

    case "Shortest":
      sortedCardsData = data.videoTitle
        .map((videoTitle, index) => ({
          videoTitle,
          duration: data.vidDurations[index],
          thumbnail: data.thumbs[index].url,
          videoIds: data.videoIds[index],
          likeCount: data.likeCount[index],
          viewsCount: data.viewsCount[index],
          commentCount: data.commentCount[index],
          publishedAt: convertToUTCTime(data.publishedAt[index]),
        }))
        .sort(
          (a, b) =>
            a.duration.hour * 3600 +
            a.duration.min * 60 +
            a.duration.secs -
            (b.duration.hour * 3600 + b.duration.min * 60 + b.duration.secs)
        );
      break;

    case "Longest":
      sortedCardsData = data.videoTitle
        .map((videoTitle, index) => ({
          videoTitle,
          duration: data.vidDurations[index],
          thumbnail: data.thumbs[index].url,
          videoIds: data.videoIds[index],
          likeCount: data.likeCount[index],
          viewsCount: data.viewsCount[index],
          commentCount: data.commentCount[index],
          publishedAt: convertToUTCTime(data.publishedAt[index]),
        }))
        .sort(
          (a, b) =>
            b.duration.hour * 3600 +
            b.duration.min * 60 +
            b.duration.secs -
            (a.duration.hour * 3600 + a.duration.min * 60 + a.duration.secs)
        );
      break;
    case "Likes":
      sortedCardsData = data.videoTitle
        .map((videoTitle, index) => ({
          videoTitle,
          duration: data.vidDurations[index],
          thumbnail: data.thumbs[index].url,
          videoIds: data.videoIds[index],
          likeCount: data.likeCount[index],
          viewsCount: data.viewsCount[index],
          commentCount: data.commentCount[index],
          publishedAt: convertToUTCTime(data.publishedAt[index]),
        }))
        .sort((a, b) => b.likeCount - a.likeCount);
      break;
    default:
      sortedCardsData = data.videoTitle.map((videoTitle, index) => ({
        videoTitle,
        duration: data.vidDurations[index],
        thumbnail: data.thumbs[index].url,
        videoIds: data.videoIds[index],
        likeCount: data.likeCount[index],
        viewsCount: data.viewsCount[index],
        commentCount: data.commentCount[index],
        publishedAt: convertToUTCTime(data.publishedAt[index]),
      }));
  }

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 p-4 bg-slate-700">
      {sortedCardsData.map((card, index) => (
        <Card key={index} radius="none" shadow="lg" className="cursor-pointer ">
          <CardHeader>
            <Image
              src={card.thumbnail}
              height={500}
              alt={card.videoTitle}
              radius="none"
            />
          </CardHeader>
          <CardBody>
            <h3 className="font-extrabold mb-4">{card.videoTitle}</h3>
            <div className="ml-4 flex flex-col gap-y-2">
              <p className="flex items-center gap-2 ">
                <IoTimeSharp /> {card.duration.hour} hours, {card.duration.min}{" "}
                mins, {card.duration.secs} secs
              </p>
              <Divider />

              <p className="flex items-center gap-2 ">
                <FaEye /> {card.viewsCount}
              </p>
              <Divider />

              <p className="flex items-center gap-2 ">
                <FaRegThumbsUp /> {card.likeCount}{" "}
              </p>
              <Divider />

              <p className="flex items-center gap-2 ">
                <FaRegMessage /> {card.commentCount}
              </p>
              <Divider />

              {/* <p>VideoIds: {card.videoIds}</p> */}
              {/* Display the converted UTC time */}
              {/* <p className="flex items-center gap-2 "><CiStopwatch  /> {card.publishedAt}</p>  */}
            </div>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Link
              isExternal
              isBlock
              showAnchorIcon
              onClick={() => handleWatchVideo(card.videoIds)}
            >
              Watch the Video
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default VideoCard;
