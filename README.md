# ReconSphere – Automated Domain Intelligence Suite

ReconSphere is a cybersecurity domain intelligence and reconnaissance web application that performs automated OSINT-based analysis on a given domain.

## Features

- WHOIS Information
- WHOIS History
- DNS Records
- Subdomain Enumeration
- SSL Certificate Analysis
- Domain Reputation
- Server Geolocation
- Technology Stack Detection
- Spam / Blacklist Check
- Robots.txt Analysis
- Website Category Detection
- Open Ports Scan

## Tech Stack

Frontend:
React + TailwindCSS

Backend:
FastAPI (Python)

## Setup

1. Clone repository

git clone https://github.com/yourusername/reconsphere.git

2. Install backend dependencies

pip install -r requirements.txt

3. Add API keys in `.env`

4. Run backend

uvicorn main:app --reload

5. Run frontend 

npm run dev