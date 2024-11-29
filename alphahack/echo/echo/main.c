#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUF_SIZE 0x100

/* he abs function in C has undefined behavior when called with INT_MIN (-2147483648 for 32-bit integers) because the positive equivalent (2147483648) exceeds the maximum value representable by a signed integer (2147483647).
When size is set to INT_MIN, abs(size) returns INT_MIN due to integer overflow. 

Bypassing Size Validation:
Input size = INT_MIN (-2147483648).
abs(INT_MIN) results in INT_MIN (-2147483648) due to overflow.
The condition (size = abs(size)) > BUF_SIZE evaluates to false because -2147483648 is not greater than 256.
Unsigned Conversion:
The negative size (-2147483648) is implicitly converted to an unsigned integer when passed to get_data.
This conversion results in a very large unsigned value (2147483648), bypassing the size check.
Buffer Overflow:
The get_data function reads 2147483648 bytes into a buffer that can only hold 256 bytes, leading to a buffer overflow.
This overflow can overwrite the return address of the echo function, redirecting execution to the win() function.

*/ 


/* Call this function! */
void win() {
  char *args[] = {"/bin/cat", "/flag.txt", NULL};
  execve(args[0], args, NULL);
  exit(1);
}

int get_size() {
  // Input size
  int size = 0;
  scanf("%d%*c", &size);

  // Validate size
  if ((size = abs(size)) > BUF_SIZE) {
    puts("[-] Invalid size");
    exit(1);
  }

  return size;
}

void get_data(char *buf, unsigned size) {
  unsigned i;
  char c;

  // Input data until newline
  for (i = 0; i < size; i++) {
    if (fread(&c, 1, 1, stdin) != 1) break;
    if (c == '\n') break;
    buf[i] = c;
  }
  buf[i] = '\0';
}

void echo() {
  int size;
  char buf[BUF_SIZE];

  // Input size
  printf("Size: ");
  size = get_size();

  // Input data
  printf("Data: ");
  get_data(buf, size);

  // Show data
  printf("Received: %s\n", buf);
}

int main() {
  setbuf(stdin, NULL);
  setbuf(stdout, NULL);
  echo();
  return 0;
}
