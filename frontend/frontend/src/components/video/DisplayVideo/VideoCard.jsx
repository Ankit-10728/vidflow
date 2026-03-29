import { useParams } from "react-router-dom";
import VideoPlayer from "./VidPlayer"
import ChannelInfo from "./ChannelInfo";
import CommentsSection from "./Comment";

function VideoPage() {
    const { id } = useParams();

    return (
        <div className="h-screen overflow-hidden bg-gray-900 text-gray-200">


            <div className="flex w-full gap-4 h-full">

                {/* LEFT SIDE */}
                <div className="flex-[0.70] min-h-0 overflow-y-auto custom-scrollbar space-y-4 pr-2 p-4">
                    <VideoPlayer />
                    <ChannelInfo />
                    <CommentsSection />
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden lg:block flex-[0.30] min-h-0 overflow-y-auto pr-2  scrollbar-thin scrollbar-thumb-gray-700">
                    <p className="text-gray-400">Recommended Videos</p>

                    {/* Add many items here to see scroll */}
                </div>

            </div>

        </div >


    );
}

export default VideoPage;