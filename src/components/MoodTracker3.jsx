
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import moodsData from '../assets/moods.json';
import './MoodTracker.css';

const MoodTracker = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [selectedMood, setSelectedMood] = useState('');
    const [reason, setReason] = useState('');
    const [showJournalPrompt, setShowJournalPrompt] = useState(false);
    const [oneLiner, setOneLiner] = useState('');

    useEffect(() => {
        if (selectedMood) {
            const mood = moodsData.find(mood => mood.id === selectedMood);
            if (mood) {
                setOneLiner(mood.description);
            }
        } else {
            setOneLiner('');
        }
    }, [selectedMood]);

    const handleMoodChange = (e) => {
        setSelectedMood(e.target.value);
        setShowJournalPrompt(false); // Reset journal prompt when mood changes
    };

    const handleCheckboxChange = () => {
        setShowJournalPrompt(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const moodID = `${selectedMood}_${currentDate.toLocaleDateString('en-GB').replace(/\//g, '')}_${currentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '')}`;

        localStorage.setItem('selectedMood', selectedMood);  // Store selected mood
        localStorage.setItem('moodID', moodID);  // Store moodID

        const submittedData = {
            moodID,
            selectedMood,
            reason,
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString(),
            timezone
        };

        console.log(submittedData); // This will later be used to save data

        if (showJournalPrompt) {
            navigate(`/journals/new`); // Redirect to YourJournal with moodID
        } else {
            // Handle case when journal is not created, maybe alert user
            alert("Mood submitted without a journal.");
        }
    };

    return (
        <div className="mood-tracker-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="mood">Select your mood:</label>
                <select id="mood" value={selectedMood} onChange={handleMoodChange}>
                    <option value="">-- Select Mood --</option>
                    {moodsData.map((mood) => (
                        <option key={mood.id} value={mood.id}>
                            {mood.name}
                        </option>
                    ))}
                </select>

                <div className="one-liner">{oneLiner}</div>

                <label htmlFor="reason">Why do you feel this way?</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Write your reason here..."
                />

                <label>
                    <input
                        type="checkbox"
                        checked={showJournalPrompt}
                        onChange={handleCheckboxChange}
                    />
                    Would you like to write a journal about this?
                </label>

                <button type="submit">Submit Mood</button>

                <div className="privacy-notice">
                    All your entries are completely private and will not be shared with anyone.
                </div>
            </form>
        </div>
    );
};

export default MoodTracker;
