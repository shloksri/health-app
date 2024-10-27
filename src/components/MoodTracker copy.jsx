import React, { useState } from 'react';
import './MoodTracker.css';

// List of moods and one-liners
const moods = [
    { name: "Happy", message: "That's wonderful! What's bringing you joy today?" },
    { name: "Sad", message: "Sorry to hear that. Let us know why." },
    { name: "Anxious", message: "Take a deep breath. Want to share what's on your mind?" },
    { name: "Angry", message: "It's okay to feel this way. Feel free to vent here." },
    { name: "Neutral", message: "A balanced day? Reflect on what made it so." },
    { name: "Excited", message: "That's exciting! What's making you feel pumped?" },
    { name: "Tired", message: "Running low on energy? Let's see what's been tiring you out." },
    { name: "Grateful", message: "That's a beautiful feeling. Want to jot down what you're thankful for?" },
    { name: "Lonely", message: "Feeling alone? We're here for you. Let's talk about it." },
    { name: "Stressed", message: "Tough day? Feel free to unload your thoughts here." },
    { name: "Hopeful", message: "That's great! What's giving you hope today?" },
    { name: "Confused", message: "Lost in thought? Share what's puzzling you." },
    { name: "Content", message: "Contentment is lovely. What's keeping you balanced?" },
    { name: "Bored", message: "Looking for something more? Let's reflect on today." },
    { name: "Inspired", message: "Feeling inspired? Write down what sparked this energy." },
    { name: "Overwhelmed", message: "Feeling swamped? Let's take a moment to unpack things." },
    { name: "Proud", message: "Pride in yourself is powerful! What accomplishment made your day?" },
    { name: "Guilty", message: "It's okay to feel this way. Share what's weighing on you." },
    { name: "Relieved", message: "A weight lifted? Share what's bringing you peace." },
    { name: "Frustrated", message: "Rough day? Vent it out here if you'd like." }
];

const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState('');
    const [oneLiner, setOneLiner] = useState('');
    const [reason, setReason] = useState('');
    const [journal, setJournal] = useState(false);

    const handleMoodChange = (e) => {
        const mood = e.target.value;
        setSelectedMood(mood);
        const selectedMoodObject = moods.find((m) => m.name === mood);
        setOneLiner(selectedMoodObject ? selectedMoodObject.message : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDateTime = new Date();
        const date = currentDateTime.toLocaleDateString();
        const time = currentDateTime.toLocaleTimeString();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const message = `Mood: ${selectedMood}\nDate: ${date}\nTime: ${time}\nTime Zone: ${timeZone}`;

        if (journal) {
            alert(`You will now be redirected to your journal.`);
            window.location.href = '/your-journals';
        } else {
            alert(`Mood submitted successfully!\n\n${message}`);
        }

        setSelectedMood('');
        setOneLiner('');
        setReason('');
        setJournal(false);
    };

    return (
        <div className="mood-tracker">
            <header className="privacy-header">Your data is private and will not be shared with anyone.</header>

            <form onSubmit={handleSubmit}>

                {/* Mood Selection */}
                <div className="form-group">
                    <label htmlFor="mood">Select Your Mood:</label>
                    <select id="mood" value={selectedMood} onChange={handleMoodChange} className="mood-dropdown">
                        <option value="">--Select Mood--</option>
                        {moods.map((mood) => (
                            <option key={mood.name} value={mood.name}>{mood.name}</option>
                        ))}
                    </select>
                </div>

                {/* One-liner Display */}
                <div className="one-liner">
                    <p>{oneLiner}</p>
                </div>

                {/* Reason Input */}
                <div className="form-group">
                    <label htmlFor="reason">Reason for your mood:</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Write a brief reason..."
                        rows="3"
                        className="reason-input"
                    />
                </div>

                {/* Journal Option */}
                <div className="form-group">
                    <label>Would you like to write a journal about this?</label>
                    <div className="journal-option">
                        <input
                            type="checkbox"
                            id="journal"
                            checked={journal}
                            onChange={(e) => setJournal(e.target.checked)}
                        />
                        <label htmlFor="journal">Yes</label>
                    </div>
                    {journal && <p className="journal-note">You will be redirected to your journal page after submission.</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button">Submit Mood</button>
            </form>
        </div>
    );
};

export default MoodTracker;
