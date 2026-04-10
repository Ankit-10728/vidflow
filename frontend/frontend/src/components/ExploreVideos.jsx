import { getExploreVideos } from "../features/video/videoApi.js";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ContentLoader, VideoCard } from "../components";
import formatDuration from "../assets/timeConverter.js";
import formatMonthYear from "../assets/dateConverter.js";

function ExploreVideos() {
    const dispatch = useDispatch();

    const { exploreVideos = [] } = useSelector((state) => state.video.videos);
    const { hasMore } = useSelector((state) => state.video.pagination);
    const loading = useSelector((state) => state.video.loading.explore);

    useEffect(() => {
        dispatch(getExploreVideos({ excludeIds: [] }));
    }, [dispatch]);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            const excludeIds = exploreVideos.map(v => v._id);
            dispatch(getExploreVideos({ excludeIds }));
        }
    };

    return (
        <>
            {
                !loading ?
                    <div className="p-4">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {exploreVideos.map((video) => (
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



                        {hasMore && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                                >
                                    {loading ? "Loading..." : "Load More"}
                                </button>
                            </div>
                        )}

                        {!loading && exploreVideos.length === 0 && (
                            <p className="text-center mt-4">No videos found</p>
                        )}
                    </div>

                    : <ContentLoader />
            }
        </>
    );
}

export default ExploreVideos;
