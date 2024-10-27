import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import journalsData from '../assets/journals.json';
import moods from '../assets/moods.json';
import './YourJournal.css';

const YourJournal = () => {
    const navigate = useNavigate();

    // UseEffect to set mood if redirected from MoodTracker
    const [mood, setMood] = useState('');
    const [content, setContent] = useState("");
    const [isMoodDisabled, setIsMoodDisabled] = useState(false);

    useEffect(() => {
        const storedMood = localStorage.getItem('selectedMood');
        if (storedMood) {
            setMood(storedMood);
            setIsMoodDisabled(true); // Disable mood selection if coming from MoodTracker
        }
    }, []); // Run once when the component mounts

    const handleSubmit = (e) => {
        e.preventDefault();

        const newJournalID = `journal_${journalsData.length + 1}`;
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString();
        const time = currentDate.toLocaleTimeString();
        const moodIDGenerated = localStorage.getItem('moodID') || `${mood.toLowerCase()}_${date.replaceAll("/", "")}_${time.replaceAll(":", "")}`;

        const newJournal = {
            username: "user1",
            journalID: newJournalID,
            moodID: moodIDGenerated,
            mood,
            date,
            time,
            content
        };

        journalsData.push(newJournal);

        // Clear moodID and selectedMood from localStorage after submission
        localStorage.removeItem('selectedMood');
        localStorage.removeItem('moodID');

        navigate('/journals');
    };

    return (
        <div className="your-journal-container">
            <form onSubmit={handleSubmit} className="journal-form">
                <label>Mood:</label>
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    disabled={isMoodDisabled} // Disable if mood is set from MoodTracker
                >
                    <option value="" disabled>Select your mood</option>
                    {moods.map(m => (
                        <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                </select>

                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write about your day..."
                ></textarea>

                <button type="submit" className="save-journal-btn">Save your Journal</button>
            </form>
        </div>
    );
};

export default YourJournal;
