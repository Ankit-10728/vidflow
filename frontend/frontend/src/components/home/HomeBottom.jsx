function HomeBottom() {
    return (
        <>
            <section className=" bg-[#242131] mt-24 max-w-325 mx-auto px-15 py-20 rounded-2xl mb-20">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Why Choose <span className="text-[#C0B7E8]">Our Platform?</span>
                    </h2>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Create, share, and connect through powerful video and micro-content tools built for modern creators.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="bg-[#211E2E] p-8 rounded-3xl 
                    border border-white/10 
                    hover:border-[#C0B7E8] 
                    transition-all duration-300 
                    hover:-translate-y-3">

                        <div className="text-[#C0B7E8] text-4xl mb-6">🎬</div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            Create & Upload
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Upload high-quality videos or share quick thoughts instantly.
                            Your content, your rules.
                        </p>
                    </div>

                    <div className="bg-[#211E2E] p-8 rounded-3xl 
                    border border-white/10 
                    hover:border-[#C0B7E8] 
                    transition-all duration-300 
                    hover:-translate-y-3">

                        <div className="text-[#C0B7E8] text-4xl mb-6">🌍</div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            Engage Community
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Like, comment, repost, and build real conversations
                            with creators and audiences worldwide.
                        </p>
                    </div>

                    <div className="bg-[#211E2E] p-8 rounded-3xl 
                    border border-white/10 
                    hover:border-[#C0B7E8] 
                    transition-all duration-300 
                    hover:-translate-y-3">

                        <div className="text-[#C0B7E8] text-4xl mb-6">🚀</div>
                        <h3 className="text-xl font-bold text-white mb-4">
                            Grow Your Audience
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Personalized feeds and discovery tools help your content
                            reach the right people.
                        </p>
                    </div>

                </div>

            </section>

            <div className="flex justify-center sm:justify-between items-center mt-6 mx-auto max-w-325 rounded-[90px] py-20 px-6 sm:p-8 lg:p-14 bg-linear-to-r from-[#211E2E] via-[#3A3456] to-[#211E2E] ">

                <div className="flex-1 text-center">
                    <h2 className="text-3xl font-bold text-[#C0B7E8]">10K+</h2>
                    <p className="text-white mt-2">Videos Uploaded</p>
                </div>

                <span className="hidden sm:inline-block h-16 w-px bg-[#C0B7E8]" />

                <div className="flex-1 text-center">
                    <h2 className="text-3xl font-bold text-[#C0B7E8]">5K+</h2>
                    <p className="text-white mt-2">Active Creators</p>
                </div>

                <span className="hidden sm:inline-block h-16 w-px bg-[#C0B7E8]" />

                <div className="flex-1 text-center">
                    <h2 className="text-3xl font-bold text-[#C0B7E8]">3+</h2>
                    <p className="text-white mt-2">Countries Reached</p>
                </div>

            </div>
        </>
    )
}

export default HomeBottom