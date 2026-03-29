import { useState } from "react";


function VideoDescription({ date, des, views }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-gray-800 p-4 rounded-xl mt-3 text-sm  text-gray-300">


            <div className="flex flex-wrap gap-2 text-gray-400 font-bold">
                <span>{views} views</span>
                <span>•</span>
                <span>
                    {new Date(date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
                <span>•</span>


                <span className="text-blue-400">
                    #CareerAdvice #Unemployment #WarikooCareers
                </span>
            </div>


            <div
                className={`mt-2 transition-all duration-300 ${expanded ? "max-h-full" : "max-h-20 overflow-hidden"
                    }`}
            >
                <p className="whitespace-pre-line">
                    {des}
                </p>
            </div>

            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-gray-400 hover:text-white text-sm font-semibold"
            >
                {expanded ? "Show less" : "Show more"}
            </button>

        </div>
    );
}

export default VideoDescription;