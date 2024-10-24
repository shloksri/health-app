import React, { useState, useContext } from 'react';
import { databases } from '../appwrite/config';
import { AuthContext } from '../context/AuthContext';

const MoodTracker = () => {
    const [mood, setMood] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        const promise = databases.createDocument(
            '[DATABASE_ID]',
            '[COLLECTION_ID]',
            'unique()',
            { userId: user.$id, mood, date: new Date().toISOString() }
        );

        promise.then(function (response) {
            console.log('Mood saved!', response);
        }, function (error) {
            console.log(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="anxious">Anxious</option>
            </select>
            <button type="submit">Submit Mood</button>
        </form>
    );
};

export default MoodTracker;
