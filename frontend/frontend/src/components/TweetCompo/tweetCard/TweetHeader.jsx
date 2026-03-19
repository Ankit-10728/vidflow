function TweetHeader({
    url = "",
    username = "Unknown",
    fullname = "",
    date = ""
}) {
    console.log("from tweet header")
    console.log(url + username)
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img
                    src={url}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-300"
                />
                <div>
                    <h3 className="font-semibold text-3xl">{username}</h3>
                    <h3 className="font-thin text-xl">{fullname}</h3>
                    <p className="text-sm opacity-70">{date}</p>
                </div>
            </div>

            <button className="px-5 py-2 rounded-full bg-white/20">
                Subscribe
            </button>
        </div>
    );
}

export default TweetHeader;
