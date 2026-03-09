# dummy_db.py
# Centralized dummy intelligence database for ReconSphere

DUMMY_DB = {
    "google.com": {
        "WHOIS Information": {
            "registrar": "Google LLC",
            "created": "1997-09-15",
            "expiry": "2030-09-15",
            "status": "ACTIVE"
        },
        "WHOIS History": {
            "previous_registrars": ["MarkMonitor"],
            "ownership_changes": 1
        },
        "DNS Records": {
            "A": ["142.250.190.14"],
            "MX": ["aspmx.l.google.com"]
        },
        "Subdomain Enumeration": [
            "mail.google.com",
            "maps.google.com",
            "drive.google.com"
        ],
        "Top-Level Domain Analysis": [
            "google.com",
            "google.in",
            "google.co.uk"
        ],
        "IP Address Resolution": "142.250.190.14",
        "Open Ports & Services": [80, 443],
        "SSL Certificate": {
            "issuer": "Google Trust Services",
            "valid_till": "2026"
        },
        "Server Geolocation": "United States",
        "Technology Stack": [
            "Google Web Server",
            "HTTP/3",
            "QUIC"
        ],
        "Domain Reputation": "Excellent",
            "Spam / Blacklist Check": "Clean",
        "Robots.txt Analysis": "Allowed",
        "Website Category Detection": "Search Engine"
    },

    "amazon.com": {
        "WHOIS Information": {
            "registrar": "Amazon Registrar Inc.",
            "created": "1994-11-01",
            "expiry": "2032-11-01"
        },
        "DNS Records": {
            "A": ["176.32.103.205"],
            "NS": ["ns1.amazon.com"]
        },
        "Subdomain Enumeration": [
            "sellercentral.amazon.com",
            "aws.amazon.com"
        ],
        "Technology Stack": [
            "AWS",
            "CloudFront"
        ],
        "Domain Reputation": "Very High",
        "Website Category Detection": "E-commerce"
    },

    "slrtdc.in": {
        "WHOIS Information": {
            "registrar": "NIC India",
            "created": "2005-06-10"
        },
        "DNS Records": {
            "A": ["164.100.52.92"]
        },
        "Server Geolocation": "India",
        "Website Category Detection": "Government / Transport"
    },

    "mumbaiuniversity.ac.in": {
        "WHOIS Information": {
            "registrar": "ERNET India",
            "created": "1996-01-01"
        },
        "Server Geolocation": "India",
        "Website Category Detection": "Education"
    },

    "example.com": {
        "WHOIS Information": {
            "registrar": "IANA Reserved",
            "created": "1995-08-13"
        },
        "Technology Stack": ["Demo Server"],
        "Website Category Detection": "Testing / Demo"
    }
}
