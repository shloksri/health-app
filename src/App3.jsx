import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoodTracker from './components/MoodTracker';
import { MoodProvider } from './context/MoodContext';
import Journals from './components/Journals';
import Resources from './components/Resources';
import Reminders from './components/Reminders';
import YourJournal from './components/YourJournal'
import ViewYourJournal from './components/ViewYourJournal'
import Home3 from "./Home3";
import './index.css';

const App3 = () => {
    return (
        <MoodProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home3 />} />
                    <Route path="/mood-tracker" element={<MoodTracker />} />
                    <Route path="/your-journal/:moodID" component={YourJournal} />
                    <Route path="/journals" element={<Journals />} />
                    <Route path="/journals/new" element={<YourJournal />} />
                    <Route path="/journals/:journalID" element={<ViewYourJournal />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/reminders" element={<Reminders />} />
                </Routes>
            </Router>
        </MoodProvider>
    )


};

export default App3;
