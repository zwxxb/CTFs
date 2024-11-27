target_sum = 1606
current_sum = 0
result = []

while current_sum < target_sum:
    char_value = min(255, target_sum - current_sum)  # Use valid ASCII values
    result.append(chr(char_value))
    current_sum += char_value

print("".join(result))
