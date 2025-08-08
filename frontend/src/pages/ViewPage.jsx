import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import React from 'react';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

function ViewPage() {
    const [code, setCode] = useState('');
    const [fileInfo, setFileInfo] = useState(null);
    const [error, setError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const canvasRef = useRef(null);

    const downloadFile = async (url, filename) => {
        const res = await fetch(url);
        const blob = await res.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'download';
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with code:', code); // Debug
        if (!code.trim()) {
            setError('Please enter the file code.');
            return;
        }

        setFileInfo(null);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/${code}`, {
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            if (!data || !data.url) {
                throw new Error('File information not found or invalid URL.');
            }
            setFileInfo(data);
            setIsMobileMenuOpen(false); // Chỉ đóng menu khi submit thành công
        } catch (err) {
            console.error('File does not exist or has expired', err);
            setError('File does not exist or has expired');
        }
    };

    const isImage = (format) => ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(format?.toLowerCase());
    const isPDF = (format) => format?.toLowerCase() === 'pdf';
    const isVideo = (format) => ['mp4', 'webm', 'mov'].includes(format?.toLowerCase());
    const isAudio = (format) => ['mp3', 'wav', 'ogg'].includes(format?.toLowerCase());
    const isOffice = (format) => ['docx', 'xlsx', 'pptx', 'xls'].includes(format?.toLowerCase());

    const renderPDF = async (pdfUrl) => {
        try {
            const response = await fetch(pdfUrl);
            if (!response.ok) {
                throw new Error('Unable to load PDF content from URL.');
            }
            const arrayBuffer = await response.arrayBuffer();

            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const container = canvasRef.current;
            if (!container) return;

            container.innerHTML = '';

            // Responsive scale for PDF
            const isMobile = window.innerWidth < 768;
            const scale = isMobile ? 0.8 : 1.2;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.className = 'border border-gray-200 dark:border-gray-700 rounded-md mb-2 w-full max-w-full h-auto';
                container.appendChild(canvas);

                const context = canvas.getContext('2d');
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise;
            }
        } catch (err) {
            console.error('Error rendering PDF:', err);
            setError('Error rendering PDF: ' + err.message);
        }
    };

    useEffect(() => {
        //console.log('fileInfo changed:', fileInfo); // Debug
        if (fileInfo && isPDF(fileInfo.format) && fileInfo.url) {
            renderPDF(fileInfo.url);
        }
    }, [fileInfo]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                !event.target.closest('.mobile-sidebar') &&
                !event.target.closest('.mobile-menu-button') &&
                !event.target.closest('input') // Bỏ qua input
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        const eventType = 'ontouchstart' in window ? 'touchstart' : 'click';
        document.addEventListener(eventType, handleClickOutside);
        return () => document.removeEventListener(eventType, handleClickOutside);
    }, [isMobileMenuOpen]);

    const SidebarContent = () => (
        <>
            {/* Input Form */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Enter File Code</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        key="file-code-input"
                        type="text"
                        value={code}
                        onChange={(e) => {
                            e.preventDefault();
                            setCode(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            //console.log('Key pressed:', e.key); // Debug
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Ngăn submit khi nhấn Enter
                            }
                        }}
                        placeholder="Enter file code..."
                        autoFocus
                        className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                        <span className="text-lg">🔍</span>
                        <span>View File</span>
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
                        <p>Error: {error}</p>
                    </div>
                )}
            </div>

            {/* File Info */}
            {fileInfo && !error && (
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">File Information</h2>
                    <div className="space-y-3 text-sm">
                        <p><strong className="text-gray-700 dark:text-gray-300">Code:</strong> <span className="font-mono text-gray-900 dark:text-white break-all">{fileInfo.code}</span></p>
                        <p><strong className="text-gray-700 dark:text-gray-300">Format:</strong> <span className="uppercase text-gray-900 dark:text-white">{fileInfo.format}</span></p>
                        <p><strong className="text-gray-700 dark:text-gray-300">Created At:</strong> <span className="text-gray-900 dark:text-white">{new Date(fileInfo.createdAt).toLocaleString('en-US')}</span></p>
                        <p><strong className="text-gray-700 dark:text-gray-300">Expires At:</strong> <span className="text-gray-900 dark:text-white">{new Date(fileInfo.expiredAt).toLocaleString('en-US')}</span></p>
                        <button
                            onClick={() => downloadFile(fileInfo.url, `file.${fileInfo.format}`)}
                            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold w-full text-center space-x-2 mt-4 transition-colors"
                        >
                            <span className="text-lg">📥</span>
                            <span>Download File</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <Header />

            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="lg:hidden fixed top-20 left-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="mobile-menu-button bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-3 rounded-lg shadow-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:flex">
                {/* Desktop Sidebar & Mobile Sidebar */}
                <aside className={`
                    lg:w-80 lg:pr-8 lg:flex-shrink-0 lg:block
                    ${isMobileMenuOpen ? 'block' : 'hidden'}
                    lg:relative fixed inset-y-0 left-0 z-50 w-80 pt-20 lg:pt-0
                    mobile-sidebar
                `}>
                    <div className="lg:sticky lg:top-20 h-full lg:h-auto overflow-y-auto lg:overflow-visible bg-gray-50 dark:bg-gray-900 lg:bg-transparent p-4 lg:p-0">
                        <SidebarContent />
                    </div>
                </aside>

                {/* File Preview */}
                <section className="flex-1 lg:mt-0 mt-4">
                    {fileInfo && !error && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">File Preview</h2>
                            {isImage(fileInfo.format) ? (
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <img
                                        src={fileInfo.url}
                                        alt="Image preview"
                                        className="max-w-full h-auto rounded-lg mx-auto"
                                        onError={() => setError('Unable to load image. Invalid format or corrupted file.')}
                                    />
                                </div>
                            ) : isVideo(fileInfo.format) ? (
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <video
                                        controls
                                        src={fileInfo.url}
                                        className="max-w-full h-auto rounded-lg mx-auto"
                                        onError={() => setError('Unable to load video. Invalid format or corrupted file.')}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ) : isAudio(fileInfo.format) ? (
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <audio
                                        controls
                                        src={fileInfo.url}
                                        className="w-full"
                                        onError={() => setError('Unable to load audio. Invalid format or corrupted file.')}
                                    >
                                        Your browser does not support the audio tag.
                                    </audio>
                                </div>
                            ) : isPDF(fileInfo.format) ? (
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600 max-h-[80vh] overflow-y-auto">
                                    <div ref={canvasRef} className="w-full">
                                        <p className="text-center text-gray-500 dark:text-gray-400 italic">Loading PDF...</p>
                                    </div>
                                </div>
                            ) : isOffice(fileInfo.format) ? (
                                <div className="bg-gray-100 dark:bg-gray-700 p-2 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="w-full h-64 sm:h-96 lg:h-[80vh]">
                                        <iframe
                                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileInfo.url)}`}
                                            className="w-full h-full border-none rounded"
                                            title="Office File Preview"
                                            onError={() => setError('Unable to load Office file. Invalid format or corrupted file.')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-blue-50 dark:bg-blue-900/50 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-center">
                                    <p className="font-medium mb-2">File format not supported for preview.</p>
                                    <p>Use the download button to access the file.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Empty state when no file */}
                    {!fileInfo && !error && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-8 text-center">
                            <div className="text-gray-400 dark:text-gray-500 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No File Selected</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">Enter a file code to view and download files</p>
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="lg:hidden inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold space-x-2 transition-colors"
                            >
                                <span className="text-lg">🔍</span>
                                <span>Enter Code</span>
                            </button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default ViewPage;