import z3
solver = z3.Solver()
flag = [z3.BitVec(f"flag_{i + 1}", 64) for i in range(94)]
flag = [None, *flag]

def substr(x, y):
    z = 0
    m = 1
    for i in list(range(x, y + 1))[::-1]:
        z += flag[i] * m
        m *= 10
    return z
for char in flag:
    if char is None:
        continue
    solver.add(char >= 0, char <= 0xF)
def check_val_1(idx0, idx1, idx2):
    return z3.And(
        substr(idx0, idx0) == substr(idx1, idx1),
        substr(idx1, idx1) == substr(idx2, idx2),
    )
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
final_flag = flag[1:]
hehe = []
for i in range(len(final_flag) // 2):
    left = z3.Extract(3, 0, final_flag[i * 2])
    right = z3.Extract(3, 0, final_flag[i * 2 + 1])
    hehe.append(z3.Concat(left, right))
xor_key = "BHMEAISTHEBESTCTFEVERBETTERTHANALLOFTHEOTHERCTF"
key_length = len(xor_key)
print("Intermediate values:")
for i, c in enumerate(hehe):
    if i < key_length:
        xored_val = z3.BitVecVal(ord(xor_key[i]), 8) ^ c
        print(f"Index {i}: {xored_val}")
if solver.check() == z3.sat:
    model = solver.model()
    print("Model:", model)
    evaluated_values = [model.eval(c).as_long() for c in hehe]
    flag = "".join([chr(val ^ ord(xor_key[i])) for i, val in enumerate(evaluated_values)])
    print("Flag found:", flag)
else:
    print("No solution found")