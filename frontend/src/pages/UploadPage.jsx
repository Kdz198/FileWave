import { useState, useEffect, useRef } from 'react';
import { Trash2, X } from 'lucide-react';
import Header from '../pages/Header';
import Footer from "./Footer.jsx";

function UploadPage() {
    const [file, setFile] = useState(null);
    const [expiredHour, setExpiredHour] = useState(1);
    const [fileInfo, setFileInfo] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy Code');
    const fileInputRef = useRef(null);

    useEffect(() => {
        let timer;
        if (isUploading && progress < 100) {
            timer = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
            }, 50);
        }
        return () => clearInterval(timer);
    }, [isUploading, progress]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Vui lòng chọn file để tải lên');
            return;
        }
        setIsUploading(true);
        setShowModal(true);
        setError(null);
        setProgress(0);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setError(null);
            setIsUploading(true);
            setShowModal(true);
            setProgress(0);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
        setFileInfo(null);
        setProgress(0);
        setShowModal(false);
        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleConfirm = async () => {
        if (progress < 100) return;
        setIsConfirming(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('expiredHour', expiredHour);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setFileInfo(data);
        } catch (error) {
            setError('Tải file thất bại. Vui lòng thử lại.');
            console.error('Upload failed:', error);
        } finally {
            setIsConfirming(false);
        }
    };

    const copyToClipboard = () => {
        if (fileInfo?.code) {
            navigator.clipboard.writeText(fileInfo.code).then(() => {
                setCopyButtonText('Copied!');
                setShowToast(true);
                setTimeout(() => {
                    setCopyButtonText('Copy Code');
                }, 2000);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            });
        }
    };

    const truncateFileName = (name, maxLength = 30) => {
        if (!name) return 'File không xác định';
        if (name.length <= maxLength) return name;
        const extension = name.split('.').pop();
        const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
        const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4) + '...';
        return `${truncatedName}.${extension}`;
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Header />
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                            Simple and reliable<br />
                            file transfers
                        </h1>
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-8 transition-colors duration-200 ${
                                isDragging
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                    : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    {isDragging ? 'Thả file vào đây!' : 'Kéo và thả file hoặc nhấn để chọn'}
                                </p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2 shadow-lg"
                                >
                                    <span className="text-xl">📁</span>
                                    <span>Send files</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 mb-16">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-200 dark:border-gray-700">
                                    <div className="relative">
                                        <div className="w-8 h-6 border-2 border-gray-400 dark:border-gray-500 rounded"></div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">→</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Send files up to 6 GB</h3>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-200 dark:border-gray-700">
                                    <div className="relative">
                                        <div className="w-8 h-8 border-2 border-gray-400 dark:border-gray-500 rounded-lg"></div>
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">↓</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Up to 50 downloads of<br />your files</h3>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-200 dark:border-gray-700">
                                    <div className="w-10 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full relative">
                                        <div className="absolute inset-2 border-l-2 border-green-500"></div>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Save the files<br />for 21 days</h3>
                            </div>
                        </div>
                    </div>

                    <input
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setError(null);
                            setIsUploading(true);
                            setShowModal(true);
                            setProgress(0);
                        }}
                        className="hidden"
                        id="fileInput"
                        ref={fileInputRef}
                    />
                </main>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">
                            <button
                                onClick={handleRemoveFile}
                                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <div className="flex items-center justify-center mb-8">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">F</span>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-800 dark:text-white">FileWave</span>
                                    <span className="text-gray-500 dark:text-gray-400 mx-2">by</span>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                                        <span className="font-medium text-gray-700 dark:text-gray-300">Hoàng Tử Gió</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="flex-1 min-w-0 mr-4">
                                    <div className="font-medium text-gray-900 dark:text-white truncate text-lg">
                                        {truncateFileName(file?.name)}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {file ? (file.size / 1024).toFixed(1) : '0'}KB
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative overflow-hidden">
                                        <div
                                            className="bg-green-500 h-4 rounded-full transition-all duration-300 relative overflow-hidden"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {progress === 100 && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xs font-semibold text-white drop-shadow">
                                                {progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    Thời Gian Hết Hạn
                                </label>
                                <select
                                    value={expiredHour}
                                    onChange={(e) => setExpiredHour(e.target.value)}
                                    className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                                >
                                    <option value="1">1 giờ</option>
                                    <option value="6">6 giờ</option>
                                    <option value="12">12 giờ</option>
                                    <option value="24">24 giờ</option>
                                    <option value="48">48 giờ</option>
                                </select>
                            </div>
                            {progress < 100 && isUploading && (
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center space-x-3">
                                        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-white">You're almost done!</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Uploading your files ...</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {progress === 100 && !isConfirming && !fileInfo && (
                                <button
                                    onClick={handleConfirm}
                                    className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 p-4 rounded-xl text-white font-semibold text-lg transition-colors duration-200"
                                >
                                    Confirm
                                </button>
                            )}
                            {isConfirming && (
                                <div className="text-center mb-4">
                                    <div className="inline-flex items-center space-x-3">
                                        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-700 dark:text-gray-300">Đang xử lý...</span>
                                    </div>
                                </div>
                            )}
                            {fileInfo && (
                                <div className="space-y-6">
                                    <button
                                        onClick={copyToClipboard}
                                        className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                                            copyButtonText === 'Copied!'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white'
                                        }`}
                                    >
                                        {copyButtonText}
                                    </button>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">🧾 Mã File:</p>
                                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-green-500 shadow-lg">
                                            <p className="text-3xl font-mono font-bold text-gray-900 dark:text-white tracking-widest uppercase break-all">
                                                {fileInfo.code}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {showToast && (
                    <div className="fixed bottom-4 right-4 z-60">
                        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
                            <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <span className="text-xs">✓</span>
                            </div>
                            <span className="font-medium text-white">Mã đã được sao chép!</span>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UploadPage;