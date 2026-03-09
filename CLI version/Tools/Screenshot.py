import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SCREENSHOT_API_KEY = os.getenv("WHOIS_API_KEY")  # API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def save_screenshot(domain: str, image_content: bytes):
    """
    Saves the full-page screenshot image in the correct results folder.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_full_screenshot.png")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        print(f" Full-page screenshot already exists for {domain}, skipping download.")
        return

    # Save image
    with open(file_path, "wb") as f:
        f.write(image_content)

    print(f"Full-page screenshot saved: {file_path}")

def fetch_full_screenshot(domain: str):
    """
    Fetches a full-page screenshot of the given domain using WhoisXML API.
    """
    url = (
        f"https://website-screenshot.whoisxmlapi.com/api/v1"
        f"?apiKey={SCREENSHOT_API_KEY}"
        f"&url=https://{domain}"
        f"&type=png"
        f"&fullPage=true"
        f"&width=1920"
        f"&height=1080"
        f"&scroll=1"
        f"&scrollPosition=bottom"
        f"&quality=90"
        f"&delay=500"
        f"&timeout=20000"
    )

    response = requests.get(url, stream=True)  # Stream the image data
    print(f"Fetching Full-Page Screenshot for {domain} - Status Code: {response.status_code}")

    if response.status_code == 200:
        save_screenshot(domain, response.content)
        return {"status": "success", "message": "Full-page screenshot saved"}
    else:
        print("Response text:", response.text)


# Example usage
if __name__ == "__main__":
    domain = input("Enter the domain (e.g., google.com): ").strip()
    fetch_full_screenshot(domain)
