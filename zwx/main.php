<?php
class HardcoreVM {
    private $bytecode;
    private $eip = 0;
    private $esp = 0x1000;
    private $stack;
    private $registers = [0, 0, 0, 0, 0, 0, 0, 0];
    private $flags = ["zf" => 0, "sf" => 0, "of" => 0];
    private $memory;
    private $key_index = 0;
    private $username = "";
    private $input_password = "";
    private $generated_password = "";

    public function __construct($username, $password) {
        $this->username = $this->obfuscateInput($username);
        $this->input_password = $this->obfuscateInput($password);
        $this->initializeMemory();
        $this->initializeBytecode();
    }

    private function obfuscateInput($input) {
        $key = "CTF_MASTER_KEY_" . date("Ymd");
        $obfuscated = "";
        for ($i = 0; $i < strlen($input); $i++) {
            $obfuscated .= chr(ord($input[$i]) ^ ord($key[$i % strlen($key)]));
        }
        return base64_encode($obfuscated);
    }

    private function initializeMemory() {
        $this->memory = array_fill(0, 0x10000, 0);
        $this->stack = array_fill(0, 0x1000, 0);
    }

    private function initializeBytecode() {
        $encrypted_bytecode = "U2FsdGVkX1+8v76tR9I/6TKd1+0j5dSnLT9lWpjC+EI3GKLWjvNJ4gM7uFxuxeBOx0BIyxrZkcVqcwcnFoSJCWnEERPKPyvYQ5QA7CsriBZ6Px3yTJk1AOsqAC2MpWPSqD+ZLHVgpn9W3mCwlvRKJmYgjZgDOAmdqvPwMZrKKpE=";
        $this->bytecode = $this->decryptBytecode($encrypted_bytecode);
    }

    private function decryptBytecode($encrypted) {
        $key = hash("sha256", "SECRET_BYTECODE_KEY_" . date("Ymd"), true);
        $iv = substr($key, 0, 16);
        $decrypted = openssl_decrypt(base64_decode($encrypted), "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv);
        return array_values(unpack("C*", $decrypted));
    }

    public function execute() {
        $this->initVM();
        
        while ($this->eip < count($this->bytecode)) {
            $opcode = $this->bytecode[$this->eip];
            $this->eip++;
            
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
                case 0x15: $this->opRol(); break;
                case 0x16: $this->opRor(); break;
                case 0x17: $this->opBswap(); break;
                case 0xFF: return $this->opHalt();
                default: throw new Exception("Invalid opcode: " . dechex($opcode));
            }
        }
    }

    private function initVM() {
        $this->eip = 0;
        $this->esp = 0x1000;
        $this->registers = array_fill(0, 8, 0);
        $this->flags = ['zf' => 0, 'sf' => 0, 'of' => 0];
        $this->key_index = 0;
        
        for ($i = 0; $i < strlen($this->username); $i++) {
            $this->memory[0x8000 + $i] = ord($this->username[$i]);
        }
        
        for ($i = 0; $i < strlen($this->input_password); $i++) {
            $this->memory[0x9000 + $i] = ord($this->input_password[$i]);
        }
    }

