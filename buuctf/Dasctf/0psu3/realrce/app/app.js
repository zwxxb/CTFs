var express = require('express');
var proc = require('child_process');
const util = require('util');

var app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/images', express.static('/app/static'));


function waf(input_code) {
    bypasspin = /%[0-9a-fA-F]{2}/i;
    const bypasscode = bypasspin.test(input_code);
    if (bypasscode) {
        try {
            return waf(decodeURIComponent(input_code));
        } catch (error) {
            console.error("Error decoding input: ", error);
            return false;
        }
    }
    const blacklist = [/__proto__/i, /constructor/i, /prototype/i];
    for (const blackword of blacklist) {
        if (blackword.test(input_code)) {
            return true;
        }
    }
    return false;
}



function LockCylinder(input, blackchr = ["&&", "||", "&", "|", ">", "*", "+", "$", ";"]) {
    const resultArray = [];
    let currentPart = "";

    for (let i = 0; i < input.length; i++) {
        const currentChar = input[i];

        if (blackchr.includes(currentChar)) {
            if (currentPart.length > 0) {
                resultArray.push(currentPart);
                currentPart = "";
            }
        } else {
            currentPart += currentChar;
        }
    }
    if (currentPart.length > 0) {
        resultArray.push(currentPart);
    }

    return resultArray;
}

