import re

def analyze_sqlmap_logs(log_file_path):
    """
    Analyzes sqlmap logs to identify SQL injection patterns.

    Args:
        log_file_path (str): Path to the server log file.

    Returns:
        None
    """
    # Regex patterns to identify different SQL injection attempts
    patterns = {
        'COUNT_CHECK': re.compile(r'SELECT\s+IFNULL\(CAST\(COUNT\(\*\)\s+AS\s+CHAR\),0x20\) FROM\s+dvwa\.flag'),
        'VALUE_CHECK': re.compile(r'SELECT\s+IFNULL\(CAST\(`value`\s+AS\s+CHAR\),0x20\) FROM\s+dvwa\.flag\s+ORDER\s+BY\s+id\s+LIMIT\s+0,1'),
        'ID_CHECK': re.compile(r'SELECT\s+IFNULL\(CAST\(id\s+AS\s+CHAR\),0x20\) FROM\s+dvwa\.flag\s+ORDER\s+BY\s+id\s+LIMIT\s+0,1'),
    }

    injection_attempts = {
        'COUNT_CHECK': 0,
        'VALUE_CHECK': 0,
        'ID_CHECK': 0,
    }

    try:
        with open(log_file_path, 'r') as log_file:
            for line in log_file:
                for key, pattern in patterns.items():
                    if pattern.search(line):
                        injection_attempts[key] += 1

        print("SQL Injection Attempts Analysis:")
        for key, count in injection_attempts.items():
            print(f"{key}: {count} attempts")

    except FileNotFoundError:
        print(f"Error: The file {log_file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    log_file_path = 'access.log'  # Replace with your actual log file path
    analyze_sqlmap_logs(log_file_path)

if __name__ == "__main__":
    main()