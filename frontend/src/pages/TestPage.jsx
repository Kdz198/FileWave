import React from 'react';
import Header from '../pages/Header';
function TestPage() {

    return (
    <div>
        <Header/>

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="bg-blue-500 dark:bg-yellow-400 text-white dark:text-black p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Test Tailwind CSS</h1>
                <p className="text-lg">Toggle dark mode để kiểm tra nền và chữ đổi chưa.</p>
            </div>
        </div>

        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex items-center justify-center">
            <p className="text-2xl">🌞 Light / 🌙 Dark</p>
        </div>

    </div>
    );
}

export default TestPage;