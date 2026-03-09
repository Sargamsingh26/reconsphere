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
        print(f"Resolved {domain} ➝ {ip}")
        return ip
    except socket.gaierror:
        print(f"Failed to resolve IP for {domain}")
        return None

def save_port_scan(domain: str, data: dict):
    """
    Saves port scan results in a JSON file.
    """
    domain_folder = os.path.join(RESULTS_DIR, domain)
    os.makedirs(domain_folder, exist_ok=True)  # Ensure folder exists

    file_path = os.path.join(domain_folder, f"{domain}_port_scan.json")

    # Prevent duplicate saves
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)

        if existing_data == data:
            print(f"Port scan data already exists for {domain}, skipping save.")
            return

    # Save JSON data
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    print(f"Port scan results saved: {file_path}")

def scan_ports(domain: str):
    """
    Scans the open ports of a given domain or IP using ViewDNS API.
    """
    url = f"https://api.viewdns.info/portscan/?host={domain}&apikey={VIEWDNS_API_KEY}&output=json"

    response = requests.get(url)
    print(f"Scanning open ports for {domain} - Status Code: {response.status_code}")

    try:
        data = response.json()
        save_port_scan(domain, data)
        return data
    except requests.exceptions.JSONDecodeError:
        print(f"Failed to decode port scan data for {domain}")
        return {"error": "Invalid JSON response", "response_text": response.text}

# Example usage
if __name__ == "__main__":
    domain_name = input("Enter domain or IP for port scan (e.g., example.com or 192.168.1.1): ").strip()
    scan_ports(domain_name)