function check_cmd(cmd) {
    const command = ["{", ";", "<>", "`", "'", "$", "if", "then", "else", "elif", "fi", "case", "esac", "for", "select", "while", "until", "do", "done", "in", "function", "time", "coproc", "alias", "bg", "bind", "break", "builtin", "caller", "cd", "command", "compgen", "complete", "compopt", "continue", "declare", "dirs", "disown", "echo", "enable", "eval", "exec", "exit", "export", "false", "fc", "fg", "getopts", "hash", "help", "history", "jobs", "kill", "let", "local", "logout", "mapfile", "popd", "printf", "pushd", "pwd", "read", "readarray", "readonly", "return", "set", "shift", "shopt", "source", "suspend", "test", "times", "trap", "true", "type", "typeset", "ulimit", "umask", "unalias", "unset", "wait", "vipw", "mkdumprd", "ifenslave", "fsck", "chpasswd", "useradd", "rtstat", "lnstat", "hwclock", "dhclient", "pwunconv", "groupmems", "mksquashfs", "chkconfig", "ethtool", "packer", "mkdict", "agetty", "applygnupgdefaults", "zramctl", "swaplabel", "blkzone", "pwconv", "cfdisk", "ldattach", "reboot", "tipc", "fstrim", "clockdiff", "groupadd", "dmfilemapd", "runuser", "modinfo", "swapoff", "telinit", "sfdisk", "ctstat", "clock", "rtpr", "fsfreeze", "ldconfig", "fdformat", "getcap", "kexec", "rdma", "tracepath", "rtmon", "rtacct", "fdisk", "udevadm", "usermod", "findfs", "halt", "resizepart", "routef", "genl", "mkswap", "poweroff", "rdisc", "grpunconv", "partx", "rtcwake", "nologin", "rfkill", "lspci", "vigr", "grpconv", "ip", "blkdeactivate", "addgnupghome", "chroot", "shutdown", "unsquashfs", "readprofile", "adduser", "groupmod", "ss", "dmstats", "ifcfg", "modprobe", "depmod", "iconvconfig", "sulogin", "rmmod", "grpck", "nstat", "ifstat", "sysctl", "insmod", "routel", "zdump", "blkdiscard", "getpcaps", "losetup", "setpci", "dmsetup", "wipefs", "addpart", "zic", "userdel", "makedumpfile", "blkid", "groupdel", "setcap", "chgpasswd", "resolvconf", "newusers", "init", "arping", "pwck", "devlink", "lsmod", "ping", "mkfs", "faillock", "runlevel", "blockdev", "swapon", "alternatives", "arpd", "delpart", "pidof", "chcpu", "capsh", "ctrlaltdel", "bridge", "less", "gpgsplit", "pgrep", "truncate", "localedef", "printf", "gencat", "sed", "ptx", "nm", "pwmake", "zmore", "tzselect", "script", "dnsdomainname", "ar", "more", "journalctl", "gunzip", "makedb", "tac", "col", "sync", "vi", "locale", "prlimit", "nisdomainname", "timedatectl", "ipcmk", "isosize", "free", "alias", "taskset", "factor", "pinky", "arch", "lscpu", "awk", "tty", "xmllint", "xzcmp", "readelf", "kdumpctl", "tsort", "nice", "cal", "rpmdb", "newgrp", "xmlwf", "slabtop", "utmpdump", "tar", "basename", "eject", "ranlib", "wall", "zless", "sort", "nsenter", "getent", "chrt", "mount", "bash", "systemctl", "vmstat", "xmlcatalog", "date", "lsinitrd", "tload", "chmod", "setsid", "getopts", "colcrt", "su", "lsipc", "login", "lsns", "unalias", "lastb", "df", "gpg", "type", "gpgv", "pathchk", "groups", "lsmem", "users", "as", "ipcs", "jobs", "command", "iconv", "dwp", "domainname", "xzcat", "ldd", "whoami", "strip", "dircolors", "nl", "trust", "stty", "ul", "chacl", "loginctl", "gzip", "xzmore", "zcat", "busctl", "fincore", "fgrep", "dmesg", "rm", "mv", "cat", "lslogins", "numfmt", "flock", "realpath", "find", "tracepath", "lesskey", "printenv", "du", "grep", "udevadm", "tee", "rename", "gawk", "mkdir", "sg", "xzegrep", "xzdec", "split", "whereis", "strings", "setfacl", "mkfifo", "chage", "xzgrep", "kill", "rvi", "size", "ypdomainname", "tr", "umount", "rev", "wdctl", "uniq", "ps", "stdbuf", "chgrp", "setarch", "cd", "dirmngr", "write", "lastlog", "gsettings", "ex", "ipcrm", "cp", "fallocate", "colrm", "rpm", "pwdx", "xargs", "objdump", "ld", "chcon", "skill", "yum", "who", "gapplication", "stat", "sleep", "wait", "fg", "uuidgen", "logger", "pwscore", "xz", "mesg", "rmdir", "zgrep", "chmem", "newuidmap", "evmctl", "wc", "top", "egrep", "fold", "zfgrep", "link", "csplit", "sum", "expand", "getfacl", "newgidmap", "join", "install", "bootctl", "xzless", "runcon", "dirname", "comm", "false", "hostname", "unlink", "sh", "ipcalc", "unexpand", "nohup", "zegrep", "head", "getopt", "raw", "hexdump", "mountpoint", "lslocks", "coreutils", "shred", "sotruss", "true", "pldd", "uuidparse", "localectl", "gtar", "test", "znew", "logname", "gzexe", "rpmquery", "touch", "hash", "cpio", "sprof", "hostnamectl", "uname", "unxz", "zdiff", "gdbus", "namei", "ls", "kmod", "info", "umask", "zcmp", "w", "mktemp", "pwd", "column", "scriptreplay", "lessecho", "look", "setterm", "gdbmtool", "rpmkeys", "bg", "id", "gpasswd", "dracut", "vdir", "mcookie", "elfedit", "chown", "objcopy", "hostid", "shuf", "view", "mknod", "gpgparsemail", "fc", "tail", "zforce", "last", "dir", "ionice", "read", "resolvectl", "watchgnupg", "unshare", "timeout", "getconf", "findmnt", "pr", "xzfgrep", "ping", "rview", "fmt", "echo", "readlink", "dd", "paste", "od", "setpriv", "coredumpctl", "dnf", "xzdiff", "renicerpmverify", "pkill", "mkinitrd", "pmap", "snice", "gio", "gpgconf", "expr", "ulimit", "nproc", "pidof", "watch", "cksum", "yes", "rpmverify", "lsblk", "catchsegv", "uptime", "seq", "ln", "cut", "bashbug", "curl", "gprof", "node", "npm", "corepack", "npx", "vipw", "mkdumprd", "ifenslave", "fsck", "chpasswd", "useradd", "rtstat", "lnstat", "hwclock", "dhclient", "pwunconv", "groupmems", "mksquashfs", "chkconfig", "ethtool", "packer", "mkdict", "agetty", "applygnupgdefaults", "zramctl", "swaplabel", "blkzone", "pwconv", "cfdisk", "ldattach", "reboot", "tipc", "fstrim", "clockdiff", "groupadd", "dmfilemapd", "runuser", "modinfo", "swapoff", "telinit", "sfdisk", "ctstat", "clock", "rtpr", "fsfreeze", "ldconfig", "fdformat", "getcap", "kexec", "rdma", "tracepath", "rtmon", "rtacct", "fdisk", "udevadm", "usermod", "findfs", "halt", "resizepart", "routef", "genl", "mkswap", "poweroff", "rdisc", "grpunconv", "partx", "rtcwake", "nologin", "rfkill", "lspci", "vigr", "grpconv", "ip", "blkdeactivate", "addgnupghome", "chroot", "shutdown", "unsquashfs", "readprofile", "adduser", "groupmod", "ss", "dmstats", "ifcfg", "modprobe", "depmod", "iconvconfig", "sulogin", "rmmod", "grpck", "nstat", "ifstat", "sysctl", "insmod", "routel", "zdump", "blkdiscard", "getpcaps", "losetup", "setpci", "dmsetup", "wipefs", "addpart", "zic", "userdel", "makedumpfile", "blkid", "groupdel", "setcap", "chgpasswd", "resolvconf", "newusers", "init", "arping", "pwck", "devlink", "lsmod", "ping", "mkfs", "faillock", "runlevel", "blockdev", "swapon", "alternatives", "arpd", "delpart", "pidof", "chcpu", "capsh", "ctrlaltdel", "bridge", "less", "gpgsplit", "pgrep", "truncate", "localedef", "printf", "gencat", "sed", "ptx", "nm", "pwmake", "zmore", "tzselect", "script", "dnsdomainname", "ar", "more", "journalctl", "gunzip", "makedb", "tac", "col", "sync", "vi", "locale", "prlimit", "nisdomainname", "timedatectl", "ipcmk", "isosize", "free", "alias", "taskset", "factor", "pinky", "arch", "lscpu", "awk", "tty", "xmllint", "xzcmp", "readelf", "kdumpctl", "tsort", "nice", "cal", "rpmdb", "newgrp", "xmlwf", "slabtop", "utmpdump", "tar", "basename", "eject", "ranlib", "wall", "zless", "sort", "nsenter", "getent", "chrt", "mount", "bash", "systemctl", "vmstat", "xmlcatalog", "date", "lsinitrd", "tload", "chmod", "setsid", "getopts", "colcrt", "su", "lsipc", "login", "lsns", "unalias", "lastb", "df", "gpg", "type", "gpgv", "pathchk", "groups", "lsmem", "users", "as", "ipcs", "jobs", "command", "iconv", "dwp", "domainname", "xzcat", "ldd", "whoami", "strip", "dircolors", "nl", "trust", "stty", "ul", "chacl", "loginctl", "gzip", "xzmore", "zcat", "busctl", "fincore", "fgrep", "dmesg", "rm", "mv", "cat", "lslogins", "numfmt", "flock", "realpath", "find", "tracepath", "lesskey", "printenv", "du", "grep", "udevadm", "tee", "rename", "gawk", "mkdir", "sg", "xzegrep", "xzdec", "split", "whereis", "strings", "setfacl", "mkfifo", "chage", "xzgrep", "kill", "rvi", "size", "ypdomainname", "tr", "umount", "rev", "wdctl", "uniq", "ps", "stdbuf", "chgrp", "setarch", "cd", "dirmngr", "write", "lastlog", "gsettings", "ex", "ipcrm", "cp", "fallocate", "colrm", "rpm", "pwdx", "xargs", "objdump", "ld", "chcon", "skill", "yum", "who", "gapplication", "stat", "sleep", "wait", "fg", "uuidgen", "logger", "pwscore", "xz", "mesg", "rmdir", "zgrep", "chmem", "newuidmap", "evmctl", "wc", "top", "egrep", "fold", "zfgrep", "link", "csplit", "sum", "expand", "getfacl", "newgidmap", "join", "install", "bootctl", "xzless", "runcon", "dirname", "comm", "false", "hostname", "unlink", "sh", "ipcalc", "unexpand", "nohup", "zegrep", "head", "getopt", "raw", "hexdump", "mountpoint", "lslocks", "coreutils", "shred", "sotruss", "true", "pldd", "uuidparse", "localectl", "gtar", "test", "znew", "logname", "gzexe", "rpmquery", "touch", "hash", "cpio", "sprof", "hostnamectl", "env", "uname", "unxz", "zdiff", "gdbus", "namei", "ls", "kmod", "info", "umask", "zcmp", "w", "mktemp", "pwd", "column", "scriptreplay", "lessecho", "look", "setterm", "gdbmtool", "rpmkeys", "bg", "id", "gpasswd", "dracut", "vdir", "mcookie", "elfedit", "chown", "objcopy", "hostid", "shuf", "view", "mknod", "gpgparsemail", "fc", "tail", "zforce", "last", "dir", "ionice", "read", "resolvectl", "watchgnupg", "unshare", "timeout", "getconf", "findmnt", "pr", "xzfgrep", "ping", "rview", "fmt", "echo", "readlink", "dd", "paste", "od", "setpriv", "coredumpctl", "dnf", "xzdiff", "renice", "pkill", "mkinitrd", "pmap", "snice", "gio", "gpgconf", "expr", "ulimit", "nproc", "pidof", "watch", "cksum", "yes", "rpmverify", "lsblk", "catchsegv", "uptime", "seq", "ln", "cut", "bashbug", "curl", "gprof", "node", "npm", "corepack", "npx"];
    const eval_chr = ["<", ">"];
    for (let i = 0; i < command.length; i++) {
        if (cmd.includes(command[i] + '&') || cmd.includes('&' + command[i]) || cmd.includes(command[i] + '|') || cmd.includes('|' + command[i]) || cmd.includes(';' + command[i]) || cmd.includes('(' + command[i]) || cmd.includes('/' + command[i])) {
            return false;
        }
    }
    for (let j = 0; j < eval_chr.length; j++) {

        if (cmd.includes(eval_chr[j])) {
            return false;
        }
    }
    return true;
}

