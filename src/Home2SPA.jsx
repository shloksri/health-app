import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import Resources from './components/Resources';

const Home2 = () => {
    const { user, logout } = useContext(AuthContext);

    // if (!user) {
    //     return <Login />;
    // }

    return (
        <Router>
            <div className="app-container">
                <header>
                    <h1>Welcome to Mental Wellness App</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/mood-tracker">Mood Tracker</Link>
                            </li>
                            <li>
                                <Link to="/journal">Journal</Link>
                            </li>
                            <li>
                                <Link to="/resources">Resources</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/mood-tracker" element={<MoodTracker />} />
                        <Route path="/journal" element={<Journal />} />
                        <Route path="/resources" element={<Resources />} />
                        {/* Redirect to Mood Tracker by default */}
                        <Route path="/" element={<Navigate to="/mood-tracker" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default Home2;
