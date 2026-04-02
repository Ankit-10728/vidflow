import { VideoCard } from "../../components"
import formatMonthYear from "../../assets/dateConverter.js"
import formatDuration from "../../assets/timeConverter.js";

function VideoTab({ videos }) {

    console.log("from video tab tabatbatbatbatbatbatbatabatbata");
    console.log(videos);


    return (
        <div className="mt-6">
            <div className="grid grid-cols-3 gap-4">
                {[...videos].reverse().map((video) => (
                    <VideoCard
                        forfeed={false}
                        key={video?._id}
                        thumbnail={video?.thumbnail?.url}
                        title={video?.title}
                        views={video?.views}
                        time={formatMonthYear(video?.createdAt)}
                        duration={formatDuration(video?.duration)}
                        owner={video?.owner}
                        videoId={video?._id}
                    />
                ))}
            </div>
        </div>
    );
}



export default VideoTab