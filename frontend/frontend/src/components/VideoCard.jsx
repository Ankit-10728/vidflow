import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserChannelProfile } from "../features/user/userApi";
import { useNavigate } from "react-router-dom";

function VideoCard({ thumbnail, title, views, time, duration, forfeed, owner, videoId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ownerId = owner?._id
    const channelData = useSelector(
        (state) => state.user.channelProfile[ownerId]
    );
    // console.log("this is from video card inside the video tab from dashboard");
    // console.log(channelData);
    // console.log(videoId);
    // console.log(typeof (videoId));
    // console.log("this is from video card inside the video tab from dashboard");

    useEffect(() => {
        if (!ownerId || !videoId || channelData) return;
        dispatch(getUserChannelProfile(ownerId));
    }, [dispatch, videoId]);

    const handleClick = (videoId) => {
        navigate(`/post/${videoId}`)
    }

    return (
        <div onClick={() => handleClick(videoId)} className="transition-all duration-300 hover:scale-[1.0] hover:shadow-xl hover:-translate-y-1 cursor-pointer ">
            <div className="flex flex-col gap-2 w-full mb-1">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800">
                    <img
                        src={thumbnail}
                        alt="video"
                        className="w-full h-full object-cover"
                    />

                    <span className="absolute bottom-2 right-2 bg-black/80 text-sm font-semibold p-1 rounded">
                        {duration}
                    </span>
                </div>
                <div className="flex gap-2">
                    {forfeed &&
                        <div className="w-13 h-13 rounded-full bg-gray-600 m-2 shrink-0">
                            <img className="w-full h-full rounded-full" src={channelData?.avatar?.url} alt="profile" />
                        </div>
                    }

                    <div className="flex flex-col">
                        <p className="text-xl font-medium line-clamp-2">{title}</p>
                        <div className="mt-1">
                            <div className="flex gap-2 items-center ">
                                <p className="text-xl font-bold text-gray-400"> {channelData?.fullname}</p>
                                <div className="flex items-center justify-center w-1 h-1 rounded-full bg-gray-700 p-3 text-xs text-white font-extrabold ">
                                    ✓
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <p className="text-lg text-gray-400">{views} views  </p>
                                <p className="text-lg text-gray-400">{time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default VideoCard