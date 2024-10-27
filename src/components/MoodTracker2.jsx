import React, { useState } from 'react';
import moodsData from './moods.json';
import './MoodTracker.css';
import { useNavigate } from 'react-router-dom';

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState('');
    const [reason, setReason] = useState('');
    const [isJournal, setIsJournal] = useState(false);
    const [moodMessage, setMoodMessage] = useState('');
    const navigate = useNavigate();

    const handleMoodChange = (e) => {
        const mood = e.target.value;
        setSelectedMood(mood);
        const moodEntry = moodsData.find(m => m.mood === mood);
        setMoodMessage(moodEntry ? moodEntry.oneLiner : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get current date and time
        const now = new Date();
        const date = now.toLocaleDateString('en-GB').replace(/\//g, '');
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }).replace(':', '');

        // Generate moodID
        const moodID = `${selectedMood.toLowerCase()}_${date}_${time}`;

        // Save the moodID somewhere (local storage, context, or state)
        localStorage.setItem('moodID', moodID); // Saving to local storage as an example

        // Prepare to submit the data
        const moodData = {
            moodID: moodID,
            mood: selectedMood,
            reason: reason,
            date: now.toDateString(),
            time: now.toLocaleTimeString(),
        };

        // Simulate saving to JSON (you'll need to implement actual saving to backend)
        console.log("Mood Data Submitted: ", moodData);

        if (isJournal) {
            navigate('/your-journal'); // Redirect to YourJournal component
        } else {
            // Optionally reset the form
            setSelectedMood('');
            setReason('');
            setIsJournal(false);
            setMoodMessage('');
        }
    };

    return (
        <div className="mood-tracker-container">
            <h2>How are you feeling today?</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="mood">Select your mood:</label>
                <select id="mood" value={selectedMood} onChange={handleMoodChange}>
                    <option value="">--Select Mood--</option>
                    {moodsData.map((mood, index) => (
                        <option key={index} value={mood.mood}>
                            {mood.mood}
                        </option>
                    ))}
                </select>

                <div className="mood-message">
                    {moodMessage}
                </div>

                <label htmlFor="reason">Why are you feeling this way?</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Write your reason here..."
                />

                <label>
                    <input
                        type="checkbox"
                        checked={isJournal}
                        onChange={() => setIsJournal(!isJournal)}
                    />
                    Would you like to write a journal about this?
                </label>

                <button type="submit">Submit Mood</button>
            </form>

            <div className="privacy-notice">
                <p>Your data is completely private and will not be shared with anyone.</p>
            </div>
        </div>
    );
};

export default MoodTracker;
