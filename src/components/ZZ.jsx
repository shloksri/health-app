import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import moodsData from '../assets/moods.json';
import { MoodContext } from '../context/MoodContext';
import './MoodTracker.css';

const MoodTracker = () => {
    const navigate = useNavigate();
    const { setSelectedMood, setMoodID } = useContext(MoodContext);
    const [selectedMood, setMood] = useState('');
    const [reason, setReason] = useState('');
    const [showJournalPrompt, setShowJournalPrompt] = useState(false);
    const [oneLiner, setOneLiner] = useState('');

    useEffect(() => {
        if (selectedMood) {
            const mood = moodsData.find(m => m.id === selectedMood);
            if (mood) {
                setOneLiner(mood.description);
            }
        } else {
            setOneLiner('');
        }
    }, [selectedMood]);

    const handleMoodChange = (e) => {
        const newMood = e.target.value; // Get the new mood directly
        setMood(newMood);
        console.log("From dropdown - mood : ", newMood); // Log the new mood
        setShowJournalPrompt(false);
    };

    const handleCheckboxChange = () => {
        setShowJournalPrompt(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("From Submit - mood : ", selectedMood); // This will show the mood before submission

        const currentDate = new Date();
        const moodID = `${selectedMood}_${currentDate.toLocaleDateString('en-GB').replace(/\//g, '')}_${currentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }).replace(/:/g, '')}`;

        setSelectedMood(selectedMood);
        setMoodID(moodID);

        if (showJournalPrompt) {
            navigate('/journals/new', { state: { selectedMood } });
        } else {
            alert("Mood submitted without a journal.");
        }
    };

    return (
        <div className="mood-tracker-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="mood">Select your mood:</label>
                <select id="mood" value={selectedMood} onChange={handleMoodChange}>
                    <option value="">-- Select Mood --</option>
                    {moodsData.map(mood => (
                        <option key={mood.id} value={mood.id}>{mood.name}</option>
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
            </form>
        </div>
    );
};

export default MoodTracker;
