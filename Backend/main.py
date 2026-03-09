import sys
import os
from typing import List
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# PATH SETUP (IMPORTANT FOR IMPORTS)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)
sys.path.append(os.path.join(BASE_DIR, "Tools"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# IMPORT SEPARATED DUMMY DATABASE
from dummy_db import DUMMY_DB

# FASTAPI APP
app = FastAPI(
    title="ReconSphere – Automated Domain Intelligence Suite",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REQUEST MODEL
class ScanRequest(BaseModel):
    domain_name: str
    tools: List[str]

# AUTO MODE SWITCH
def has_api_keys() -> bool:
    return bool(os.getenv("WHOIS_API_KEY"))

# LAZY REAL TOOL IMPORTS (PERFORMANCE FIX)
def get_real_tool_functions():

    from whois_info import fetch_whois_data
    from Whois_history import fetch_whois_history
    from Web_category import fetch_website_category
    from Top_level_domain import get_top_level_domains, hit_whois_api
    from Technology_stack import check_technology_stack
    from subdomains import fetch_subdomains
    from SSL_certificate import fetch_ssl_certificate
    from spam_checker import check_spam_blacklist
    from Robots_txt import fetch_robots_txt
    from Ip_ports import scan_ports
    from Geo_location import fetch_geolocation_data
    from domain_reputation import fetch_reputation_data
    from Dns_records import fetch_dns_records

    return {
        "WHOIS Information": fetch_whois_data,
        "WHOIS History": fetch_whois_history,
        "DNS Records": fetch_dns_records,
        "Subdomain Enumeration": fetch_subdomains,
        "Top-Level Domain Analysis": hit_whois_api,
        "IP Address Resolution": get_top_level_domains,
        "Open Ports & Services": scan_ports,
        "SSL Certificate": fetch_ssl_certificate,
        "Server Geolocation": fetch_geolocation_data,
        "Technology Stack": check_technology_stack,
        "Domain Reputation": fetch_reputation_data,
        "Spam / Blacklist Check": check_spam_blacklist,
        "Robots.txt Analysis": fetch_robots_txt,
        "Website Category Detection": fetch_website_category,
    }

# HEALTH CHECK
@app.get("/")
def root():
    return {
        "status": "ReconSphere Backend Running",
        "mode": "REAL API" if has_api_keys() else "DUMMY DATA"
    }

# MAIN ANALYZE API
@app.post("/analyze")
def analyze_domain(request: ScanRequest):

    domain = request.domain_name.lower().strip()
    selected_tools = request.tools

    response = {
        "domain": domain,
        "analysis_timestamp": datetime.utcnow().isoformat(),
        "selected_modules": selected_tools,
        "summary": "",
        "module_results": {},
        "mode": "REAL API" if has_api_keys() else "DUMMY DATA"
    }

    # -------- REAL MODE --------
    if has_api_keys():
        REAL_TOOL_FUNCTIONS = get_real_tool_functions()

        for tool in selected_tools:
            try:
                func = REAL_TOOL_FUNCTIONS.get(tool)
                if func:
                    response["module_results"][tool] = func(domain)
                else:
                    response["module_results"][tool] = {
                        "error": "Tool not implemented"
                    }
            except Exception as e:
                response["module_results"][tool] = {
                    "error": str(e)
                }

    # -------- DUMMY MODE --------
    else:
        domain_data = DUMMY_DB.get(domain, {})

        for tool in selected_tools:
            response["module_results"][tool] = domain_data.get(
                tool,
                {"message": "Dummy data not available for this tool"}
            )

    # SUMMARY
    response["summary"] = f"{len(response['module_results'])} modules executed."

    return response