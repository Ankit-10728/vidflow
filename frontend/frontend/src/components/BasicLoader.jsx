
function BasicSpinner() {
    return (
        <>
            <div

                className="flex flex-col items-center gap-4 p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl"
            >
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    hold tight..
                </h4>
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>

            </div>
        </>
    )
}

export default BasicSpinner
