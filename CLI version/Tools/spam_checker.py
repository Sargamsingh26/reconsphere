import requests
import os
import json
import socket
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

VIEWDNS_API_KEY = os.getenv("VIEWDNS_API_KEY")  # API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def get_ip_from_domain(domain: str):
    """
    Resolves domain to IP address.
    """
    try:
        ip = socket.gethostbyname(domain)
        print(f" Resolved {domain} ➝ {ip}")
        return ip
    except socket.gaierror:
        print(f"Failed to resolve IP for {domain}")
        return None

def save_spam_check(domain: str, ip: str, data: dict):
    """
    Saves spam blacklist details in a JSON file inside the results folder.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_spam_check.json")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)

        if existing_data == data:
            print(f"Spam check data already exists for {domain} ({ip}), skipping save.")
            return

    # Save JSON data
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f"Spam check details saved: {file_path}")

def check_spam_blacklist(domain: str):
    """
    Checks if the given domain's IP is listed in spam databases using ViewDNS API.
    """
    ip = get_ip_from_domain(domain)
    if not ip:
        return {"error": f"Could not resolve IP for {domain}"}

    url = f"https://api.viewdns.info/spamdblookup/?ip={ip}&apikey={VIEWDNS_API_KEY}&output=json"

    response = requests.get(url)
    print(f" Checking spam status for {domain} ({ip}) - Status Code: {response.status_code}")

    try:
        data = response.json()
        save_spam_check(domain, ip, data)
        return data
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode spam check data for {domain} ({ip})")
        return {"error": "Invalid JSON response", "response_text": response.text}

# Example usage
if __name__ == "__main__":
    domain_name = input("Enter the domain (e.g., example.com): ").strip()
    check_spam_blacklist(domain_name)
