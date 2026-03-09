import requests
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def save_robots_txt(domain: str, data: str):
    """
    Saves robots.txt data in a text file.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_robots.txt")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = f.read()

        if existing_data == data:
            print(f"Robots.txt already exists for {domain}, skipping save.")
            return

    # Save robots.txt data
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(data)

    print(f"Robots.txt saved: {file_path}")

def fetch_robots_txt(domain: str):
    """
    Fetches the robots.txt file of a given domain.
    """
    url = f"https://{domain}/robots.txt"
    
    try:
        response = requests.get(url, timeout=10)
        print(f"Fetching robots.txt for {domain} - Status Code: {response.status_code}")

        if response.status_code == 200:
            save_robots_txt(domain, response.text)
            return response.text
        else:
            print(f" Robots.txt not found for {domain} or access denied.")
            return None
    except requests.exceptions.RequestException as e:
        print(f" Error fetching robots.txt for {domain}: {e}")
        return None

# Example usage
if __name__ == "__main__":
    domain_name = input("Enter website domain for robots.txt lookup (e.g., example.com): ").strip()
    fetch_robots_txt(domain_name)
