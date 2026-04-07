import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import VideoDescription from "./VideoDes";
import ShareButton from "./ShareButon";
import { getUserChannelProfile } from "../../../features/user/userApi";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { deleteVideo } from "../../../features/video/videoApi";
import SubscribeButton from "./SubscribeButton";
import { getLikedVideos } from "../../../features/like/likeApi";
import { BasicSpinner } from "../../../components"
import { useNavigate, useParams } from "react-router-dom";

function ChannelInfo() {
    const video = useSelector((state) => state.video.videos.currentVideo);
    const loading = useSelector((state) => state.user.loading.channel)
    const naviagate = useNavigate();
    const owner = video?.owner;
    const { slug: videoId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.user?._id)
    const channelData = useSelector(
        (state) => state.user.channelProfile[owner]
    );
    const likescount = useSelector((state) => state?.like?.likedVideos)

    const channelId = channelData?._id
    const userId = user?._id

    useEffect(() => {
        if (!videoId) return;
        dispatch(getLikedVideos(videoId));
    }, [videoId]);

    useEffect(() => {
        if (!owner || channelData) return;
        dispatch(getUserChannelProfile(owner));
    }, [owner]);


    return (
        <>{!loading ?
            <>
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3" onClick={() => naviagate(`/channel/${owner}`)}>


                            <img
                                src={channelData?.avatar?.url}
                                alt=""
                                className="w-14 h-14 rounded-full"
                            />
                            <div className="m-3">
                                <div className="flex">
                                    <h2 className="text-2xl mr-4 font-bold">{channelData?.fullname}</h2>
                                </div>
                                <p className="text-lg font-medium text-gray-400 mt-2"> {channelData?.subscriberCount} Subscribers</p>
                            </div>


                        </div>
                        <SubscribeButton
                            userId={userId} channelId={channelId}
                        />
                    </div>

                    <div className="flex font-bold items-center gap-4 text-lg">

                        <LikeButton id={videoId} initialCount={likescount.length} />

                        <ShareButton url={`http://localhost:8000/video/${videoId}`} />

                        {
                            (user == owner) &&
                            <DeleteButton onDelete={async () => {
                                await dispatch(deleteVideo(videoId))
                            }} />
                        }

                    </div>

                </div>

                <VideoDescription des={video?.description} views={video?.views} date={video?.createdAt} />
            </>
            : <BasicSpinner />
        }
        </>
    );
}

export default ChannelInfo;