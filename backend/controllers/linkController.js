import { google } from "googleapis";
import "dotenv/config";
const youtube = google.youtube("v3");
const API_KEYS = process.env.API_KEY;
class linkController {
  static async index(req, res) {
    try {
      let videoIds = [];
      let nextPageToken = null;
      let hourRegex = /(\d+)H/g;
      let minuteRegex = /(\d+)M/g;
      let secondRegex = /(\d+)S/g;
      let length = 0;
      let title = "";
      let videoTitle=[];
      let publishedAt=[];
      let channelTitle = "";
      let description = "";
      let thumbs = [];
      let vidDurations=[];
      let durationSeconds = 0;
      let totalSeconds = 0;
      let viewsCount=[];
      let likeCount=[];
      let commentCount=[];
      let speed = parseFloat(req.body.speed) || "1";
      const testResponse = await youtube.playlists.list({
        key: API_KEYS,
        part: "snippet",
        id: req.body.id,
      });
      title = testResponse.data.items[0].snippet.title;
      channelTitle = testResponse.data.items[0].snippet.channelTitle;
      description = testResponse.data.items[0].snippet.description;
      while (true) {
        const plResponse = await youtube.playlistItems.list({
          key: API_KEYS,
          part: "contentDetails, snippet",
          playlistId: req.body.id,
          maxResults: 50,
          pageToken: nextPageToken,
        });

        plResponse.data.items.forEach((item) =>{
          publishedAt.push(item.contentDetails.videoPublishedAt);
          videoIds.push(item.contentDetails.videoId);
        }
        );
        length += videoIds.length;
        console.log(length);
        const vidResponse = await youtube.videos.list({
          key: API_KEYS,
          part: "contentDetails,statistics,snippet",
          id: videoIds.join(","),
        });
        console.log(vidResponse.data.items);
        vidResponse.data.items.forEach((item) => {
          const views=item.statistics.viewCount;
          const likes=item.statistics.likeCount;
          const comment=item.statistics.commentCount;
          viewsCount.push(views);
          likeCount.push(likes);
          commentCount.push(comment);
          thumbs.push(item.snippet.thumbnails.medium);
          videoTitle.push(item.snippet.title);
          const hour =
            item.contentDetails.duration
              ?.match(hourRegex)?.[0]
              ?.replace("H", "") || 0;
          const min =
            item.contentDetails.duration
              ?.match(minuteRegex)?.[0]
              ?.replace("M", "") || 0;
          const secs =
            item.contentDetails.duration
              ?.match(secondRegex)?.[0]
              ?.replace("S", "") || 0;
          vidDurations.push({hour:hour,min:min,secs:secs});
          durationSeconds =
            parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(secs);
          totalSeconds += durationSeconds;
        });

        // last part
        nextPageToken = plResponse.data.nextPageToken;
        if (!nextPageToken) {
          break;
        }
      }
      console.log(publishedAt);
      let [minutes, seconds] = [
        parseInt(totalSeconds / speed / 60),
        parseInt((totalSeconds / speed) % 60),
      ];
      let hours = parseInt(minutes / 60);
      minutes = parseInt(minutes % 60);

      let [min_1_25x,seconds_1_25x]=[ parseInt(totalSeconds / 1.25 / 60),
      parseInt((totalSeconds / 1.25) % 60),];
      let hour_1_25x=parseInt(min_1_25x / 60);
      min_1_25x = parseInt(min_1_25x % 60);

      let [min_1_5x,seconds_1_5x]=[ parseInt(totalSeconds / 1.5 / 60),
      parseInt((totalSeconds / 1.5) % 60),];
      let hour_1_5x=parseInt(min_1_5x / 60);
      min_1_5x = parseInt(min_1_5x % 60);


      let [min_1_75x,seconds_1_75x]=[ parseInt(totalSeconds / 1.75 / 60),
      parseInt((totalSeconds / 1.75) % 60),];
      let hour_1_75x=parseInt(min_1_75x / 60);
      min_1_75x = parseInt(min_1_75x % 60);


      
      let [min_2x,seconds_2x]=[ parseInt(totalSeconds / 2 / 60),
      parseInt((totalSeconds / 2) % 60),];
      let hour_2x=parseInt(min_2x / 60);
      min_2x = parseInt(min_2x % 60);


      // Calculate average duration
      const averageDurationSeconds = totalSeconds / length; 
      let [averageMinutes, averageSeconds] = [
        parseInt(averageDurationSeconds / 60),
        parseInt(averageDurationSeconds % 60),
      ];
      let averageHour=parseInt(averageMinutes/60);
      averageMinutes = parseInt(averageMinutes % 60);

      res.status(200).json({
        status: "success",
        data: {
          numberOfVideos: length,
          title: title,
          description: description,
          channelTitle: channelTitle,
          duration: parseInt(totalSeconds / speed),
          videoTitle:videoTitle,
          vidDurations:vidDurations,
          videoIds:videoIds,
          likeCount:likeCount,
          viewsCount:viewsCount,
          commentCount:commentCount,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          avgHour:averageHour,
          avgMin:averageMinutes,
          avgSec:averageSeconds,
          hour_1_25x:hour_1_25x,
          min_1_25x:min_1_25x,
          seconds_1_25x:seconds_1_25x,
          min_1_5x:min_1_5x,
          hour_1_5x:hour_1_5x,
          seconds_1_5x:seconds_1_5x,
          hour_1_75x:hour_1_75x,
          min_1_75x:min_1_75x,
          seconds_1_75x:seconds_1_75x,
          hour_2x:hour_2x,
          seconds_2x:seconds_2x,
          min_2x:min_2x,
          thumbs: thumbs,
          publishedAt:publishedAt,
        },
      });
      // console.log(res.data);
    } catch (e) {
      // console.log("ewer");
      res.status(500).json({
        status: "fail",
        message: e.message,
      });
    }
  }
}
export default linkController;
