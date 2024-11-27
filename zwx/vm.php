<?php
class VM {
    private $registers = [];
    private $memory = [];
    private $pc = 0;
    private $running = true;
    private $encrypted_flag = '';
    private $key = '';

    // Instruction set
    const HALT = 0x0;
    const LOAD = 0x1;
    const STORE = 0x2;
    const ADD = 0x3;
    const SUB = 0x4;
    const MUL = 0x5;
    const DIV = 0x6;
    const JMP = 0x7;
    const JZ = 0x8;
    const JNZ = 0x9;
    const JGT = 0xa;
    const JLT = 0xb;
    const JGE = 0xc;
    const JLE = 0xd;
    const JNE = 0xe;
    const NOP = 0xf;

    public function __construct() {
        // Initialize registers (16 registers, 4-bit addressing)
        for ($i = 0; $i < 16; $i++) {
            $this->registers[$i] = 0;
        }

        // Initialize memory (256 locations, 12-bit addressing)
        for ($i = 0; $i < 256; $i++) {
            $this->memory[$i] = 0;
        }

        // Generate random key for XOR encryption
        $this->key = random_bytes(32);
        
        // Encrypt the flag
        $flag = "zwx{obfuscated_vm_in_php_areAW3s0m3_!33t}";
        $this->encrypted_flag = $this->encrypt($flag);

        // Load encrypted program into memory
        $this->loadEncryptedProgram();
    }

    private function encrypt($data) {
        return base64_encode(openssl_encrypt(
            $data,
            'AES-256-CBC',
            $this->key,
            OPENSSL_RAW_DATA,
            str_repeat("\0", 16)
        ));
    }

    private function decrypt($data) {
        return openssl_decrypt(
            base64_decode($data),
            'AES-256-CBC',
            $this->key,
            OPENSSL_RAW_DATA,
            str_repeat("\0", 16)
        );
    }

    private function loadEncryptedProgram() {
        // Example program: Calculate a value and compare with key parts
        $program = [
            0x1123, // load r1, 35
            0x1234, // load r2, 52
            0x3312, // add r3, r1, r2
            0x4321, // sub r3, r2, r1
            0x5231, // mul r2, r3, r1
            0x6123, // div r1, r2, r3
            0x7010, // jmp 16
            0x8020, // jz r0, 32
            0x9030, // jnz r0, 48
            0xa040, // jgt r0, 64
            0xb050, // jlt r0, 80
            0xc060, // jge r0, 96
            0xd070, // jle r0, 112
            0xe080, // jne r0, 128
            0xf000, // nop
            0x0000  // halt
        ];

        // Encrypt and load program
        for ($i = 0; $i < count($program); $i++) {
            $this->memory[$i] = $this->obfuscate($program[$i]);
        }
    }

    private function obfuscate($instruction) {
        return ($instruction ^ 0xABC) + 0x123;
    }

    private function deobfuscate($instruction) {
        return ($instruction - 0x123) ^ 0xABC;
    }

    public function execute() {
        while ($this->running && $this->pc < count($this->memory)) {
            $instruction = $this->deobfuscate($this->memory[$this->pc]);
            
            // Decode instruction parts (12-bit instruction)
            $opcode = ($instruction >> 8) & 0xF;    // First 4 bits
            $reg = ($instruction >> 4) & 0xF;       // Next 4 bits
            $value = $instruction & 0xF;            // Last 4 bits

            switch ($opcode) {
                case self::HALT:
                    $this->running = false;
                    break;
                case self::LOAD:
                    $this->registers[$reg] = $value;
                    break;
                case self::STORE:
                    $this->memory[$value] = $this->registers[$reg];
                    break;
                case self::ADD:
                    $this->registers[$reg] = ($this->registers[$value] + $this->registers[$reg & 0x3]) & 0xFFF;
                    break;
                case self::SUB:
                    $this->registers[$reg] = ($this->registers[$value] - $this->registers[$reg & 0x3]) & 0xFFF;
                    break;
                case self::MUL:
                    $this->registers[$reg] = ($this->registers[$value] * $this->registers[$reg & 0x3]) & 0xFFF;
                    break;
                case self::DIV:
                    if ($this->registers[$reg & 0x3] != 0) {
                        $this->registers[$reg] = (int)($this->registers[$value] / $this->registers[$reg & 0x3]) & 0xFFF;
                    }
                    break;
                case self::JMP:
                    $this->pc = $value - 1;
                    break;
                case self::JZ:
                    if ($this->registers[$reg] == 0) $this->pc = $value - 1;
                    break;
                case self::JNZ:
                    if ($this->registers[$reg] != 0) $this->pc = $value - 1;
                    break;
                case self::JGT:
                    if ($this->registers[$reg] > 0) $this->pc = $value - 1;
                    break;
                case self::JLT:
                    if ($this->registers[$reg] < 0) $this->pc = $value - 1;
                    break;
                case self::JGE:
                    if ($this->registers[$reg] >= 0) $this->pc = $value - 1;
                    break;
                case self::JLE:
                    if ($this->registers[$reg] <= 0) $this->pc = $value - 1;
                    break;
                case self::JNE:
                    if ($this->registers[$reg] != $value) $this->pc = $value - 1;
                    break;
                case self::NOP:
                    break;
            }
            $this->pc++;
        }
    }

    public function getFlag() {
        if ($this->checkSolution()) {
            return $this->decrypt($this->encrypted_flag);
        }
        return "Keep trying! Solve the VM puzzle first.";
    }

    private function checkSolution() {
        return ($this->registers[1] == 0x123 && 
                $this->registers[2] == 0x456 && 
                $this->registers[3] == 0x789);
    }
}

$vm = new VM();
$vm->execute();
echo $vm->getFlag();

?>