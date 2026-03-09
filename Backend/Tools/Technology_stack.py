import requests
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GENELIFY_API_KEY = os.getenv("GENELIFY_API_KEY")  # Genelify API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def save_technology_stack(domain: str, data: dict):
    """
    Saves technology stack results in a JSON file.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_tech_stack.json")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)

        if existing_data == data:
            print(f"Technology stack data already exists for {domain}, skipping save.")
            return

    # Save JSON data
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f"Technology stack results saved: {file_path}")

def check_technology_stack(domain: str):
    """
    Checks the technology stack of a given domain using Genelify API.
    """
    url = "https://www.genelify.com/api/v1/technology-lookup"
    headers = {
        "X-GENELIFY-API-KEY": GENELIFY_API_KEY
    }
    params = {"url": f"https://{domain}"}

    response = requests.get(url, headers=headers, params=params)
    print(f"Checking technology stack for {domain} - Status Code: {response.status_code}")

    try:
        data = response.json()
        save_technology_stack(domain, data)
        return data
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode technology stack data for {domain}")
        return {"error": "Invalid JSON response", "response_text": response.text}

# Example usage
if __name__ == "__main__":
    domain_name = input("Enter website domain for technology stack lookup (e.g., example.com): ").strip()
    check_technology_stack(domain_name)
