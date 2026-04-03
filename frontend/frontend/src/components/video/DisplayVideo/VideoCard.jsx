import { useParams } from "react-router-dom";
import VideoPlayer from "./VidPlayer"
import ChannelInfo from "./ChannelInfo";
import CommentsSection from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { VideoCard } from "../../../components"
import formatDuration from "../../../assets/timeConverter";
import formatMonthYear from "../../../assets/dateConverter";
import { useEffect } from "react";
import { getExploreVideos } from "../../../features/video/videoApi";

function VideoCompo() {

    const { slug: videoId } = useParams();

    const dispatch = useDispatch();
    const { exploreVideos = [] } = useSelector((state) => state?.video?.videos)

    useEffect(() => {
        dispatch(getExploreVideos({ excludeIds: [], limit: 10 }));
    }, [dispatch, videoId])


    return (
        <div className="h-screen overflow-hidden bg-gray-900 text-gray-200">
            <div className="flex w-full gap-4 h-full">
                <div className="flex-[0.70] min-h-0 overflow-y-auto custom-scrollbar space-y-4 pr-2 p-4">
                    <VideoPlayer />
                    <ChannelInfo />
                    <CommentsSection />
                </div>

                <div className="hidden lg:block flex-[0.30] min-h-0 overflow-y-auto pr-2 custom-scrollbar  scrollbar-thin scrollbar-thumb-gray-700">
                    <p className="text-gray-400">Recommended Videos</p>


                    <div className="grid grid-cols-1 p-2">
                        {[...exploreVideos].map((video) => (
                            <VideoCard
                                key={video._id}
                                thumbnail={video?.thumbnail?.url}
                                title={video?.title}
                                views={video?.views}
                                time={formatMonthYear(video?.time)}
                                duration={formatDuration(video?.duration)}
                                forfeed={true}
                                owner={video?.owner}
                                videoId={video?._id}
                            />
                        ))}
                    </div>
                </div>

            </div>

        </div >


    );
}

export default VideoCompo;