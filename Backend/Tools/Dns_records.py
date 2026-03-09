import requests
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

VIEWDNS_API_KEY = os.getenv("VIEWDNS_API_KEY")  # API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def save_dns_records(domain: str, data: dict):
    """
    Saves the DNS records details in a JSON file inside the results folder.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_dns_records.json")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)

        if existing_data == data:
            print(f"DNS records already exist for {domain}, skipping save.")
            return

    # Save JSON data
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f"DNS records details saved: {file_path}")

def fetch_dns_records(domain: str):
    """
    Fetches DNS records details of the given domain using ViewDNS API.
    """
    url = f"https://api.viewdns.info/dnsrecord/?domain={domain}&apikey={VIEWDNS_API_KEY}&output=json"

    response = requests.get(url)
    print(f"Fetching DNS records for {domain} - Status Code: {response.status_code}")

    try:
        data = response.json()
        save_dns_records(domain, data)
        return data
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode DNS record data for {domain}")
        return {"error": "Invalid JSON response", "response_text": response.text}

# Example usage
if __name__ == "__main__":
    domain = input("Enter the domain (e.g., google.com): ").strip()
    fetch_dns_records(domain)
