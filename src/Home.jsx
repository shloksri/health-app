import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Resources from './components/Resources';

const App = () => {
    const { user, logout } = useContext(AuthContext);

    // if (!user) {
    //     return <Login />;
    // }

    return (
        <div className="app-container">
            <header>
                <h1>Welcome to Mental Wellness App</h1>
                <button onClick={logout}>Logout</button>
            </header>

            <main>
                <section>
                    <h2>Mood Tracker</h2>
                    <MoodTracker />
                </section>

                <section>
                    <h2>Your Journal</h2>
                    <Journal />
                </section>

                <section>
                    <h2>Resources</h2>
                    <Resources />
                </section>
            </main>
        </div>
    );
};

export default App;
