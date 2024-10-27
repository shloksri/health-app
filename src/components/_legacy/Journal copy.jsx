import React, { useState, useContext, useEffect } from 'react';
import { databases } from '../../appwrite/config';
import { AuthContext } from '../../context/AuthContext';

const Journal = () => {
    const [entry, setEntry] = useState('');
    const [journalEntries, setJournalEntries] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getEntries = async () => {
            if (!user) return;
            const response = await databases.listDocuments(
                '[DATABASE_ID]',
                '[COLLECTION_ID]',
                [`userId=${user.$id}`]
            );
            setJournalEntries(response.documents);
        };
        getEntries();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        const promise = databases.createDocument(
            '[DATABASE_ID]',
            '[COLLECTION_ID]',
            'unique()',
            { userId: user.$id, entry, date: new Date().toISOString() }
        );

        promise.then((response) => {
            setJournalEntries([...journalEntries, response]);
            setEntry('');
        }).catch((error) => console.error(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Write your thoughts here..."
                />
                <button type="submit">Add Entry</button>
            </form>

            <h3>Your Journal Entries</h3>
            <ul>
                {journalEntries.map((entry) => (
                    <li key={entry.$id}>
                        {entry.entry} - {new Date(entry.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Journal;
