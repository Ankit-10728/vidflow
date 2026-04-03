import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideoById } from "../../../features/video/videoApi";

function VideoPlayer() {
    const [play, setPlay] = useState(false);
    const dispatch = useDispatch();
    const { slug } = useParams();

    useEffect(() => {
        dispatch(getVideoById(slug));
    }, [slug]);

    const video = useSelector((state) => state?.video?.videos?.currentVideo)

    return (
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
            {!play ? (
                <div onClick={() => setPlay(true)} className="cursor-pointer">
                    <img
                        src={video?.thumbnail?.url}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 w-24 h-24 flex items-center justify-center rounded-full 
                hover:scale-110 transition cursor-pointer">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                className="w-15 h-15 ml-1"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>

                        </div>
                    </div>
                </div>
            ) : (
                <video
                    src={video?.videoFile?.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                />
            )}
        </div>
    );
}

export default VideoPlayer