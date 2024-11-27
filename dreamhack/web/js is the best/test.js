const testConditions = (input) => {
    try {
        const result = input.length <= 6 && 
            (eval(input) > 0) == false && 
            (eval(input) == 0) == false && 
            (eval(input) >= 0) == true;
        
        if (result) {
            console.log(`Found solution! Input: ${input}`);
            console.log(`Length check: ${input.length <= 6}`);
            console.log(`eval(${input}) > 0 == false: ${(eval(input) > 0) == false}`);
            console.log(`eval(${input}) == 0 == false: ${(eval(input) == 0) == false}`);
            console.log(`eval(${input}) >= 0 == true: ${(eval(input) >= 0) == true}`);
            return true;
        }
    } catch (e) {
        // Silently ignore invalid expressions
    }
    return false;
};

// Test cases generator
const operators = ['~', '!', '+', '-', '*', '/', '%'];
const values = ['0', '1', '[]', '{}', '""', "''",'0n'];
const numbers = ['-1', '-0', '0', '1', '2'];

// Try single operators with values
operators.forEach(op => {
    values.forEach(val => {
        testConditions(`${op}${val}`);
    });
});

// Try combinations of operators
operators.forEach(op1 => {
    operators.forEach(op2 => {
        values.forEach(val => {
            testConditions(`${op1}${op2}${val}`);
        });
    });
});

// Try arithmetic expressions
numbers.forEach(n1 => {
    operators.forEach(op => {
        numbers.forEach(n2 => {
            testConditions(`${n1}${op}${n2}`);
        });
    });
});

// Try bitwise operations
numbers.forEach(n => {
    testConditions(`~${n}`);
});

// Try type coercion cases
const specialCases = [
    '+[]', '![]', '+{}', '!{}',
    '[]|0', '{}|0', '~[]', '~{}',
    '1/0', '0/0', '1e0', '1e1',
    '-0', '+0', '0n', '1n',
    '!0', '!1', '!!0', '!!1'
];

specialCases.forEach(testCase => {
    testConditions(testCase);
});