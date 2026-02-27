import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaylistById } from "../features/playlist/playlistApi.js"

function PlaylistPage() {
    const dispatch = useDispatch();
    const { playlists, loading, error } = useSelector(
        (state) => state.playlist
    );

    useEffect(() => {
        dispatch(getPlaylistById("698f56c90a732d2b5e098ae7"));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div>success</div>
        </div>
    );
}

export { PlaylistPage };
