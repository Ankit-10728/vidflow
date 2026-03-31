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
    console.log("this is the chennel info");
    console.log(video);
    const owner = video?.owner;
    const videoId = video?._id
    const dispatch = useDispatch();
    const temp = useSelector((state) => state.user)
    const user = useSelector((state) => state.user?.user?._id)


    // const user = useSelector((state) => state.user?.user?._id);
    const channelData = useSelector((state) => state.user?.channelProfile)

    console.log(user);
    console.log(useSelector((state) => state.user));
    console.log(temp);

    console.log("thsi 76587258327695#$%^*&(&*&");



    const likescount = useSelector((state) => state?.like?.likedVideos || 334)

    useEffect(() => {
        if (!owner) return;
        dispatch(getLikedVideos(video._id))
        dispatch(getUserChannelProfile(owner));
    }, [dispatch, videoId]);

    console.log("from channel info");
    console.log(channelData);
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

                    <LikeButton id={video?._id} initialCount={likescount.length} />

                    <ShareButton url={`http://localhost:8000/video/${video?._id}`} />

                    {
                        (user == owner) &&
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