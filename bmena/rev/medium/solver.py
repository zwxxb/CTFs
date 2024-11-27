"""


function () 
{
    if (exists("flag", envir = .GlobalEnv)) {
        flag_value <- get("flag", envir = .GlobalEnv)
        if (is.character(flag_value)) {
            xor_key <- "BHMEAISTHEBESTCTFEVERBETTERTHANALLOFTHEOTHERCTF"
            key_length <- nchar(xor_key)
            flag_length <- nchar(flag_value)
            if (flag_length != key_length) {
                xor_key <- substr(rep(xor_key, length.out = ceiling(flag_length/key_length)), 
                  1, flag_length)
            }
            xor_result <- sapply(1:flag_length, function(i) {
                flag_char <- substr(flag_value, i, i)
                key_char <- substr(xor_key, i, i)
                int_val <- as.integer(charToRaw(flag_char))
                xor_val <- as.integer(charToRaw(key_char))
                xored_val <- bitwXor(int_val, xor_val)
                as.raw(xored_val)
            })
            return(paste0(xor_result, collapse = ""))
        }
    }
    else {
        system("echo 'try better next time'")
    }
}




function () 
{
    flag <- get_flag_or_die()
    x <- 9
    delayedAssign("y", x)
    x <- x * (x - 5 + 4 + 6 - 3 - 2 - 3 - 6)
    as.integer(substr(flag, 1, 1)) == y
}

"""

import z3

# Create a solver
solver = z3.Solver()

# Create a string of 94 characters (assuming the flag length is 94 based on the constraints)
flag = [z3.BitVec(f"flag_{i + 1}", 64) for i in range(94)]
flag = [None, *flag]


def substr(x, y):
    z = 0
    m = 1
    for i in list(range(x, y + 1))[::-1]:
        z += flag[i] * m
        m *= 10

    return z


# Add constraints for printable ASCII characters
for char in flag:
    if char is None:
        continue

    # check hexadicmal range
    solver.add(char >= 0, char <= 0xF)
    pass


"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- as.integer(substr(flag, 51, 51))
    val_2 <- as.integer(substr(flag, 22, 22))
    (val_1 - val_2) == 1
}
"""

solver.add(substr(51, 51) - substr(22, 22) == 1)


"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 14, 14)
    val_2 <- substr(flag, 18, 18)
    val_3 <- substr(flag, 24, 24)
    val_4 <- substr(flag, 32, 32)
    val_5 <- substr(flag, 36, 36)
    val_6 <- substr(flag, 62, 62)
    (val_1 == val_2) & (val_1 == "a") & (val_1 == val_3) & (val_3 == 
        val_4) & (val_5 == val_4) & (val_6 == val_5)
}
"""
solver.add(substr(14, 14) == substr(18, 18))
solver.add(substr(14, 14) == 0xA)
solver.add(substr(14, 14) == substr(24, 24))
solver.add(substr(24, 24) == substr(32, 32))
solver.add(substr(36, 36) == substr(32, 32))
solver.add(substr(62, 62) == substr(36, 36))


"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 16, 16)
    val_2 <- substr(flag, 30, 30)
    (val_1 == val_2) & (val_1 == "f")
}

"""

solver.add(substr(16, 16) == substr(30, 30))
solver.add(substr(16, 16) == 0xF)

"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 51, 51)
    val_2 <- substr(flag, 59, 59)
    val_3 <- substr(flag, 63, 63)
    val_4 <- substr(flag, 65, 65)
    val_5 <- substr(flag, 77, 77)
    val_6 <- substr(flag, 91, 91)
    (val_1 == val_2) & (val_1 == val_3) & (val_1 == val_4) & 
        (val_1 == val_5) & (val_1 == val_6)
}

"""

solver.add(substr(51, 51) == substr(59, 59))
solver.add(substr(51, 51) == substr(63, 63))
solver.add(substr(51, 51) == substr(65, 65))
solver.add(substr(51, 51) == substr(77, 77))
solver.add(substr(51, 51) == substr(91, 91))


