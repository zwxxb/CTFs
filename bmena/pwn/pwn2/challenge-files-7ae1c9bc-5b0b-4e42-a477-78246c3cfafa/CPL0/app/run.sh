#!/bin/sh
if [ -d "/app" ]; then
    cd /app
fi
./qemu-system-x86_64 \
    -L ./pc-bios \
    -m 64M \
    -nographic \
    -kernel bzImage \
    -initrd rootfs.cpio \
    -append "console=ttyS0 loglevel=3 oops=panic panic=-1" \
    -no-reboot \
    -cpu qemu64 \
    -monitor /dev/null \
    -sandbox on
