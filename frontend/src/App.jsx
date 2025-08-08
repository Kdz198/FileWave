import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ViewPage from './pages/ViewPage';
import TestPage from './pages/TestPage';

function App() {
    return (
        <Router>
            <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
                <Routes>
                    <Route path="/" element={<UploadPage />} />
                    <Route path="/view" element={<ViewPage />} />
                    <Route path="/test" element={<TestPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;