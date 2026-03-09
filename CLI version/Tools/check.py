import requests
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SECURITYTRAILS_API_KEY = os.getenv("SECURITYTRAILS_API_KEY")  # API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def get_top_level_domains(main_domain: str):
    """
    Reads top_level_domain.json and returns a list of TLDs for the given main domain.
    """
    cleaned_domain = main_domain.split(".")[0]  # Extract clean name (e.g., slrtdc from slrtdc.in)
    domain_path = os.path.join(RESULTS_DIR, cleaned_domain, "top_level_domain.json")

    if not os.path.exists(domain_path):
        print(f"top_level_domain.json not found for {main_domain} at {domain_path}")
        return []

    with open(domain_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Handle both possible key formats
    return data.get("domainsList", data.get("domains", []))

def save_result(domain: str, data: dict):
    """
    Saves API response data in the correct results folder, preventing duplicate saves.
    """
    cleaned_domain = domain.split(".")[0]  # Cleaned domain name (folder name)
    domain_folder = os.path.join(RESULTS_DIR, cleaned_domain, domain)

    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_subdomains.json")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
        
        if existing_data == data:
            print(f"Data already exists for {domain}, skipping save.")
            return
    
    # Save JSON data
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

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
        save_result(domain, data)
        return data
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode JSON for {domain}")
        return {"error": "Invalid JSON response", "response_text": response.text}

def fetch_all_subdomains(main_domain: str):
    """
    Fetches subdomains for all top-level domains in the given main domain's directory.
    """
    top_level_domains = get_top_level_domains(main_domain)
    
    if not top_level_domains:
        print("No top-level domains found.")
        return

    for domain_name in top_level_domains:
        fetch_subdomains(domain_name)

# Example usage
if __name__ == "__main__":
    main_domain = "amazon"  # This can be changed or taken as input
    fetch_all_subdomains(main_domain)
