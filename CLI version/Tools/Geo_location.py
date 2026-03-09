import requests
import os
import json
import socket
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GEOLOCATION_API_KEY = os.getenv("WHOIS_API_KEY")  # API Key from .env
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of script
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # Results directory

def get_ip_from_domain(domain: str):
    """
    Converts domain name to IP address using socket.gethostbyname()
    """
    try:
        ip_address = socket.gethostbyname(domain)
        print(f"Resolved {domain} -> {ip_address}")
        return ip_address
    except socket.gaierror:
        print(f"Failed to resolve domain: {domain}")
        return None

def save_geolocation_data(domain: str, data: dict):
    """
    Saves geolocation data in the correct results folder.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_geolocation.json")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
        
        if existing_data == data:
            print(f"Geolocation data already exists for {domain}, skipping save.")
            return

    # Save JSON data
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f" Geolocation data saved: {file_path}")

def fetch_geolocation_data(domain: str):
    """
    Fetches geolocation data for a domain's IP address using WhoisXML API.
    """
    ip_address = get_ip_from_domain(domain)
    if not ip_address:
        return {"error": "Could not resolve domain to IP"}

    url = f"https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey={GEOLOCATION_API_KEY}&ipAddress={ip_address}"

    response = requests.get(url)
    print(f" Fetching Geolocation data for {domain} - Status Code: {response.status_code}")

    try:
        data = response.json()
        save_geolocation_data(domain, data)
        return data
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode JSON for {domain}")
        return {"error": "Invalid JSON response", "response_text": response.text}

# Example usage
if __name__ == "__main__":
    domain = input("Enter the domain (e.g., google.com): ").strip()
    fetch_geolocation_data(domain)