"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 54, 54)
    val_2 <- substr(flag, 84, 84)
    val_3 <- substr(flag, 12, 12)
    (val_1 == val_2) & (val_1 == "e") & (val_1 == val_3)
}
"""

solver.add(substr(54, 54) == substr(84, 84))
solver.add(substr(54, 54) == 0xE)
solver.add(substr(84, 84) == substr(12, 12))

"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 72, 72)
    val_2 <- substr(flag, 92, 92)
    val_3 <- substr(flag, 26, 26)
    val_4 <- substr(flag, 34, 34)
    val_5 <- substr(flag, 60, 60)
    (val_1 == val_2) & (val_1 == val_3) & (val_1 == val_4) & 
        (val_1 == val_5)
}

"""

solver.add(substr(72, 72) == substr(92, 92))
solver.add(substr(72, 72) == substr(26, 26))
solver.add(substr(72, 72) == substr(34, 34))
solver.add(substr(72, 72) == substr(60, 60))


"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 17, 17)
    val_2 <- substr(flag, 23, 23)
    val_3 <- substr(flag, 28, 28)
    val_4 <- substr(flag, 35, 35)
    val_5 <- substr(flag, 37, 37)
    val_6 <- substr(flag, 43, 43)
    val_7 <- substr(flag, 44, 44)
    val_8 <- substr(flag, 52, 52)
    val_9 <- substr(flag, 69, 69)
    val_10 <- substr(flag, 74, 74)
    (val_1 == val_2) & (val_1 == val_3) & (val_1 == val_4) & 
        (val_1 == val_5) & (val_1 == val_6) & (val_1 == val_7) & 
        (val_1 == val_8) & (val_1 == val_9) & (val_1 == val_10)
}
"""

solver.add(substr(17, 17) == substr(23, 23))
solver.add(substr(17, 17) == substr(28, 28))
solver.add(substr(17, 17) == substr(35, 35))
solver.add(substr(17, 17) == substr(37, 37))
solver.add(substr(17, 17) == substr(43, 43))
solver.add(substr(17, 17) == substr(44, 44))
solver.add(substr(17, 17) == substr(52, 52))
solver.add(substr(17, 17) == substr(69, 69))
solver.add(substr(17, 17) == substr(74, 74))


"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, 22, 22)
    val_2 <- substr(flag, 48, 48)
    val_3 <- substr(flag, 78, 78)
    val_4 <- substr(flag, 89, 89)
    (val_1 == val_2) & (val_1 == val_3) & (val_1 == val_4)
}
"""

solver.add(substr(22, 22) == substr(48, 48))
solver.add(substr(22, 22) == substr(78, 78))
solver.add(substr(22, 22) == substr(89, 89))

"""
function ()
{
    flag <- get_flag_or_die()
    val_1 <- as.integer(substr(flag, 17, 17))
    val_2 <- as.integer(substr(flag, 87, 87))
    (val_1 - val_2) == -2
}
"""

solver.add(substr(17, 17) - substr(87, 87) == -2)


"""

function check_val_11(index, val) 
{
    flag <- get_flag_or_die()
    val_1 <- substr(flag, index, index)
    val_1 == val
}

    check_val_11(76, "8") & 
    check_val_11(93, "3") & 
    check_val_11(13, "0") & 
    check_val_11(26, "5") & 
    check_val_11(87, "3") & 
    check_val_11(88, "c") & 
    check_val_11(81, "0") & 
    check_val_11(86, "0") &
    check_val_11(17, "1") & 
    check_val_11(18, "a") & 
    check_val_11(19, "2") & 
    check_val_11(20, "b") & 
    check_val_11(31, "3") & 
    check_val_11(44, "1") & 
    check_val_11(49, "3") & 
    check_val_11(55, "3") & 
    check_val_11(44, "1") & 
    check_val_11(45, "2") & 
    check_val_11(39, "2") & 
    check_val_11(58, "2") & 
    check_val_11(66, "c")
"""

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


"""
(substr(get_flag_or_die(), 6, 6) == "b") &
"""
solver.add(substr(6, 6) == 0xB)


# el mochkla fi hadhom
"""
function () 
{
    flag <- get_flag_or_die()
    val_1 <- as.integer(substr(flag, 7, 8))
    val_2 <- as.integer(substr(flag, 9, 10))
    val_3 <- as.integer(substr(flag, 89, 91))
    val_4 <- as.integer(substr(flag, 92, 93))
    ((val_1 - val_2) == 9) & ((val_3 + val_4) == 680)
}
"""