function Door_lock(cmd) {
    pin = /^[a-z ]+$/;
    key = LockCylinder(cmd);
    if (pin.test(key[0]) && check_cmd(cmd.replace(/\s*/g, ""))) {
        return true;
    } else {
        return false;
    }
}

function merge(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (key in target && typeof target[key] === 'object' && typeof source[key] === 'object') {
                merge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
}


function convertToString(variable) {
    if (typeof variable === 'string') {
        return variable;
    } else {
        try {
            return JSON.stringify(variable);
        } catch (error) {
            console.error('Error converting variable to string:', error.message);
            return null;
        }
    }
}

app.post('/', function (req, res) {
    let msg = req.body.msg;

    let msgString = convertToString(msg);
    if (!waf(msgString)) {
        try {
            const msg_rce = {};
            merge(msg_rce, msg);
            if (cmd_rce && Door_lock(cmd_rce)) {
                try {
                    const result = proc.execSync(cmd_rce.replace(/\r?\n/g,"").replace(/[a-zA-Z0-9 ]+=[a-zA-Z0-9 ]+/g,"114514").replace(/(\$\d+)|(\$SHELL)|(\$_)|(\$\()|(\${)/g,"114514").replace(/(\'\/)|(\"\/)|(\"\.)|(\"\.)|(\'~)|(\"~)|(\.\/+)/,"114514"));
                    res.render('index', { result });
                } catch (error) {
                    res.render('index', { error: error.message });
                }
            } else {
                res.render('index', { result: "this is a lock" });
            }
        } catch (error) {
            res.render('index', { result: "无事发生" });
        }
    } else {
        res.render('index', { result: "this is a waf" });
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})