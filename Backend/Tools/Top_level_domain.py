import requests
import os
import json
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.getenv("WHOIS_API_KEY")  # .env file se API key load karna
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Script ka base directory
RESULTS_DIR = os.path.join(BASE_DIR, "..", "results")  # JSON results store karne ka directory


def clean_domain(domain: str) -> str:
    """
    Domain name se TLD (.in, .com, etc.) hata kar sirf primary part return karega aur * lagata hai.
    """
    primary_part = domain.split(".")[0]
    return f"*{primary_part}.*"


def save_result(domain: str, data: dict):
    """
    API response ko results directory ke andar ek unique folder (domain name) me save karega.
    """
    cleaned_domain = domain.split(".")[0]  # Folder name ke liye clean domain
    domain_folder = os.path.join(RESULTS_DIR, cleaned_domain)
    os.makedirs(domain_folder, exist_ok=True)  # Folder create karo agar exist nahi karta

    file_path = os.path.join(domain_folder, "top_level_domain.json")
    
    # Agar file already exist karti hai, duplicate na ho iske liye check karna
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
        
        if existing_data == data:
            print("Data already exists, skipping save.")
            return
    
    # Filter karke sirf valid TLDs save karo
    valid_domains = filter_valid_tlds(cleaned_domain, data.get("domainsList", data.get("domains", [])))

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump({"domainsList": valid_domains}, f, indent=4)

    print(f"Saved results to {file_path}")


def hit_whois_api(domain: str):
    """
    Given domain name ko clean karke API request bhejta hai.
    """
    cleaned_domain = clean_domain(domain)
    url = "https://domains-subdomains-discovery.whoisxmlapi.com/api/v1"  # Check if this is the correct API endpoint
    
    payload = {
        "apiKey": API_KEY,
        "domains": {
            "include": [cleaned_domain]
        }
    }
    
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    
    print("Status Code:", response.status_code)
    print("Response Text:", response.text)  # Debugging ke liye response dekho
    
    try:
        data = response.json()
        save_result(domain, data)
        return data
    except requests.exceptions.JSONDecodeError:
        return {"error": "Invalid JSON response", "response_text": response.text}


def filter_valid_tlds(cleaned_domain: str, all_domains: list):
    """
    Sirf valid TLDs ko filter karega (amazon.com, amazon.in etc.)
    """
    # Ye regex sirf domains ko allow karega jisme "amazon." ke baad sirf TLD hoga
    tld_regex = re.compile(rf"^{cleaned_domain}\.[a-zA-Z]+$")

    valid_tlds = [d for d in all_domains if tld_regex.match(d)]
    
    return valid_tlds


def get_top_level_domains(main_domain: str):
    """
    Reads top_level_domain.json and returns a list of valid TLDs for the given main domain.
    """
    cleaned_domain = main_domain.split(".")[0]  # Extract base domain (e.g., 'amazon' from 'amazon.in')
    domain_path = os.path.join(RESULTS_DIR, cleaned_domain, "top_level_domain.json")

    if not os.path.exists(domain_path):
        print(f"top_level_domain.json not found for {main_domain} at {domain_path}")
        return []

    with open(domain_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    return data.get("domainsList", [])


# Example Usage:
if __name__ == "__main__":
    domain_name = "myeasytax.in"
    
    # Fetch TLDs from API if not already saved
    result = hit_whois_api(domain_name)

    # Fetch valid TLDs from saved JSON file
    valid_domains = get_top_level_domains(domain_name)
    
    print("\nValid Top-Level Domains:")
    print(valid_domains)
