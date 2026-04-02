import { useState } from "react";
import { SubscribeButton } from "../../components"
import { useSelector } from "react-redux";
import { VideoTab, TweetTab } from "../../components"

function Channel({ channel, videos, tweets }) {
    const [activeTab, setActiveTab] = useState("videos");
    const channelId = channel?._id;
    const userId = useSelector((state) => state?.user?.user?._id)
    console.log("thissi is channel 325u0349603603036u06u");
    console.log(channel);
    console.log(videos);
    console.log(tweets);
    console.log(userId);
    console.log(channelId);


    return (
        <div className="w-full bg-gray-900 text-white min-h-screen">

            <div className="max-w-7xl mx-auto px-4 py-4">


                <div className="mt-0">
                    <div className="w-full h-15 sm:h-15 md:h-50 lg:h-60 bg-gray-800 rounded-2xl overflow-hidden">
                        <img
                            src={channel?.coverImage?.url}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-6">

                    <img
                        src={channel?.avatar?.url}
                        alt="Avatar"
                        className="w-20 h-20 sm:w-28 sm:h-28 md:w-50 md:h-50 rounded-full 
             border-4 border-gray-900 
             ring-2 ring-gray-400 
             bg-amber-100 mr-1 object-cover"
                    />

                    <div className="flex flex-col items-center  sm:items-start text-center sm:text-left">
                        <h2 className="text-xl sm:text-2xl md:text-6xl font-bold mb-2">
                            {channel?.fullname}
                        </h2>

                        <div className="flex gap-3 text-gray-300 mt-2">

                            <p className="text-white text-lg mr-2 font-semibold">
                                @ {channel?.username}
                            </p>

                            <p className="text-lg mt-1">
                                • {channel?.totalVideos} Videos
                            </p>
                            <p className="text-lg mt-1">
                                • {channel?.totalTweets} Tweets
                            </p>
                            <p className="text-lg mt-1">
                                • {channel?.totalPlaylist} Playlists
                            </p>
                            <p className=" text-lg mt-1">
                                • {channel?.totalSubscriber} Subscribers
                            </p>

                        </div>
                        <div className="m-6 ml-0">
                            <SubscribeButton userId={userId} channelId={channelId} />
                        </div>

                    </div>
                </div>


                <div className="mt-8">
                    <div className="flex gap-8 sm:gap-10 md:gap-12 border-b border-gray-700 text-sm sm:text-base md:text-lg font-medium">

                        {["videos", "tweets", "playlists"].map((tab) => (
                            <button
                                key={tab}
                                className={`pb-3 ${activeTab === tab
                                    ? "border-b-2 border-white text-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">


                        <div>
                            {activeTab == "videos" && <VideoTab videos={videos} />}
                        </div>
                        <div>
                            {activeTab == "tweets" && <TweetTab tweets={tweets} />}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default Channel