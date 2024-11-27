<?php

class HardcoreVM {
    private $bytecode;
    private $eip = 0;
    private $esp = 0x1000;
    private $stack;
    private $registers;
    private $flags = ['zf' => 0, 'sf' => 0, 'of' => 0];
    private $memory;
    private $username;
    private $input_password;
    private $debug_mode = false;

    public function __construct(string $username, string $password) {
        $this->username = $this->obfuscateInput($username);
        $this->input_password = $this->obfuscateInput($password);
        $this->registers = array_fill(0, 8, 0);
        $this->initializeMemory();
        $this->initializeBytecode();
    }

    private function obfuscateInput(string $input): string {
        $key = "CTF_MASTER_KEY";
        return base64_encode(array_reduce(
            str_split($input),
            fn($carry, $char) => $carry . chr(ord($char) ^ ord($key[strlen($carry) % strlen($key)])),
            ''
        ));
    }

    private function initializeMemory(): void {
        $this->memory = array_fill(0, 0x10000, 0);
        $this->stack = array_fill(0, 0x1000, 0);
    }

    private function initializeBytecode(): void {
        $encrypted_bytecode = "xV9eXUZPWFNfTEZaTlxBXlNEWF5GWVtcRFpGT09FTF5bTkReXUxdXEVbX0VcXUVZXkZeTkRdW05EXltMXkRET15FW19dRFxdRE9dRENURGXCncKN04uiQ3jQouLCu6IaK8ORrJtM4Yw0yFUEfW7CnuDCueOnXWFhdlbCm8KJdhV/QsOyctdyOlx9YQO9RRc=";
        $this->bytecode = $this->decryptBytecode($encrypted_bytecode);
    }

    private function decryptBytecode(string $encrypted): array {
        $key = hash('sha256', 'SECRET_BYTECODE_KEY', true);
        $iv = substr($key, 0, 16);
        $decrypted = openssl_decrypt(base64_decode($encrypted), 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);
        return array_values(unpack('C*', $decrypted));
    }

    public function execute(): void {
        $this->initVM();
        
        while ($this->eip < count($this->bytecode)) {
            if ($this->debug_mode) {
                $this->debugOutput();
            }

            $opcode = $this->bytecode[$this->eip++];
            $this->executeOpcode($opcode);
        }
    }

    private function initVM(): void {
        $this->eip = 0;
        $this->esp = 0x1000;
        $this->registers = array_fill(0, 8, 0);
        $this->flags = ['zf' => 0, 'sf' => 0, 'of' => 0];

        $this->loadMemoryData($this->username, 0x8000);
        $this->loadMemoryData($this->input_password, 0x9000);
    }

    private function loadMemoryData(string $data, int $startAddress): void {
        for ($i = 0, $len = strlen($data); $i < $len; $i++) {
            $this->memory[$startAddress + $i] = ord($data[$i]);
        }
    }

    private function debugOutput(): void {
        echo sprintf("EIP: 0x%04X, ESP: 0x%04X\n", $this->eip, $this->esp);
        echo "Registers: " . implode(', ', array_map(fn($v) => sprintf("0x%04X", $v), $this->registers)) . "\n";
        echo "Flags: ZF={$this->flags['zf']}, SF={$this->flags['sf']}, OF={$this->flags['of']}\n";
        echo "Next opcode: 0x" . dechex($this->bytecode[$this->eip]) . "\n\n";
    }

    private function executeOpcode(int $opcode): void {
        switch ($opcode) {
            case 0x01: $this->opMove(); break;
            case 0x02: $this->opPush(); break;
            case 0x03: $this->opPop(); break;
            case 0x04: $this->opAdd(); break;
            case 0x05: $this->opSub(); break;
            case 0x06: $this->opMul(); break;
            case 0x07: $this->opDiv(); break;
            case 0x08: $this->opXor(); break;
            case 0x09: $this->opAnd(); break;
            case 0x0A: $this->opOr(); break;
            case 0x0B: $this->opNot(); break;
            case 0x0C: $this->opCmp(); break;
            case 0x0D: $this->opJmp(); break;
            case 0x0E: $this->opJz(); break;
            case 0x0F: $this->opJnz(); break;
            case 0x10: $this->opCall(); break;
            case 0x11: $this->opRet(); break;
            case 0x12: $this->opLoadMem(); break;
            case 0x13: $this->opStoreMem(); break;
            case 0x14: $this->opNop(); break;
            case 0xFF: $this->opHalt(); return;
            default: throw new Exception("Invalid opcode: " . dechex($opcode));
        }
    }

    private function opMove(): void {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] = $this->registers[$src];
    }

    private function opPush(): void {
        $value = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        $this->esp -= 2;
        $this->stack[$this->esp] = $value & 0xFF;
        $this->stack[$this->esp + 1] = ($value >> 8) & 0xFF;
    }

    private function opPop(): void {
        $dest = $this->bytecode[$this->eip++];
        $value = $this->stack[$this->esp] | ($this->stack[$this->esp + 1] << 8);
        $this->registers[$dest] = $value;
        $this->esp += 2;
    }

    private function opXor(): void {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] ^= $this->registers[$src];
        $this->updateFlags($this->registers[$dest]);
    }

    private function opCmp(): void {
        $left = $this->registers[$this->bytecode[$this->eip++]];
        $right = $this->registers[$this->bytecode[$this->eip++]];
        $this->updateFlags($left - $right);
    }

    private function opJz(): void {
        $offset = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        if ($this->flags['zf']) {
            $this->eip += $offset - 2;
        }
    }

    private function opHalt(): void {
        echo $this->input_password === $this->username
            ? "Congratulations! Here's your flag: CTF{M4st3r_0f_th3_V1rtu4l_M4ch1n3}\n"
            : "Incorrect password. Try again!\n";
    }

    private function updateFlags(int $value): void {
        $this->flags['zf'] = ($value === 0) ? 1 : 0;
        $this->flags['sf'] = ($value < 0) ? 1 : 0;
        $this->flags['of'] = 0; // This might need more logic depending on the context
    }
}

try {
    if ($argc !== 3) {
        throw new InvalidArgumentException("Usage: php challenge.php <username> <password>\n");
    }

    $vm = new HardcoreVM($argv[1], $argv[2]);
    $vm->execute();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>