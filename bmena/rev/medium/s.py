import z3

# Create a solver
solver = z3.Solver()

# Create a list of 94 8-bit bit-vectors (ASCII characters)
flag = [z3.BitVec(f"flag_{i}", 8) for i in range(94)]

def substr(x, y):
    # Ensure indices are within bounds
    if x < 0 or y >= len(flag) or x > y:
        raise IndexError("Index out of range")
    z = 0
    m = 1
    for i in range(x, y + 1):
        z += flag[i] * m
        m *= 10
    return z

# Add constraints for printable ASCII characters
for char in flag:
    solver.add(char >= 32, char <= 126)  # Printable ASCII range

def check_val_1(idx0, idx1, idx2):
    # Check if indices are valid
    if idx0 >= len(flag) or idx1 >= len(flag) or idx2 >= len(flag):
        raise IndexError("Index out of range")
    return z3.And(
        substr(idx0, idx0) == substr(idx1, idx1),
        substr(idx1, idx1) == substr(idx2, idx2),
    )

# Constraints from the provided code
solver.add(substr(51, 51) - substr(22, 22) == 1)
solver.add(substr(14, 14) == substr(18, 18))
solver.add(substr(14, 14) == 0xA)
solver.add(substr(14, 14) == substr(24, 24))
solver.add(substr(24, 24) == substr(32, 32))
solver.add(substr(36, 36) == substr(32, 32))
solver.add(substr(62, 62) == substr(36, 36))
solver.add(substr(16, 16) == substr(30, 30))
solver.add(substr(16, 16) == 0xF)
solver.add(substr(51, 51) == substr(59, 59))
solver.add(substr(51, 51) == substr(63, 63))
solver.add(substr(51, 51) == substr(65, 65))
solver.add(substr(51, 51) == substr(77, 77))
solver.add(substr(51, 51) == substr(91, 91))
solver.add(substr(54, 54) == substr(84, 84))
solver.add(substr(54, 54) == 0xE)
solver.add(substr(84, 84) == substr(12, 12))
solver.add(substr(72, 72) == substr(92, 92))
solver.add(substr(72, 72) == substr(26, 26))
solver.add(substr(72, 72) == substr(34, 34))
solver.add(substr(72, 72) == substr(60, 60))
solver.add(substr(17, 17) == substr(23, 23))
solver.add(substr(17, 17) == substr(28, 28))
solver.add(substr(17, 17) == substr(35, 35))
solver.add(substr(17, 17) == substr(37, 37))
solver.add(substr(17, 17) == substr(43, 43))
solver.add(substr(17, 17) == substr(44, 44))
solver.add(substr(17, 17) == substr(52, 52))
solver.add(substr(17, 17) == substr(69, 69))
solver.add(substr(17, 17) == substr(74, 74))
solver.add(substr(22, 22) == substr(48, 48))
solver.add(substr(22, 22) == substr(78, 78))
solver.add(substr(22, 22) == substr(89, 89))
solver.add(substr(17, 17) - substr(87, 87) == -2)
solver.add(substr(76, 76) == 0x8)
solver.add(substr(93, 93) == 0x3)
solver.add(substr(13, 13) == 0x0)
solver.add(substr(26, 26) == 0x5)
solver.add(substr(87, 87) == 0x3)
solver.add(substr(88, 88) == 0xC)
solver.add(substr(81, 81) == 0x0)
solver.add(substr(86, 86) == 0x0)
solver.add(substr(17, 17) == 0x1)
solver.add(substr(18, 18) == 0xA)
solver.add(substr(19, 19) == 0x2)
solver.add(substr(20, 20) == 0xB)
solver.add(substr(31, 31) == 0x3)
solver.add(substr(44, 44) == 0x1)
solver.add(substr(49, 49) == 0x3)
solver.add(substr(55, 55) == 0x3)
solver.add(substr(44, 44) == 0x1)
solver.add(substr(45, 45) == 0x2)
solver.add(substr(39, 39) == 0x2)
solver.add(substr(58, 58) == 0x2)
solver.add(substr(66, 66) == 0xC)
solver.add(substr(6, 6) == 0xB)
solver.add((substr(7, 8) - substr(9, 10)) == 9)
solver.add((substr(89, 91) + substr(92, 93)) == 680)
solver.add(substr(7, 11) == 29202)
solver.add(substr(25, 29) == 25213)
solver.add(substr(67, 71) == 22103)
solver.add(substr(72, 76) == 50138)
solver.add(substr(37, 41) == 19230)
solver.add(substr(43, 47) == 11202)
solver.add(substr(77, 79) == 763)
solver.add(substr(85, 87) == 303)
solver.add(substr(59, 61) == 753)
solver.add(substr(39, 41) == 230)
solver.add(substr(21, 23) == 361)
solver.add(substr(51, 53) == 713)
solver.add(substr(33, 35) == 351)
solver.add(substr(45, 47) == 202)
solver.add(substr(63, 65) == 707)
solver.add(check_val_1(94, 82, 6))
solver.add(check_val_1(1, 86, 10))
solver.add(check_val_1(90, 83, 9))
solver.add(check_val_1(9, 11, 15))
solver.add(check_val_1(29, 61, 57))

# Check the solver
if solver.check() == z3.sat:
    model = solver.model()
    print("Model:", model)
    # Evaluate the flag
    flag_values = [model.eval(flag[i]).as_long() for i in range(94)]
    flag_str = "".join(chr(val) for val in flag_values)
    print("Flag found:", flag_str)
else:
    print("No solution found")

# Assuming a known correct flag with some incorrect indices
correct_flag = "BHFlagY{Rnt_vu|ns_OgòSerd4ldz4t10n_sUp3_fun!!}"
incorrect_indices = [39, 40, 41, 42, 43, 45]

# Brute-force the incorrect characters
for i in incorrect_indices:
    for char in range(32, 127):  # Printable ASCII range
        new_flag = list(correct_flag)
        new_flag[i] = chr(char)
        new_flag_str = "".join(new_flag)
        print(f"Trying flag: {new_flag_str}")
        if new_flag_str == correct_flag:
            print(f"Correct flag found with modification at index {i}: {new_flag_str}")
            break
