import React from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileImage, FaFileVideo, FaFileAudio, FaPaperPlane, FaFolderOpen, FaGithub, FaEnvelope, FaShieldAlt, FaBolt, FaUsers } from 'react-icons/fa';

function Footer() {
    const supportedFormats = [
        { name: 'PDF', icon: FaFilePdf, color: 'text-red-500 dark:text-red-400' },
        { name: 'DOCX', icon: FaFileWord, color: 'text-blue-500 dark:text-blue-400' },
        { name: 'XLSX', icon: FaFileExcel, color: 'text-green-600 dark:text-green-400' },
        { name: 'PPTX', icon: FaFilePowerpoint, color: 'text-orange-500 dark:text-orange-400' },
        { name: 'Audio', icon: FaFileAudio, color: 'text-yellow-600 dark:text-yellow-400' },
        { name: 'Image', icon: FaFileImage, color: 'text-purple-500 dark:text-purple-400' },
        { name: 'Video', icon: FaFileVideo, color: 'text-pink-500 dark:text-pink-400' },
        { name: '+30 More', icon: FaFileImage, color: 'text-gray-600 dark:text-gray-400' },
    ];

    const quickLinks = [
        { name: 'Send File', icon: FaPaperPlane, href: '/' },
        { name: 'Open File', icon: FaFolderOpen, href: '/view' },
        { name: 'GitHub', icon: FaGithub, href: 'https://github.com/Kdz198/FileWave' },
        { name: 'Contact', icon: FaEnvelope, href: 'https://github.com/Kdz198' },
    ];

    const features = [
        { name: 'Secure Transfer', icon: FaShieldAlt, description: 'End-to-end encryption' },
        { name: 'Lightning Fast', icon: FaBolt, description: 'Optimized for speed' },
        { name: 'Easy Sharing', icon: FaUsers, description: 'Share with anyone' },
    ];

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 w-full relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                         animation: 'drift 20s linear infinite'
                     }}>
                </div>
            </div>

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
                {/* Main content grid - More flexible responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 xl:gap-8">

                    {/* Brand & Description - Hidden on mobile and tablet, only show on desktop */}
                    <div className="hidden lg:block xl:col-span-1 space-y-4 sm:space-y-6">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-lg sm:text-xl">📁</span>
                                </div>
                                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">FileWave</span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                                Secure and fast file transfers for everyone.
                                Share files effortlessly with advanced encryption and lightning-fast speeds.
                            </p>
                        </div>

                        {/* Key features */}
                        <div className="space-y-2 sm:space-y-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex items-start space-x-3 group">
                                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 mt-0.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">{feature.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-500">{feature.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Supported Formats - Spans full width on mobile/tablet */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 space-y-4 sm:space-y-6">
                        <div className="text-center">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">Supported File Formats</h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">We support all major file types</p>
                        </div>

                        {/* File format grid - More responsive breakpoints */}
                        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                            {supportedFormats.map((format) => (
                                <div key={format.name}
                                     className="group bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white dark:hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 shadow-sm hover:shadow-md">
                                    {format.name === '+30 More' ? (
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 sm:mb-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                                            <span className="text-xs sm:text-xs lg:text-xs">+30</span>
                                        </div>
                                    ) : (
                                        <format.icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 sm:mb-2 ${format.color} group-hover:scale-110 transition-transform`} />
                                    )}
                                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors block truncate">
                                        {format.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Stats - Improved mobile spacing */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
                            <div className="text-center">
                                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">6GB</div>
                                <div className="text-xs text-gray-500 dark:text-gray-500">Max file size</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                                <div className="text-xs text-gray-500 dark:text-gray-500">Downloads per file</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">21</div>
                                <div className="text-xs text-gray-500 dark:text-gray-500">Days storage</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links - Full width on mobile */}
                    <div className="col-span-1 md:col-span-1 xl:col-span-1 space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Quick Access</h3>
                            {/* Mobile: 2 columns, Desktop: 1 column */}
                            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 gap-2 sm:gap-3 xl:gap-0 xl:space-y-3">
                                {quickLinks.map((link) => (
                                    <div key={link.name} className="xl:block">
                                        <a href={link.href}
                                           className="group flex items-center space-x-2 sm:space-x-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 w-full">
                                            <link.icon className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                                            <span className="text-xs sm:text-sm font-medium truncate">{link.name}</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section - Improved mobile layout */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800/50">
                    <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 text-center lg:text-left">
                            Copyright © 2025 - Hoang Tu Gio. All rights reserved.
                        </div>
                        <div className="flex items-center justify-center lg:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms</a>
                            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Support</a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes drift {
                    0% { transform: translateX(-50px); }
                    100% { transform: translateX(50px); }
                }
            `}</style>
        </footer>
    );
}

export default Footer;