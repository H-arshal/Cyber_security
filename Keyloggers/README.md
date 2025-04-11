# 🛡️ Keylogger

A simple Cybersecurity Awareness Tool built using Python and Electron.js to demonstrate how keyloggers can capture keystrokes. The primary goal is to educate users about this type of threat.

> ⚠️ **Important:** This tool is strictly for **educational purposes only**. Do not use it for any unauthorized or malicious activities.

---

## 🤝 Let’s Connect

📍 **LinkedIn**: [Harshal Moon](https://www.linkedin.com/in/harshal-moon-064956174/)  
🌐 **Portfolio**: [Portfolio](https://harshal-portfolio-5mbz.onrender.com/)

##

## 🎯 Purpose

- Demonstrate the functionality of a basic keylogger in a controlled environment.
- Raise awareness about cybersecurity threats like keylogging.
- Encourage safer computing habits.

---

## 🧠 How It Works

1.  **Python Keylogger (`python-logger/keylogger.py`):**
    - Uses the `pynput` library to capture keyboard inputs.
    - Logs keystrokes with timestamps to the `logs/keylog.txt` file.
2.  **Electron Awareness UI (`electron-app/`):**
    - Displays a simple desktop window alerting the user that keystroke logging is active for the demonstration.

---

## 🛠️ Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/yourusername/keylogger-awareness-tool.git](https://github.com/yourusername/keylogger-awareness-tool.git)
    cd keylogger-awareness-tool
    ```

    _(Replace `yourusername` with your actual GitHub username)_

2.  **Set Up and Run Python Keylogger:**
    `bash
    cd python-logger
    pip install pynput
    python keylogger.py
    ` \* Keystrokes will now be logged to `logs/keylog.txt`.
    a
3.  **Set Up and Run Electron Awareness App:**
    ```bash
    cd ../electron-app
    npm install
    npm start
    ```
    - A warning window will appear on your desktop.

---

## 📦 Technologies Used

- Python (`pynput`)
- Electron.js
- Node.js & npm

---

## ⚖️ License

This project is licensed under the MIT License.

---

## ❗ Legal Disclaimer

This tool is intended solely for educational and ethical demonstration purposes. Misuse of this tool for unauthorized monitoring is illegal and unethical. Always obtain explicit consent before running such software on any system. The author assumes no responsibility for any misuse of this tool.