    private function opMove() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] = $this->registers[$src];
    }

    private function opPush() {
        $value = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        $this->esp -= 2;
        $this->stack[$this->esp] = $value & 0xFF;
        $this->stack[$this->esp + 1] = ($value >> 8) & 0xFF;
    }

    private function opPop() {
        $dest = $this->bytecode[$this->eip++];
        $value = $this->stack[$this->esp] | ($this->stack[$this->esp + 1] << 8);
        $this->registers[$dest] = $value;
        $this->esp += 2;
    }

    private function opAdd() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] = ($this->registers[$dest] + $this->registers[$src]) & 0xFFFF;
        $this->updateFlags($this->registers[$dest]);
    }

    private function opSub() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] = ($this->registers[$dest] - $this->registers[$src]) & 0xFFFF;
        $this->updateFlags($this->registers[$dest]);
    }

    private function opMul() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] = ($this->registers[$dest] * $this->registers[$src]) & 0xFFFF;
        $this->updateFlags($this->registers[$dest]);
    }

    private function opDiv() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        if ($this->registers[$src] != 0) {
            $this->registers[$dest] = floor($this->registers[$dest] / $this->registers[$src]) & 0xFFFF;
            $this->updateFlags($this->registers[$dest]);
        }
    }

    private function opXor() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] ^= $this->registers[$src];
        $this->updateFlags($this->registers[$dest]);
    }

    private function opAnd() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] &= $this->registers[$src];
        $this->updateFlags($this->registers[$dest]);
    }

    private function opOr() {
        $dest = $this->bytecode[$this->eip++];
        $src = $this->bytecode[$this->eip++];
        $this->registers[$dest] |= $this->registers[$src];
        $this->updateFlags($this->registers[$dest]);
    }

    private function opNot() {
        $dest = $this->bytecode[$this->eip++];
        $this->registers[$dest] = (~$this->registers[$dest]) & 0xFFFF;
        $this->updateFlags($this->registers[$dest]);
    }

    private function opCmp() {
        $left = $this->registers[$this->bytecode[$this->eip++]];
        $right = $this->registers[$this->bytecode[$this->eip++]];
        $result = ($left - $right) & 0xFFFF;
        $this->updateFlags($result);
    }

    private function opJmp() {
        $offset = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        $this->eip += $offset - 2;
    }

    private function opJz() {
        $offset = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        if ($this->flags['zf'] == 1) {
            $this->eip += $offset - 2;
        }
    }

    private function opJnz() {
        $offset = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        if ($this->flags['zf'] == 0) {
            $this->eip += $offset - 2;
        }
    }

    private function opCall() {
        $address = $this->bytecode[$this->eip++] | ($this->bytecode[$this->eip++] << 8);
        $this->esp -= 2;
        $this->stack[$this->esp] = $this->eip & 0xFF;
        $this->stack[$this->esp + 1] = ($this->eip >> 8) & 0xFF;
        $this->eip = $address;
    }

    private function opRet() {
        $this->eip = $this->stack[$this->esp] | ($this->stack[$this->esp + 1] << 8);
        $this->esp += 2;
    }

    private function opLoadMem() {
        $dest = $this->bytecode[$this->eip++];
        $addr = $this->registers[$this->bytecode[$this->eip++]];
        $this->registers[$dest] = $this->memory[$addr] | ($this->memory[$addr + 1] << 8);
    }

    private function opStoreMem() {
        $src = $this->bytecode[$this->eip++];
        $addr = $this->registers[$this->bytecode[$this->eip++]];
        $this->memory[$addr] = $this->registers[$src] & 0xFF;
        $this->memory[$addr + 1] = ($this->registers[$src] >> 8) & 0xFF;
    }

    private function opNop() {
        // Do nothing
    }

    private function opRol() {
        $dest = $this->bytecode[$this->eip++];
        $count = $this->bytecode[$this->eip++] & 0xF;
        $this->registers[$dest] = (($this->registers[$dest] << $count) | ($this->registers[$dest] >> (16 - $count))) & 0xFFFF;
    }

    private function opRor() {
        $dest = $this->bytecode[$this->eip++];
        $count = $this->bytecode[$this->eip++] & 0xF;
        $this->registers[$dest] = (($this->registers[$dest] >> $count) | ($this->registers[$dest] << (16 - $count))) & 0xFFFF;
    }

    private function opBswap() {
        $dest = $this->bytecode[$this->eip++];
        $this->registers[$dest] = (($this->registers[$dest] & 0xFF) << 8) | (($this->registers[$dest] & 0xFF00) >> 8);
    }

    private function opHalt() {
        $this->generated_password = implode('', array_map('chr', $this->registers));
        if ($this->generated_password === base64_decode($this->input_password)) {
            return "Congratulations! Here's your flag: " . $this->decodeFlag();
        } else {
            return "Incorrect password. Try again!";
        }
    }

    private function updateFlags($value) {
        $this->flags['zf'] = ($value == 0) ? 1 : 0;
        $this->flags['sf'] = ($value & 0x8000) ? 1 : 0;
        // Overflow flag logic omitted for simplicity
    }

    private function decodeFlag() {
        $encoded_flag = "Q1RGe1ZNX0VtdWxhdGlvbl9NYXNEXFJfMjAyNH0=";
        $flag = "";
        for ($i = 0; $i < strlen(base64_decode($encoded_flag)); $i++) {
            $flag .= chr(ord(base64_decode($encoded_flag)[$i]) ^ $this->registers[$i % 8]);
        }
        return $flag;
    }
}

if (isset($_GET["username"]) && isset($_GET["password"])) {
    $vm = new HardcoreVM($_GET["username"], $_GET["password"]);
    echo $vm->execute();
} else {
    highlight_file(__FILE__);
    echo "Please provide a username and password as GET parameters.";
}
?>