solver.add((substr(7, 8) - substr(9, 10)) == 9)
solver.add((substr(89, 91) + substr(92, 93)) == 680)


"""
function () 
{
    flag <- get_flag_or_die()
    as.integer(substr(flag, 7, 11)) == 29202
}
"""
solver.add(substr(7, 11) == 29202)

"""
function () 
{
    flag <- get_flag_or_die()
    as.integer(substr(flag, 25, 29)) == 25213
}
"""

solver.add(substr(25, 29) == 25213)


"""
function check_val_6(index_0, index_1, val) 
{
    flag <- get_flag_or_die()
    as.integer(substr(flag, index_0, index_1)) == val
}

    check_val_6(67, 71, 22103) & 
    check_val_6(72, 76, 50138) &      
    check_val_6(37, 41, 19230) & 
    check_val_6(43, 47, 11202) & 
"""

solver.add(substr(67, 71) == 22103)
solver.add(substr(72, 76) == 50138)
solver.add(substr(37, 41) == 19230)
solver.add(substr(43, 47) == 11202)


"""
    check_val_6(77, 79, 763) & 
    check_val_6(85, 87, 303) & 
    check_val_6(59, 61, 753) & 
    check_val_6(39, 41, 230) & 
    check_val_6(21, 23, 361) & 
    check_val_6(51, 53, 713) & 
    check_val_6(33, 35, 351) & 
    check_val_6(45, 47, 202) & 
    check_val_6(63, 65, 707) & 
"""
solver.add(substr(77, 79) == 763)
solver.add(substr(85, 87) == 303)
solver.add(substr(59, 61) == 753)
solver.add(substr(39, 41) == 230)
solver.add(substr(21, 23) == 361)
solver.add(substr(51, 53) == 713)
solver.add(substr(33, 35) == 351)
solver.add(substr(45, 47) == 202)
solver.add(substr(63, 65) == 707)


"""
function check_val_1(index_0, index_1, index_2) 
{
    flag <- get_flag_or_die()
    first_two <- substr(flag, index_0, index_0) == substr(flag, 
        index_1, index_1)
    second_two <- substr(flag, index_1, index_1) == substr(flag, 
        index_2, index_2)
    final <- all(first_two, second_two)
    return(final)
}

function (flag) 
{
    check_val_1(94, 82, 6) & 
    check_val_1(1, 86, 10) & 
    check_val_1(90, 83, 9) & 
    check_val_1(9, 11, 15) & 
    check_val_1(29, 61, 57) &    
}
"""


def check_val_1(idx0, idx1, idx2):
    return z3.And(
        substr(idx0, idx0) == substr(idx1, idx1),
        substr(idx1, idx1) == substr(idx2, idx2),
    )


solver.add(check_val_1(94, 82, 6))
solver.add(check_val_1(1, 86, 10))
solver.add(check_val_1(90, 83, 9))
solver.add(check_val_1(9, 11, 15))
solver.add(check_val_1(29, 61, 57))

"""
// checks if the first 5 characters of the flag are the same (xored with BHMEA so it will be zero)
function () 
{
    flag <- get_flag_or_die()
    if (nchar(flag) < 5) {
        return(FALSE)
    }
    first_five <- substr(flag, 1, 5)
    all_same <- all(strsplit(first_five, "")[[1]] == substr(flag, 
        1, 1))
    return(all_same)
}

"""
# solver.add(flag[1] == flag[2] == flag[3] == flag[4] == flag[5] == )


final_flag = flag[1:]
hehe = []
# Join the flag characters by two
for i in range(len(final_flag) // 2):
    left = z3.Extract(4, 0, final_flag[i * 2])
    right = z3.Extract(4, 0, final_flag[i * 2 + 1])
    hehe.append(z3.Concat(left, right))


# ff = "BHMEAISTHEBESTCTFEVERBETTERTHANALLOFTHEOTHERCTF"
# for i, c in enumerate(hehe):
#     print(c)
#     rezo = ord(ff[i]) ^ c
#     solver.add(rezo >= ord(" "), rezo <= ord("~"))

print(solver)

if solver.check() == z3.sat:
    model = solver.model()
    print(model)
    flag_str = "".join([hex(model[flag[i]].as_long())[2:] for i in range(1, 95)])
    print("Flag found:", flag_str)
else:
    print("No solution found")
