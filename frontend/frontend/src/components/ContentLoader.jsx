function ContentLoader() {
    return (
        <>
            <div className="mt-8">
                <div className="relative h-32 bg-gray-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Loading content...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContentLoader

