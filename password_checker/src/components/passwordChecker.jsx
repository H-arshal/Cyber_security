import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import "./passwordChecker.css"; 
import { FaMoon, FaSun } from "react-icons/fa"; 

function PasswordChecker() {
    const strengthLevels = ["Very Weak", "Weak", "Better", "Medium", "Strong"];
    const [password, setPassword] = useState("");
    const [score, setScore] = useState(0);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true"; // Save theme in localStorage
    });

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    function passwordUpdate(event) {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setScore(zxcvbn(newPassword).score);
    }

    function toggleTheme() {
        setDarkMode((prevMode) => !prevMode);
    }

    // Strength colors
    const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];

    return (
        <div className={`password-container ${darkMode ? "dark" : "light"}`}>
            {/* Toggle Switch */}
            <div className="toggle-container">
                <input 
                    type="checkbox" 
                    className="checkbox" 
                    id="checkbox" 
                    checked={darkMode} 
                    onChange={toggleTheme} 
                />
                <label htmlFor="checkbox" className="checkbox-label">
                    <FaMoon className="icon" />
                    <FaSun className="icon" />
                    <span className="ball"></span>
                </label>
            </div>

            <div className="password-box">
                <h2>Password Strength Checker</h2>
                <label htmlFor="pass">Enter Your Password:</label>
                <input
                    name="pass"
                    type="password"
                    onChange={passwordUpdate}
                    value={password}
                    placeholder="Type your password..."
                />
                <p className="password-text">
                    <strong>Your Password:</strong> {password || "..."}
                </p>
                <div 
                    className="strength-box" 
                    style={{ backgroundColor: strengthColors[score] }}>
                    Password Strength: {strengthLevels[score]}
                </div>
            </div>
        </div>
    );
}

export default PasswordChecker;
