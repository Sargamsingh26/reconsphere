import requests
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SECURITYTRAILS_API_KEY = os.getenv("SECURITYTRAILS_API_KEY")  # API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def save_result(domain: str, subdomains: list):
    """
    Saves the list of subdomains in the correct results folder.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_subdomains.json")

    # Format fix: Properly format subdomains as `<subdomain>.<domain>`
    formatted_subdomains = [f"{sub}.{domain}" for sub in subdomains]

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(formatted_subdomains, f, indent=4)

    print(f"Subdomains saved: {file_path}")

def fetch_subdomains(domain: str):
    """
    Fetches subdomains for a given domain using SecurityTrails API.
    """
    url = f"https://api.securitytrails.com/v1/domain/{domain}/subdomains?children_only=false&include_inactive=false"
    headers = {
        "accept": "application/json",
        "APIKEY": SECURITYTRAILS_API_KEY
    }

    response = requests.get(url, headers=headers)
    print(f"Fetching subdomains for {domain} - Status Code: {response.status_code}")

    try:
        data = response.json()

        # Fix: Extract only the subdomains and format correctly
        subdomains = data.get("subdomains", [])  # Get subdomains list
        if subdomains:
            save_result(domain, subdomains)
        else:
            print("No subdomains found.")

        return subdomains
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode JSON for {domain}")
        return []

# Example usage
if __name__ == "__main__":
    domain = input("Enter the domain (e.g., amazon.com): ").strip()
    fetch_subdomains(domain)
