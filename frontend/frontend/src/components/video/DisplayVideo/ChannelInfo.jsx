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

function ChannelInfo() {
    const video = useSelector((state) => state.video.videos.currentVideo);
    // console.log("this is the chennel info");
    // console.log(video);
    const owner = video?.owner;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.user?.user?._id)
    const channelData = useSelector((state) => state.user?.channelProfile)
    useEffect(() => {
        if (!owner) return;
        dispatch(getLikedVideos(video._id))
        dispatch(getUserChannelProfile(owner));
    }, [owner, dispatch]);

    const initialLikes = useSelector((state) => state?.like?.likedVideos)
    console.log("from channel info");
    console.log(channelData);
    // console.log(video.views);

    return (
        <>
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-3">
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


                    <SubscribeButton
                        initialSubscribed={channelData?.isSubscribed}
                        onToggle={async (newState) => {
                            await dispatch(toggleSubscription(channelData._id));
                        }}
                    />
                </div>

                <div className="flex font-bold items-center gap-4 text-lg">

                    <LikeButton initialLikes={initialLikes.length} id={video?._id} />

                    <ShareButton url={`http://localhost:8000/video/${video?._id}`} />

                    {
                        (owner == owner) &&
                        <DeleteButton onDelete={async () => {
                            await dispatch(deleteVideo(video._id))
                        }} />
                    }

                </div>

            </div>

            <VideoDescription des={video?.description} views={0} date={video?.createdAt} />
        </>
    );
}

export default ChannelInfo;