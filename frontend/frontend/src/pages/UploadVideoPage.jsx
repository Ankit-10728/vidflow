import { VideoUpload } from "../components";

function UploadPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
            <div className="w-full h-full  bg-gray-800 rounded-2xl shadow-xl p-6">
                <h1 className="text-2xl font-semibold mb-6">Upload Video</h1>
                <VideoUpload />
            </div>
        </div>
    );
}

export default UploadPage;