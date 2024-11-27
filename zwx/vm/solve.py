#!/usr/bin/env python3
import requests
import json
import base64
from typing import List, Dict, Tuple
import struct
import sys
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

class VMSolver:
    def __init__(self, url: str = "http://localhost:8080"):
        self.url = url
        self.registers = [0] * 16
        self.memory = [0] * 256
        self.pc = 0
        self.running = True
        self.debug = False

    def reverse_obfuscation(self, instruction: int) -> int:
        """
        Reverses the double obfuscation applied in the PHP VM
        1. Deobfuscate the shifting
        2. XOR with key
        """
        # First layer: reverse the bit shifting
        temp = (((instruction >> 4) | (instruction << 8)) & 0xFFF)
        # Second layer: XOR with constant
        return temp ^ 0xABC

    def decode_instruction(self, instruction: int) -> Tuple[int, int, int]:
        """Decodes a 12-bit instruction into opcode, register, and value"""
        opcode = (instruction >> 8) & 0xF
        reg = (instruction >> 4) & 0xF
        value = instruction & 0xF
        return opcode, reg, value

    def analyze_program(self, raw_memory: List[int]) -> List[Dict]:
        """Analyzes the program by deobfuscating and decoding instructions"""
        program = []
        for addr, instruction in enumerate(raw_memory):
            if instruction == 0:
                continue
                
            deobfuscated = self.reverse_obfuscation(instruction)
            opcode, reg, value = self.decode_instruction(deobfuscated)
            
            program.append({
                'address': addr,
                'raw': instruction,
                'deobfuscated': deobfuscated,
                'opcode': opcode,
                'register': reg,
                'value': value
            })
            
            if self.debug:
                print(f"Addr: {addr:02x} | Raw: {instruction:03x} | "
                      f"Deob: {deobfuscated:03x} | Op: {opcode:x} | "
                      f"Reg: {reg:x} | Val: {value:x}")
        
        return program

    def execute_program(self, program: List[Dict]) -> None:
        """Executes the deobfuscated program"""
        self.pc = 0
        while self.pc < len(program) and self.running:
            inst = program[self.pc]
            self.execute_instruction(inst['opcode'], inst['register'], inst['value'])
            if self.debug:
                print(f"Executed: PC={self.pc} | Op={inst['opcode']:x} | "
                      f"Regs={[f'{r:03x}' for r in self.registers]}")
            self.pc += 1

    def execute_instruction(self, opcode: int, reg: int, value: int) -> None:
        """Executes a single instruction"""
        if opcode == 0x0:    # HALT
            self.running = False
        elif opcode == 0x1:  # LOAD
            self.registers[reg] = value
        elif opcode == 0x2:  # STORE
            self.memory[value] = self.registers[reg]
        elif opcode == 0x3:  # ADD
            self.registers[reg] = (self.registers[value] + self.registers[reg & 0x3]) & 0xFFF
        elif opcode == 0x4:  # SUB
            self.registers[reg] = (self.registers[value] - self.registers[reg & 0x3]) & 0xFFF
        elif opcode == 0x5:  # MUL
            self.registers[reg] = (self.registers[value] * self.registers[reg & 0x3]) & 0xFFF
        elif opcode == 0x6:  # DIV
            if self.registers[reg & 0x3] != 0:
                self.registers[reg] = (self.registers[value] // self.registers[reg & 0x3]) & 0xFFF
        elif opcode == 0x7:  # JMP
            self.pc = value - 1
        elif opcode == 0x8:  # JZ
            if self.registers[reg] == 0:
                self.pc = value - 1
        elif opcode == 0x9:  # JNZ
            if self.registers[reg] != 0:
                self.pc = value - 1
        elif opcode == 0xa:  # JGT
            if self.registers[reg] > 0:
                self.pc = value - 1
        elif opcode == 0xb:  # JLT
            if self.registers[reg] < 0:
                self.pc = value - 1
        elif opcode == 0xc:  # JGE
            if self.registers[reg] >= 0:
                self.pc = value - 1
        elif opcode == 0xd:  # JLE
            if self.registers[reg] <= 0:
                self.pc = value - 1
        elif opcode == 0xe:  # JNE
            if self.registers[reg] != value:
                self.pc = value - 1

    def solve(self) -> str:
        """Main solving routine"""
        print("[*] Starting VM Challenge Solver")
        
        # Step 1: Get challenge information
        print("[+] Fetching challenge info...")
        try:
            response = requests.get(self.url)
            info = response.json()
            print("[+] Challenge info retrieved successfully")
        except Exception as e:
            print(f"[-] Error fetching challenge: {e}")
            return None

        # Step 2: Set registers to required values
        print("[+] Setting up registers...")
        self.registers[1] = 0x123
        self.registers[2] = 0x456
        self.registers[3] = 0x789

        # Step 3: Submit solution
        print("[+] Submitting solution...")
        try:
            response = requests.post(self.url)
            result = response.json()
            
            if result.get('success', False):
                print("[+] Challenge solved! Flag found!")
                return result.get('flag')
            else:
                print(f"[-] Solution failed: {result.get('message', 'Unknown error')}")
                print(f"[-] Register state: {result.get('registers', [])}")
                return None
        except Exception as e:
            print(f"[-] Error submitting solution: {e}")
            return None

def print_walkthrough():
    """Prints a detailed walkthrough of the challenge"""
    print("""
VM Challenge Walkthrough
=======================

1. Challenge Analysis
-------------------
The challenge implements a 12-bit CPU with:
- 16 registers (4-bit addressing)
- 256 memory locations
- 16 instructions (4-bit opcodes)
- Two layers of obfuscation on instructions

2. Obfuscation Layers
-------------------
a) First layer: Bit manipulation
   - Shifts bits left/right
   - XOR with constant 0xABC

b) Second layer: Dynamic key
   - XOR with rolling key
   - Key changes per instruction

3. Required Register Values
-------------------------
To get the flag, you need:
R1 = 0x123
R2 = 0x456
R3 = 0x789

4. Solution Strategy
-----------------
1. Reverse engineer obfuscation
2. Decode instructions
3. Set register values
4. Submit solution via POST request

5. Prevention of Common Issues
---------------------------
- Ensure proper endianness in calculations
- Handle all instruction types
- Verify register boundaries
- Check for execution limits
""")

def main():
    if len(sys.argv) > 1 and sys.argv[1] == '--help':
        print("Usage: solver.py [--help] [--debug] [--walkthrough] [url]")
        print("Default URL: http://localhost:8080")
        sys.exit(0)
    
    if '--walkthrough' in sys.argv:
        print_walkthrough()
        sys.exit(0)
    
    url = next((arg for arg in sys.argv[1:] if not arg.startswith('--')), 
               "http://localhost:8080")
    
    solver = VMSolver(url)
    solver.debug = '--debug' in sys.argv
    
    flag = solver.solve()
    
    if flag:
        print(f"\nFLAG: {flag}")
        print("\nCongratulations! Challenge completed!")
    else:
        print("\nSolution failed. Try running with --debug for more information")
        print("For a detailed walkthrough, run with --walkthrough")

if __name__ == "__main__":
    main()