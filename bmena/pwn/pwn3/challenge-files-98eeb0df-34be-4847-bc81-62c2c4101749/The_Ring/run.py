#!/usr/bin/env python3
import os
import pwn
import tempfile

def main():
    try:
        # Automatically read the payload.flac file
        payload_file = 'payload.flac'
        with open(payload_file, 'rb') as f:
            flac = f.read()
        
        size = len(flac)
        print(f"[*] Payload size: {size} bytes")
        
        # Create a temporary file for the FLAC data
        with tempfile.NamedTemporaryFile('wb', delete=False) as temp_file:
            temp_file.write(flac)
            temp_file.flush()
            temp_filename = temp_file.name
        
        print(f"[*] Temporary file created: {temp_filename}")

        # Use pwntools to launch gdb and run the parser
        pwn.context.terminal = ['terminator', '-e']
        p = pwn.gdb.debug(['./parser', temp_filename], '''
            b main
            run
            ''')

        # Optionally print output from gdb session
        p.interactive()

    except Exception as e:
        print(f"[-] Something went wrong: {e}")

    finally:
        # Clean up the temporary file if it exists
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
            print(f"[*] Temporary file {temp_filename} removed.")

if __name__ == '__main__':
    main()
