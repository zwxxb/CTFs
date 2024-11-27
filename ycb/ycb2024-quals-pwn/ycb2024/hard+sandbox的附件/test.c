#include<unistd.h>
#include<stdlib.h>
#include<sys/ptrace.h>
int main() {
	int child_pid=fork();
	if (!child_pid) {sleep(20);exit(0);}
	ptrace(PTRACE_SEIZE, child_pid, NULL, PTRACE_O_TRACESECCOMP);return 0;
}
