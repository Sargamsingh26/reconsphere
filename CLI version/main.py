import sys
import os
import re


# PATH SETUP
sys.path.append(os.path.join(os.path.dirname(__file__), "Tools"))

# IMPORT ALL TOOL FUNCTIONS (16)
from whois_info import fetch_whois_data
from Whois_history import fetch_whois_history
from Web_category import fetch_website_category
from Top_level_domain import hit_whois_api
from Technology_stack import check_technology_stack
from subdomains import fetch_subdomains
from SSL_certificate import fetch_ssl_certificate
from spam_checker import check_spam_blacklist
from Robots_txt import fetch_robots_txt
from Ip_ports import scan_ports
from Geo_location import fetch_geolocation_data
from domain_reputation import fetch_reputation_data
from Dns_records import fetch_dns_records
from Screenshot import fetch_full_screenshot
from Historical_ip import fetch_ip_history
from check import fetch_all_subdomains


# DOMAIN VALIDATION
def is_valid_domain(domain: str) -> bool:
    pattern = r"^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
    return re.match(pattern, domain) is not None


# TOOL REGISTRY (16 TOOLS)
TOOLS = {
    "1": ("WHOIS Information", fetch_whois_data),
    "2": ("WHOIS History", fetch_whois_history),
    "3": ("Website Category", fetch_website_category),
    "4": ("Top-Level Domain Analysis", hit_whois_api),
    "5": ("Technology Stack Detection", check_technology_stack),
    "6": ("Subdomain Enumeration (Single Domain)", fetch_subdomains),
    "7": ("SSL Certificate Analysis", fetch_ssl_certificate),
    "8": ("Spam / Blacklist Check", check_spam_blacklist),
    "9": ("Robots.txt Analysis", fetch_robots_txt),
    "10": ("Open Ports & Services Scan", scan_ports),
    "11": ("Server Geolocation", fetch_geolocation_data),
    "12": ("Domain Reputation Check", fetch_reputation_data),
    "13": ("DNS Records Lookup", fetch_dns_records),
    "14": ("Website Full-Page Screenshot", fetch_full_screenshot),
    "15": ("Historical IP Lookup", fetch_ip_history),
    "16": ("Subdomain Enumeration (All TLD Variants)", fetch_all_subdomains),
}


# SHOW TOOL MENU
def show_menu():
    print("\n==============================================")
    print(" ReconSphere CLI : Automated Domain Intelligence Suite")
    print("==============================================\n")

    print("Available Tools:\n")

    for key, (name, _) in TOOLS.items():
        print(f"{key}. {name}")

    print("\nA. Run ALL Tools")
    print("Q. Quit")


# RUN SELECTED TOOLS
def run_tools(domain: str, selections: list):
    total = len(selections)
    count = 1

    for choice in selections:
        if choice in TOOLS:
            tool_name, tool_function = TOOLS[choice]

            print("\n----------------------------------------------")
            print(f"[{count}/{total}] Running: {tool_name}")
            print("----------------------------------------------")

            try:
                tool_function(domain)
            except Exception as e:
                print(f"Error in {tool_name}: {e}")

            count += 1
        else:
            print(f"Invalid selection: {choice}")


def main():
    show_menu()

    # Step 1 – Domain Input
    domain_name = input("\nEnter domain (e.g., example.com): ").strip().lower()

    if not is_valid_domain(domain_name):
        print("\nInvalid domain format.")
        return

    # Step 2 – Tool Selection
    user_choice = input("\nSelect tool numbers (comma separated) or A for all: ").strip().upper()

    if user_choice == "Q":
        print("\nExiting ReconSphere CLI.")
        return

    # Step 3 – Execute
    if user_choice == "A":
        print("\nRunning ALL ReconSphere Modules...\n")
        run_tools(domain_name, list(TOOLS.keys()))
    else:
        selections = [choice.strip() for choice in user_choice.split(",")]
        run_tools(domain_name, selections)

    print("\n==============================================")
    print(" Scan Completed Successfully ")
    print("==============================================\n")



# ENTRY POINT
if __name__ == "__main__":
    main()
