import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const AGENTS = [
  { name: "Planner Agent", status: "Reading your goal…" },
  { name: "Curriculum Agent", status: "Sequencing learning objectives…" },
  { name: "Content Agent", status: "Drafting lessons and examples…" },
  { name: "Assessment Agent", status: "Building quizzes and flashcards…" },
  { name: "QA Agent", status: "Reviewing for coherence and accuracy…" },
];

const COURSE_MODULES = [
  { title: "Introduction to Java", objective: "Understand Java basics, history, and how it works." },
  { title: "Setting Up Your Environment", objective: "Install JDK, set up an IDE, and write your first program." },
  { title: "Variables and Data Types", objective: "Learn how to store and work with data in Java." },
  { title: "Operators and Expressions", objective: "Use arithmetic, comparison, and logical operators." },
  { title: "Control Flow", objective: "Write if/else, switch, and loops to control program logic." },
  { title: "Methods and Functions", objective: "Break code into reusable methods with parameters and return values." },
  { title: "Arrays and Collections", objective: "Store and manipulate groups of data." },
  { title: "Object-Oriented Programming", objective: "Master classes, objects, inheritance, and polymorphism." },
  { title: "Exception Handling", objective: "Handle errors gracefully with try-catch blocks." },
  { title: "Building Your First Project", objective: "Combine everything into a complete Java application." },
];

function generateLesson(title: string, goal: string, objective: string, i: number): string {
  const lessons: Record<string, string> = {
    "Introduction to Java": `# Introduction to Java

## What You'll Learn
- What Java is and why it's so popular
- The history and evolution of Java
- Key features that make Java powerful
- How Java programs run (JVM, bytecode, compilation)

## Introduction
Java is one of the most widely-used programming languages in the world. Created by James Gosling at Sun Microsystems in 1995, Java was designed with a simple philosophy: **"Write Once, Run Anywhere."** This means Java code can run on any device that has a Java Virtual Machine (JVM), making it incredibly versatile.

## What Makes Java Special?

### 1. Platform Independence
Java code is compiled into **bytecode**, which runs on the JVM instead of directly on your operating system. This is what makes Java truly cross-platform.

### 2. Object-Oriented
Everything in Java is organized around **objects** and **classes**. This makes code modular, reusable, and easier to maintain.

### 3. Automatic Memory Management
Java handles memory allocation and deallocation automatically through a process called **Garbage Collection**, so developers don't have to manually free memory.

## Core Concepts

### The JVM (Java Virtual Machine)
The JVM is the engine that runs Java bytecode. It acts as an intermediary between your Java code and the underlying hardware.

\`\`\`
// This is how you run a Java program
// 1. Write .java file
// 2. Compile with: javac MyProgram.java
// 3. Run with: java MyProgram
\`\`\`

### Java Syntax Basics
Every Java program needs a class and a \`main\` method:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
\`\`\`

## Step-by-Step Guide
1. Understand that Java is compiled to bytecode
2. Learn that the JVM interprets bytecode at runtime
3. Recognize that this enables platform independence
4. Understand the role of the JDK (Java Development Kit)

## Real-World Use
Java powers billions of devices worldwide — from Android apps to enterprise banking systems, from scientific supercomputers to smart cards and IoT devices.

## Practice
1. Research and list 5 applications built with Java
2. Install the JDK on your computer
3. Write and run a "Hello World" program

## Common Beginner Mistakes
- **Forgetting semicolons** — Every statement in Java ends with \`;\`
- **Case sensitivity** — \`Hello\` and \`hello\` are different
- **Wrong file name** — The file must match the public class name

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Setting Up Your Environment": `# Setting Up Your Environment

## What You'll Learn
- How to install the Java Development Kit (JDK)
- Setting up an IDE (IntelliJ IDEA, Eclipse, or VS Code)
- Writing, compiling, and running your first Java program
- Understanding the classpath and project structure

## Introduction
Before you can write Java code, you need the right tools. The JDK includes everything you need to compile and run Java programs. A good IDE makes coding much easier with features like auto-completion, debugging, and error highlighting.

## Step 1: Install the JDK

### Download
Visit https://adoptium.net/ or https://oracle.com/java/technologies/ and download the latest LTS version (Java 17 or 21).

### Verify Installation
\`\`\`bash
java -version
javac -version
\`\`\`

### Set JAVA_HOME
\`\`\`bash
# macOS/Linux
export JAVA_HOME=$(/usr/libexec/java_home)
# Windows (in System Properties)
\`\`\`

## Step 2: Choose an IDE

| IDE | Best For | Cost |
|-----|----------|------|
| IntelliJ IDEA | Professional development | Free Community Edition |
| Eclipse | Enterprise projects | Free |
| VS Code | Lightweight, versatile | Free |

## Step 3: Your First Program

\`\`\`java
public class MyFirstApp {
    public static void main(String[] args) {
        System.out.println("I just set up my Java environment!");
        System.out.println("Java is ready to go!");
    }
}
\`\`\`

## Step-by-Step Guide
1. Install JDK (Java 17+ recommended)
2. Install your preferred IDE
3. Create a new Java project
4. Create a file named \`MyFirstApp.java\`
5. Write the code above
6. Compile: \`javac MyFirstApp.java\`
7. Run: \`java MyFirstApp\`

## Real-World Use
Every Java developer goes through this setup process. Once configured, you have a professional development environment capable of building anything from simple scripts to complex enterprise applications.

## Practice
1. Install the JDK and verify it works
2. Create and run a program that prints your name
3. Experiment with multiple \`System.out.println()\` statements

## Common Beginner Mistakes
- **Installing JRE instead of JDK** — You need the JDK, not just the JRE
- **Wrong JAVA_HOME path** — Double-check the path
- **File name mismatch** — The file name must exactly match the public class name

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Variables and Data Types": `# Variables and Data Types

## What You'll Learn
- How to declare and initialize variables
- Java's primitive data types
- When to use each data type
- Type casting and type conversion

## Introduction
Variables are like containers that store data in your program. Java is a **statically typed** language, meaning you must declare the type of data a variable will hold before using it.

## Primitive Data Types

| Type | Size | Default | Example |
|------|------|---------|---------|
| \`int\` | 4 bytes | 0 | \`int age = 25;\` |
| \`double\` | 8 bytes | 0.0 | \`double price = 19.99;\` |
| \`boolean\` | 1 byte | false | \`boolean active = true;\` |
| \`char\` | 2 bytes | '\\u0000' | \`char grade = 'A';\` |
| \`long\` | 8 bytes | 0L | \`long pop = 8000000L;\` |

## Declaring Variables

\`\`\`java
// Declaration + initialization
int score = 95;
double temperature = 36.5;
boolean isJavaFun = true;
String name = "Alice";

// Multiple declarations
int x = 10, y = 20, z = 30;
\`\`\`

## Type Casting

\`\`\`java
// Widening (automatic)
int myInt = 100;
double myDouble = myInt; // 100.0

// Narrowing (manual)
double myDouble2 = 9.78;
int myInt2 = (int) myDouble2; // 9
\`\`\`

## String Operations

\`\`\`java
String greeting = "Hello, Java!";
System.out.println(greeting.length());    // 12
System.out.println(greeting.toUpperCase()); // HELLO, JAVA!
System.out.println(greeting.contains("Java")); // true
\`\`\`

## Step-by-Step Guide
1. Choose the appropriate data type for your data
2. Declare variables with meaningful names
3. Initialize them with values
4. Use them in your program logic

## Practice
1. Create variables for name, age, height, and isStudent
2. Print them all using System.out.println()
3. Try converting between int and double

## Common Beginner Mistakes
- **Using \`=\` instead of \`==\`** — \`=\` assigns, \`==\` compares
- **Forgetting \`L\` suffix for longs** — \`long x = 10000000000;\` will error without \`L\`
- **String comparison with \`==\`** — Use \`.equals()\` for strings

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Operators and Expressions": `# Operators and Expressions

## What You'll Learn
- Arithmetic operators for math operations
- Comparison operators for evaluating conditions
- Logical operators for combining conditions
- Assignment and unary operators

## Introduction
Operators are symbols that perform operations on variables and values. Java has several categories of operators that let you manipulate data, make comparisons, and control program flow.

## Arithmetic Operators

\`\`\`java
int a = 10, b = 3;
System.out.println(a + b); // 13 (addition)
System.out.println(a - b); // 7  (subtraction)
System.out.println(a * b); // 30 (multiplication)
System.out.println(a / b); // 3  (division)
System.out.println(a % b); // 1  (modulus/remainder)
\`\`\`

## Comparison Operators

\`\`\`java
System.out.println(a == b); // false (equal)
System.out.println(a != b); // true  (not equal)
System.out.println(a > b);  // true  (greater than)
System.out.println(a < b);  // false (less than)
System.out.println(a >= b); // true  (greater or equal)
\`\`\`

## Logical Operators

\`\`\`java
boolean x = true, y = false;
System.out.println(x && y); // false (AND)
System.out.println(x || y); // true  (OR)
System.out.println(!x);     // false (NOT)
\`\`\`

## Compound Assignment

\`\`\`java
int n = 10;
n += 5;  // n = 15
n *= 2;  // n = 30
n++;     // n = 31 (increment)
\`\`\`

## Step-by-Step Guide
1. Master arithmetic operators for calculations
2. Use comparison operators in conditions
3. Combine conditions with logical operators
4. Use compound operators for cleaner code

## Practice
1. Calculate the area of a rectangle using variables
2. Write a condition that checks if a number is even AND positive
3. Create a simple grade calculator using operators

## Common Beginner Mistakes
- **Integer division** — \`5 / 2\` gives \`2\`, not \`2.5\` (use double for decimals)
- **Confusing \`&&\` and \`||\`** — AND needs both true, OR needs only one
- **Order of operations** — Use parentheses for clarity

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Control Flow": `# Control Flow

## What You'll Learn
- Making decisions with if/else statements
- Using switch statements for multiple conditions
- Looping with for, while, and do-while
- Using break and continue

## Introduction
Control flow statements let your program make decisions and repeat actions. Without them, programs would just execute one instruction after another in a straight line.

## If-Else Statements

\`\`\`java
int age = 18;

if (age >= 18) {
    System.out.println("You are an adult");
} else if (age >= 13) {
    System.out.println("You are a teenager");
} else {
    System.out.println("You are a child");
}
\`\`\`

## Switch Statements

\`\`\`java
int day = 3;
String dayName;

switch (day) {
    case 1: dayName = "Monday"; break;
    case 2: dayName = "Tuesday"; break;
    case 3: dayName = "Wednesday"; break;
    default: dayName = "Unknown";
}
\`\`\`

## For Loops

\`\`\`java
// Print numbers 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println("Number: " + i);
}

// Enhanced for loop (for arrays)
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
\`\`\`

## While Loops

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}
\`\`\`

## Step-by-Step Guide
1. Start with if/else for simple decisions
2. Use switch when checking one variable against many values
3. Use for loops when you know how many iterations
4. Use while loops when the number of iterations is unknown

## Practice
1. Write a program that checks if a number is positive, negative, or zero
2. Create a loop that prints the multiplication table of 7
3. Build a simple number guessing game

## Common Beginner Mistakes
- **Infinite loops** — Make sure your loop condition eventually becomes false
- **Off-by-one errors** — Remember that indices start at 0
- **Missing break in switch** — Without \`break\`, execution "falls through"

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Methods and Functions": `# Methods and Functions

## What You'll Learn
- How to declare and call methods
- Parameters and arguments
- Return values and the return statement
- Method overloading
- Scope of variables

## Introduction
Methods (called "functions" in some languages) let you package code into reusable blocks. Instead of writing the same logic over and over, you write it once in a method and call it whenever needed.

## Basic Method Syntax

\`\`\`java
// Method declaration
public static int add(int a, int b) {
    return a + b;
}

// Method call
int sum = add(5, 3); // sum = 8
\`\`\`

## Method Components

| Part | Description |
|------|-------------|
| Access modifier | \`public\`, \`private\`, \`protected\` |
| Return type | What the method gives back (\`int\`, \`String\`, \`void\`) |
| Method name | What you call it by |
| Parameters | Input values in parentheses |
| Body | The code that runs |

## Method Overloading

\`\`\`java
// Same name, different parameters
public static int multiply(int a, int b) {
    return a * b;
}

public static double multiply(double a, double b) {
    return a * b;
}
\`\`\`

## Variable Scope

\`\`\`java
public class ScopeDemo {
    static int global = 100; // class scope

    public static void main(String[] args) {
        int local = 50; // method scope
        if (true) {
            int block = 25; // block scope
        }
    }
}
\`\`\`

## Step-by-Step Guide
1. Identify reusable pieces of logic
2. Give them descriptive names
3. Define parameters for flexibility
4. Return meaningful results
5. Call your methods from main()

## Practice
1. Write a method that checks if a number is prime
2. Create a method that reverses a string
3. Build a calculator with separate methods for each operation

## Common Beginner Mistakes
- **Forgetting \`return\`** — Non-void methods must return a value
- **Wrong parameter types** — Make sure arguments match the parameter types
- **Confusing parameters with arguments** — Parameters are in the method definition; arguments are passed when calling

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Arrays and Collections": `# Arrays and Collections

## What You'll Learn
- Creating and using arrays
- Accessing and modifying array elements
- The Collections Framework (ArrayList, HashMap)
- When to use arrays vs collections

## Introduction
Arrays and collections let you store multiple values in a single variable. Arrays are fixed-size, while collections are dynamic and more flexible. Both are essential for managing groups of related data.

## Arrays

\`\`\`java
// Declaration and initialization
int[] scores = {95, 87, 92, 78, 88};

// Access elements
System.out.println(scores[0]);  // 95 (first element)
System.out.println(scores.length); // 5

// Multi-dimensional arrays
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\`

## ArrayList

\`\`\`java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();

// Add elements
names.add("Alice");
names.add("Bob");
names.add("Charlie");

// Access elements
System.out.println(names.get(0));    // Alice
System.out.println(names.size());    // 3

// Remove elements
names.remove("Bob");

// Iterate
for (String name : names) {
    System.out.println(name);
}
\`\`\`

## HashMap

\`\`\`java
import java.util.HashMap;

HashMap<String, Integer> ages = new HashMap<>();
ages.put("Alice", 25);
ages.put("Bob", 30);

System.out.println(ages.get("Alice")); // 25
System.out.println(ages.containsKey("Bob")); // true
\`\`\`

## Step-by-Step Guide
1. Use arrays when you know the size upfront
2. Use ArrayList when you need a dynamic list
3. Use HashMap for key-value pairs
4. Choose the right collection for your use case

## Practice
1. Create an array of 10 integers and find the sum
2. Build an ArrayList of student names
3. Create a HashMap mapping student names to their grades

## Common Beginner Mistakes
- **ArrayIndexOutOfBoundsException** — Accessing index >= length
- **Forgetting to import** — \`ArrayList\` needs \`java.util.ArrayList\`
- **Using == for objects** — Use \`.equals()\` to compare collection contents

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Object-Oriented Programming": `# Object-Oriented Programming

## What You'll Learn
- Classes and Objects
- Constructors and the \`this\` keyword
- Inheritance and polymorphism
- Encapsulation with access modifiers
- Abstract classes and interfaces

## Introduction
Java is an **object-oriented** language. Everything revolves around **objects** — instances of **classes**. OOP helps you organize code into reusable, modular pieces that model real-world entities.

## Classes and Objects

\`\`\`java
// Class definition (blueprint)
public class Dog {
    String name;
    int age;

    // Constructor
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method
    public void bark() {
        System.out.println(name + " says woof!");
    }
}

// Creating objects
Dog myDog = new Dog("Rex", 3);
myDog.bark(); // Rex says woof!
\`\`\`

## Inheritance

\`\`\`java
// Parent class
public class Animal {
    public void eat() {
        System.out.println("Eating...");
    }
}

// Child class inherits from Animal
public class Cat extends Animal {
    public void meow() {
        System.out.println("Meow!");
    }
}
\`\`\`

## Encapsulation

\`\`\`java
public class BankAccount {
    private double balance; // private = encapsulated

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}
\`\`\`

## The Four Pillars of OOP

| Pillar | Description |
|--------|-------------|
| **Encapsulation** | Hiding internal data, exposing only what's needed |
| **Abstraction** | Hiding complexity, showing only essentials |
| **Inheritance** | Child classes reuse parent class code |
| **Polymorphism** | Same method, different behavior |

## Step-by-Step Guide
1. Design your class with fields and methods
2. Use constructors for initialization
3. Use inheritance to avoid code duplication
4. Protect data with private fields and getters/setters

## Practice
1. Create a \`Car\` class with make, model, and year
2. Create a \`Student\` class that extends a \`Person\` class
3. Build a simple banking system using encapsulation

## Common Beginner Mistakes
- **Not using access modifiers** — Always declare fields as \`private\`
- **Deep inheritance hierarchies** — Keep it simple, prefer composition
- **Forgetting \`super()\`** — Child constructors call parent constructors first

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Exception Handling": `# Exception Handling

## What You'll Learn
- What exceptions are and why they happen
- The try-catch-finally structure
- Different types of exceptions (checked vs unchecked)
- Throwing custom exceptions
- Best practices for error handling

## Introduction
An **exception** is an event that disrupts the normal flow of a program. Java provides a robust exception handling mechanism that lets you gracefully handle errors instead of crashing the program.

## Try-Catch Block

\`\`\`java
try {
    int result = 10 / 0; // This throws ArithmeticException
    System.out.println(result);
} catch (ArithmeticException e) {
    System.out.println("Error: Cannot divide by zero!");
} finally {
    System.out.println("This always runs");
}
\`\`\`

## Types of Exceptions

| Type | Examples | Handling |
|------|----------|----------|
| Checked | IOException, SQLException | Must be caught or declared |
| Unchecked | NullPointerException, ArithmeticException | Optional to catch |

## Multiple Catch Blocks

\`\`\`java
try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[5]);
    int x = 10 / 0;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid index!");
} catch (ArithmeticException e) {
    System.out.println("Math error!");
} catch (Exception e) {
    System.out.println("General error: " + e.getMessage());
}
\`\`\`

## Throwing Exceptions

\`\`\`java
public void setAge(int age) throws IllegalArgumentException {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age: " + age);
    }
    this.age = age;
}
\`\`\`

## Step-by-Step Guide
1. Wrap risky code in try blocks
2. Catch specific exceptions first, general ones last
3. Use finally for cleanup (closing files, connections)
4. Create custom exceptions for domain-specific errors

## Practice
1. Write a program that handles division by zero
2. Create a custom \`InvalidAgeException\`
3. Build a file reader that handles file-not-found errors

## Common Beginner Mistakes
- **Catching \`Exception\` too broadly** — Catch specific exceptions first
- **Swallowing exceptions** — Always log or handle errors properly
- **Empty catch blocks** — At minimum, print the error message

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Debugging": `# Debugging

## What You'll Learn
- Using IDE debuggers effectively
- Reading stack traces
- Common debugging strategies
- Logging best practices

## Introduction
Debugging is the process of finding and fixing errors in your code. Every programmer debugs — it's not a sign of failure, it's a core skill. Learning to debug efficiently will save you hours of frustration.

## Using the Debugger

\`\`\`java
public class DebugDemo {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        int c = divide(a, b); // Set breakpoint here
        System.out.println(c);
    }

    public static int divide(int x, int y) {
        return x / y; // Inspect variables here
    }
}
\`\`\`

## Reading Stack Traces
When Java crashes, it prints a **stack trace**:

\`\`\`java
Exception in thread "main" java.lang.ArithmeticException: / by zero
    at DebugDemo.divide(DebugDemo.java:10)
    at DebugDemo.main(DebugDemo.java:5)
\`\`\`
The first line tells you WHAT happened. The rest tells you WHERE.

## Common Debugging Strategies

1. **Read the error message carefully** — It usually tells you exactly what's wrong
2. **Use print statements** — \`System.out.println()\` is your friend
3. **Check the stack trace** — It points to the exact line causing the issue
4. **Isolate the problem** — Comment out code to narrow down the issue
5. **Google the error** — Someone else has definitely had the same problem

## Step-by-Step Guide
1. Reproduce the bug consistently
2. Read any error messages or stack traces
3. Set breakpoints in your IDE
4. Step through code line by line
5. Inspect variable values at each step
6. Fix and verify the fix

## Practice
1. Intentionally create a \`NullPointerException\` and fix it
2. Use your IDE's debugger to trace a loop
3. Read and interpret a stack trace

## Common Beginner Mistakes
- **Not reading the full error message** — The answer is usually in the first line
- **Changing random things** — Understand the problem before fixing it
- **Not using a debugger** — Stop debugging with print statements alone

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Testing": `# Testing

## What You'll Learn
- Why testing matters
- JUnit basics and assertions
- Writing test cases
- Test-driven development (TDD) basics

## Introduction
Testing ensures your code works correctly and continues to work as you make changes. Well-tested code is more reliable, easier to refactor, and gives you confidence when deploying.

## JUnit Basics

\`\`\`java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {

    @Test
    public void testAddition() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    public void testDivision() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class, () -> {
            calc.divide(10, 0);
        });
    }
}
\`\`\`

## Assertion Methods

| Method | Description |
|--------|-------------|
| \`assertEquals(expected, actual)\` | Values are equal |
| \`assertTrue(condition)\` | Condition is true |
| \`assertFalse(condition)\` | Condition is false |
| \`assertNull(object)\` | Object is null |
| \`assertThrows(Exception.class, code)\` | Code throws expected exception |

## Writing Good Tests

\`\`\`java
// GOOD: Clear test name, single assertion focus
@Test
void shouldReturnTrueWhenEmailIsValid() {
    assertTrue(EmailValidator.isValid("test@example.com"));
}

// BAD: Unclear name, multiple unrelated assertions
@Test
void testStuff() {
    assertTrue(add(1,1) == 2);
    assertFalse(isEven(3));
    assertEquals(5, multiply(2,3));
}
\`\`\`

## Step-by-Step Guide
1. Add JUnit dependency to your project
2. Create a test class for each main class
3. Write tests for normal cases and edge cases
4. Run tests and ensure they pass
5. Run tests after every code change

## Practice
1. Write tests for the \`Calculator\` class
2. Create a test that verifies a \`BankAccount\` rejects negative deposits
3. Practice TDD: write the test first, then the implementation

## Common Beginner Mistakes
- **Testing implementation, not behavior** — Test what the code does, not how
- **Not testing edge cases** — Test with 0, null, negative numbers, empty strings
- **Ignoring failing tests** — A failing test means something is broken

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Performance": `# Performance

## What You'll Learn
- Time complexity and Big O notation
- Choosing the right data structures
- Avoiding performance pitfalls
- Profiling and optimization basics

## Introduction
Writing code that works is one thing; writing code that performs well is another. Understanding performance helps you write efficient programs that scale as your data grows.

## Big O Notation

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Accessing an array element |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Looping through an array |
| O(n²) | Quadratic | Nested loops |
| O(2^n) | Exponential | Recursive Fibonacci |

## Choosing Data Structures

\`\`\`java
// Need fast lookups? Use HashMap
HashMap<String, Integer> map = new HashMap<>();
map.get("key"); // O(1) average

// Need ordered items? Use ArrayList
ArrayList<String> list = new ArrayList<>();
list.get(i); // O(1)

// Need to check membership? Use HashSet
HashSet<Integer> set = new HashSet<>();
set.contains(42); // O(1)
\`\`\`

## Performance Pitfalls

\`\`\`java
// BAD: O(n²) - nested loop
for (int i = 0; i < list.size(); i++) {
    for (int j = 0; j < list.size(); j++) {
        // Do something
    }
}

// GOOD: O(n) - single loop
for (String item : list) {
    // Do something
}
\`\`\`

## Step-by-Step Guide
1. Learn Big O notation for common operations
2. Profile your code to find bottlenecks
3. Choose the right data structure for the task
4. Optimize only when necessary (premature optimization is bad)

## Practice
1. Compare the performance of ArrayList vs LinkedList for different operations
2. Write a search algorithm and analyze its Big O
3. Refactor an O(n²) solution to O(n)

## Common Beginner Mistakes
- **Using ArrayList.contains() in a loop** — Use a HashSet for O(1) lookups
- **String concatenation in loops** — Use StringBuilder instead
- **Premature optimization** — Make it work first, then optimize if needed

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Real-World Project": `# Building Your First Project

## What You'll Learn
- Planning a Java application from scratch
- Structuring a multi-class project
- Combining everything you've learned
- Best practices for clean, maintainable code

## Introduction
Now it's time to put everything together! You'll build a complete **Student Grade Management System** — a console application that stores student records, calculates grades, and generates reports.

## Project Structure

\`\`\`
GradeManager/
├── src/
│   ├── Main.java           # Entry point
│   ├── Student.java        # Student class
│   ├── Course.java         # Course class
│   ├── GradeManager.java   # Main logic
│   └── GradeReport.java    # Report generation
\`\`\`

## The Student Class

\`\`\`java
public class Student {
    private String name;
    private String id;
    private HashMap<String, Double> grades;

    public Student(String name, String id) {
        this.name = name;
        this.id = id;
        this.grades = new HashMap<>();
    }

    public void addGrade(String course, double grade) {
        grades.put(course, grade);
    }

    public double getGPA() {
        return grades.values().stream()
            .mapToDouble(Double::doubleValue)
            .average().orElse(0.0);
    }
}
\`\`\`

## The Grade Manager

\`\`\`java
public class GradeManager {
    private ArrayList<Student> students;

    public GradeManager() {
        students = new ArrayList<>();
    }

    public void addStudent(Student s) {
        students.add(s);
    }

    public Student findStudent(String id) {
        for (Student s : students) {
            if (s.getId().equals(id)) return s;
        }
        return null;
    }

    public void generateReport() {
        for (Student s : students) {
            System.out.println(s.getName() + ": GPA = " + s.getGPA());
        }
    }
}
\`\`\`

## Step-by-Step Guide
1. Plan your classes and their relationships
2. Write one class at a time
3. Test each class independently
4. Connect everything in the main program
5. Add error handling for edge cases

## Practice
1. Add the ability to remove students
2. Implement a search feature by name
3. Add grade thresholds (A, B, C, D, F)

## Common Beginner Mistakes
- **Not planning first** — Sketch your design before coding
- **God classes** — Keep classes focused on one responsibility
- **Hardcoding values** — Use constants or configuration

## Quick Check
Test your understanding with the quiz in the Practice tab!`,

    "Next Steps": `# Next Steps

## What You'll Learn
- How to continue your Java learning journey
- Key areas to explore next (frameworks, tools)
- Building a portfolio of projects
- Joining the Java community

## Introduction
Congratulations on completing this course! You now have a solid foundation in Java programming. But this is just the beginning — there's always more to learn and build.

## What to Learn Next

| Area | Why It Matters | Resources |
|------|---------------|-----------|
| **Spring Boot** | Build web apps and APIs | spring.io/guides |
| **Maven/Gradle** | Dependency management and builds | Official docs |
| **Databases (JDBC, JPA)** | Persist and query data | Hibernate docs |
| **Testing (JUnit, Mockito)** | Write better tests | junit.org |
| **Design Patterns** | Write cleaner, scalable code | "Head First Design Patterns" |
| **Multithreading** | Handle concurrent operations | Oracle Java tutorials |

## Building Projects
The best way to learn is by building. Here are project ideas:

1. **To-Do List App** — Practice CRUD with a GUI or CLI
2. **Weather App** — Use APIs and JSON parsing
3. **Chat Application** — Learn networking and sockets
4. **E-commerce Backend** — Practice Spring Boot and databases
5. **Code Editor** — Build a simple IDE with syntax highlighting

## Community Resources
- **Stack Overflow** — Ask questions, help others
- **GitHub** — Share your projects, explore open source
- **Reddit r/java** — News and discussions
- **Java Discord servers** — Real-time chat with other developers

## Step-by-Step Guide
1. Pick one area to specialize in (web dev, data, mobile)
2. Build 2-3 projects in that area
3. Contribute to open-source Java projects
4. Prepare for technical interviews
5. Consider certifications (Oracle Certified Professional)

## Practice
1. Star 5 Java projects on GitHub
2. Build a small project this week
3. Join one Java community and introduce yourself

## Common Beginner Mistakes
- **Tutorial hell** — Stop watching, start building
- **Ignoring best practices** — Learn clean code early
- **Not version controlling** — Use Git from day one

## Quick Check
Test your understanding with the quiz in the Practice tab!`,
  };

  return lessons[title] || `# ${title}

## Introduction
Welcome to Module ${i + 1}: ${title}. In this lesson, we'll explore the key concepts and practical techniques you need to master this topic.

## Core Concepts

### Understanding the Basics
Let's start with the fundamentals. Every expert was once a beginner, and the key to mastery is building a strong foundation.

### Key Principles
1. Start with the fundamentals
2. Practice consistently
3. Apply concepts to real problems
4. Review and refine your understanding

## Examples

### Practical Example
\`\`\`java
// A simple demonstration
public class Example {
    public static void main(String[] args) {
        System.out.println("Learning ${title}!");
    }
}
\`\`\`

## Step-by-Step Guide
1. Understand the core concepts
2. Practice with simple examples
3. Apply to more complex scenarios
4. Review and reinforce your knowledge

## Real-World Use
These concepts are used daily by professional Java developers to build robust, scalable applications.

## Practice
1. Complete the exercises in this module
2. Build a small project using what you learned
3. Review and revisit difficult concepts

## Common Beginner Mistakes
- **Rushing through fundamentals** — Take your time
- **Not practicing enough** — Code every day
- **Ignoring errors** — Read error messages carefully

## Quick Check
Test your understanding with the quiz in the Practice tab!`;
}

function generateQuiz(title: string, objective: string, i: number) {
  const questionBank: Record<string, { q: string; choices: string[]; answer_index: number }[]> = {
    "Introduction to Java": [
      { q: "What is the output?\n```java\npublic class Test {\n    public static void main(String[] args) {\n        System.out.println(3 + 4 + \"5\");\n        System.out.println(\"3\" + 4 + 5);\n    }\n}```", choices: ["75, 345", "7, 345", "75, 9", "7, 9"], answer_index: 0 },
      { q: "What is the output?\n```java\nint x = 010;\nSystem.out.println(x);\n```", choices: ["8", "10", "0", "Compilation error"], answer_index: 0 },
      { q: "Which statement about Java bytecode is TRUE?", choices: ["It runs on any OS with a JVM installed", "It is machine-specific binary code", "It runs directly on the CPU", "It is the same as source code"], answer_index: 0 },
      { q: "What is the output?\n```java\nSystem.out.println(1.0 / 0.0);\nSystem.out.println(1 / 0);\n```", choices: ["Infinity, then ArithmeticException", "0, then Infinity", "Infinity, Infinity", "ArithmeticException, then Infinity"], answer_index: 0 },
      { q: "Java was originally designed for which type of device?", choices: ["Set-top boxes and handheld devices", "Desktop computers only", "Web browsers", "Mobile phones"], answer_index: 0 },
      { q: "What does the 'static' keyword in main() mean?", choices: ["The method belongs to the class, not an instance", "The method runs only once", "The method cannot be overridden", "The method is hidden from other classes"], answer_index: 0 },
      { q: "Which memory area stores class-level data (static variables)?", choices: ["Metaspace / Method Area", "Stack", "Heap", "PC Register"], answer_index: 0 },
      { q: "What is the output?\n```java\nSystem.out.println(Math.floor(-2.5));\nSystem.out.println(Math.round(-2.5));\n```", choices: ["-3.0, -2", "-2.0, -3", "-2.0, -2", "-3.0, -3"], answer_index: 0 },
      { q: "Why can't Java be called a 'pure' OOP language?", choices: ["It has primitive types that are not objects", "It supports multiple inheritance", "It has pointers", "It lacks encapsulation"], answer_index: 0 },
      { q: "Which tool in JDK converts .java to .class?", choices: ["javac", "java", "jar", "javadoc"], answer_index: 0 },
      { q: "What is the output?\n```java\nInteger a = 128;\nInteger b = 128;\nSystem.out.println(a == b);\nInteger c = 127;\nInteger d = 127;\nSystem.out.println(c == d);\n```", choices: ["false, true", "true, true", "true, false", "false, false"], answer_index: 0 },
      { q: "JIT compiler stands for:", choices: ["Just-In-Time", "Java Intermediate Translator", "Joint Integration Test", "Just-In-Thread"], answer_index: 0 },
      { q: "What is NOT a JVM language?", choices: ["Kotlin is a JVM language", "Groovy is a JVM language", "Scala is a JVM language", "None of the above — all are JVM languages"], answer_index: 3 },
      { q: "The default value of a static variable of type int is:", choices: ["0", "null", "1", "undefined"], answer_index: 0 },
      { q: "What happens if you run `java MyClass` but the class has no main()?", choices: ["Error: Main method not found", "It runs fine", "Compiler warning", "It runs with default args"], answer_index: 0 },
    ],
    "Setting Up Your Environment": [
      { q: "What is the output?\n```bash\n$ javac Hello.java\n$ ls\n```\nWhich files exist now?", choices: ["Hello.java and Hello.class", "Only Hello.java", "Hello.java, Hello.class, and Hello.exe", "No output shown"], answer_index: 0 },
      { q: "What does this error mean?\n```\nerror: incompatible types: String cannot be converted to int\nint x = \"42\";\n```", choices: ["Java cannot implicitly cast String to int", "The variable name is wrong", "Missing semicolon", "Wrong JDK version"], answer_index: 0 },
      { q: "Which command shows ALL installed JDK versions on macOS?", choices: ["/usr/libexec/java_home -V", "java --list", "javac --versions", "ls /Library/Java"], answer_index: 0 },
      { q: "What is the correct JAVA_HOME on macOS if JDK 17 is installed?", choices: ["/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home", "/usr/bin/java", "/opt/java", "/usr/local/jdk"], answer_index: 0 },
      { q: "Which statement about the classpath is FALSE?", choices: ["The current directory is always in the classpath", "Multiple paths are separated by colon on macOS/Linux", "It tells JVM where to find .class files", "It is not needed if you run from the project root"], answer_index: 3 },
      { q: "VS Code needs which extension for Java debugging?", choices: ["Extension Pack for Java", "Debugger for Chrome", "Java Extension Pack by Sun", "JDT Debugger"], answer_index: 0 },
      { q: "What is the difference between JDK and JRE?", choices: ["JDK has compiler + JRE; JRE only runs apps", "JRE has compiler; JDK doesn't", "JDK is for development, JRE for servers only", "No difference — they're the same"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic class Test {\n    public static void main(String[] args) {\n        System.out.println(args[0]);\n    }\n}\n$ java Test hello\n```", choices: ["hello", "Test", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "Adoptium (formerly AdoptOpenJDK) provides:", choices: ["Free, open-source JDK builds", "Oracle's commercial JDK", "Only JRE binaries", "Android SDK"], answer_index: 0 },
      { q: "Which file is NOT produced by the Java build process?", choices: [".java", ".class", ".jar", "All are produced at some stage"], answer_index: 0 },
      { q: "LTS versions of Java receive updates for how long?", choices: ["At least 8 years", "2 years", "6 months", "Until next release"], answer_index: 0 },
      { q: "What does `System.out.printf(\"%d\", 42)` do?", choices: ["Prints 42 (formatted)", "Prints %d42", "Compilation error", "Prints nothing"], answer_index: 0 },
      { q: "Which IDE offers the best free Java support for beginners?", choices: ["IntelliJ IDEA Community Edition", "All are equally good", "VS Code", "Eclipse"], answer_index: 0 },
      { q: "Package-private access means:", choices: ["Visible only within the same package", "Visible everywhere", "Visible only to subclasses", "Visible to the class only"], answer_index: 0 },
      { q: "What is the correct way to set JAVA_HOME permanently on macOS?", choices: ["Add to ~/.zshrc or ~/.bash_profile", "Edit /etc/paths", "Run export once", "It is set automatically"], answer_index: 0 },
    ],
    "Variables and Data Types": [
      { q: "What is the output?\n```java\nshort s = 1000;\nbyte b = (byte) s;\nSystem.out.println(b);\n```", choices: ["-24", "1000", "Compilation error", "24"], answer_index: 0 },
      { q: "What is the output?\n```java\nString a = new String(\"hello\");\nString b = \"hello\";\nSystem.out.println(a == b);\nSystem.out.println(a.equals(b));\n```", choices: ["false, true", "true, true", "true, false", "false, false"], answer_index: 0 },
      { q: "What is the size of a char in Java?", choices: ["2 bytes (16-bit Unicode)", "1 byte", "4 bytes", "8 bytes"], answer_index: 0 },
      { q: "What is the output?\n```java\nfloat f = 10.5;\ndouble d = 10.5;\nSystem.out.println(f == d);\n```", choices: ["Compilation error", "true", "false", "Runtime error"], answer_index: 0 },
      { q: "Which is the correct way to define a constant in Java?", choices: ["final int MAX = 100;", "const int MAX = 100;", "static int MAX = 100;", "int final MAX = 100;"], answer_index: 0 },
      { q: "What is the output?\n```java\nint x = 5;\nSystem.out.println(x++ + ++x);\n```", choices: ["12", "11", "10", "Compilation error"], answer_index: 0 },
      { q: "What does `instanceof` check?", choices: ["Whether an object is an instance of a specific type", "Whether a variable is initialized", "Whether a class is abstract", "Whether an interface is implemented"], answer_index: 0 },
      { q: "What is the default value of a reference variable (non-primitive)?", choices: ["null", "undefined", "0", "Compilation error"], answer_index: 0 },
      { q: "Which is a valid variable name in Java?", choices: ["_value", "2value", "value-name", "class"], answer_index: 0 },
      { q: "What is the output?\n```java\nSystem.out.println(Integer.MIN_VALUE - 1);\nSystem.out.println(Integer.MAX_VALUE + 1);\n```", choices: ["2147483647, -2147483648", "Compilation error, Compilation error", "-2147483649, 2147483647", "0, 0"], answer_index: 0 },
      { q: "StringBuffer vs StringBuilder difference:", choices: ["StringBuffer is thread-safe, StringBuilder is not", "StringBuilder is thread-safe, StringBuffer is not", "No difference", "StringBuilder is faster in single-threaded contexts"], answer_index: 0 },
      { q: "What is the output?\n```java\nchar c = 'A';\nc++;\nSystem.out.println(c);\n```", choices: ["B", "66", "A", "Compilation error"], answer_index: 0 },
      { q: "Which wrapper class is used for char?", choices: ["Character", "Char", "String", "Varchar"], answer_index: 0 },
      { q: "What is autoboxing?", choices: ["Automatic conversion between primitives and their wrapper classes", "Automatic garbage collection", "Auto-complete in IDEs", "Automatic memory allocation"], answer_index: 0 },
      { q: "Which type has the largest range?", choices: ["double", "long", "float", "int"], answer_index: 0 },
    ],
    "Operators and Expressions": [
      { q: "What is the output?\n```java\nint a = 5, b = 2;\nSystem.out.println(a / b * b + a % b);\n```", choices: ["5", "4", "6", "2"], answer_index: 0 },
      { q: "What is the output?\n```java\nint x = 10;\nSystem.out.println(x++ + ++x);\n```", choices: ["22", "21", "23", "20"], answer_index: 0 },
      { q: "What is the output?\n```java\nSystem.out.println(10 & 4);\nSystem.out.println(10 | 4);\nSystem.out.println(10 ^ 4);\n```", choices: ["0, 14, 14", "4, 14, 10", "0, 14, 10", "14, 0, 10"], answer_index: 0 },
      { q: "What does `>>>` do (unsigned right shift)?", choices: ["Shifts right and fills with zeros", "Shifts right and fills with sign bit", "Rotates bits left", "Logical AND operation"], answer_index: 0 },
      { q: "What is the output?\n```java\nboolean a = true, b = false;\nSystem.out.println(a ^ b);\nSystem.out.println(!a & b);\n```", choices: ["true, false", "true, true", "false, false", "false, true"], answer_index: 0 },
      { q: "Which operator has highest precedence?", choices: ["postfix ++ --", "multiplication *", "addition +", "assignment ="], answer_index: 0 },
      { q: "What is the output?\n```java\nint a = 5;\nSystem.out.println(a = a + 10);\nSystem.out.println(a == 15 ? 1 : 0);\n```", choices: ["15, 1", "10, 1", "15, 0", "10, 0"], answer_index: 0 },
      { q: "What is `(int) (Math.random() * 10)` guaranteed to return?", choices: ["0 to 9 inclusive", "1 to 10 inclusive", "0 to 10 inclusive", "1 to 9 inclusive"], answer_index: 0 },
      { q: "What is the output?\n```java\nSystem.out.println(5 + 'A');\nSystem.out.println('A' + 1);\n```", choices: ["70, 66", "5A, B", "Compilation error, 66", "A5, 66"], answer_index: 0 },
      { q: "Short-circuit evaluation: what is the output?\n```java\nint x = 0;\nboolean result = (x != 0) && (10 / x > 1);\nSystem.out.println(result);\n```", choices: ["false (no exception)", "true", "ArithmeticException", "Compilation error"], answer_index: 0 },
      { q: "The += operator with a String causes:", choices: ["String concatenation", "Compilation error", "Runtime error", "Numeric addition"], answer_index: 0 },
      { q: "What is the output?\n```java\nint a = 1, b = 2, c = 3;\na += b += c;\nSystem.out.println(a + b + c);\n```", choices: ["9", "8", "10", "7"], answer_index: 0 },
      { q: "Which is NOT a relational operator in Java?", choices: ["= =", ">=", "!=", "<="], answer_index: 0 },
      { q: "`String s = null; System.out.println(s instanceof String);` — what happens?", choices: ["false", "true", "Compilation error", "NullPointerException"], answer_index: 0 },
      { q: "What is the output?\n```java\nSystem.out.println(~5);\n```", choices: ["-6", "6", "-5", "5"], answer_index: 0 },
    ],
    "Control Flow": [
      { q: "What is the output?\n```java\nfor (int i = 0; i < 3; i++) {\n    if (i == 1) continue;\n    System.out.print(i + \" \");\n}\n```", choices: ["0 2", "0 1 2", "1 2", "0"], answer_index: 0 },
      { q: "What is the output?\n```java\nint i = 0;\nwhile (i++ < 3) {}\nSystem.out.println(i);\n```", choices: ["4", "3", "2", "0"], answer_index: 0 },
      { q: "What is the output?\n```java\nint[] arr = {1, 2, 3, 4, 5};\nfor (int i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 == 0) break;\n    System.out.print(arr[i] + \" \");\n}\n```", choices: ["1", "1 2", "1 2 3 4 5", "Nothing"], answer_index: 0 },
      { q: "What is the output?\n```java\nswitch (3) {\n    case 1: System.out.print(\"A\");\n    case 2: System.out.print(\"B\");\n    case 3: System.out.print(\"C\");\n    default: System.out.print(\"D\");\n}\n```", choices: ["CD", "C", "BCD", "D"], answer_index: 0 },
      { q: "What is the output?\n```java\nint x = 1;\ndo {\n    System.out.print(x++);\n} while (x <= 1);\n```", choices: ["1", "11", "Compilation error", "Nothing"], answer_index: 0 },
      { q: "What is the output?\n```java\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}\n```", choices: ["1\n1 2\n1 2 3\n1 2 3 4", "1 2 3 4\n1 2 3\n1 2\n1", "1\n2\n3\n4", "1 2 3 4"], answer_index: 0 },
      { q: "Can a switch expression work with a String in Java?", choices: ["Yes, since Java 7", "No, only int/char/enum", "Only with Java 14+ switch expressions", "No, never"], answer_index: 0 },
      { q: "What is the output?\n```java\nint count = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) count++;\n}\nSystem.out.println(count);\n```", choices: ["3", "4", "2", "10"], answer_index: 0 },
      { q: "What is the output?\n```java\nlabel: {\n    System.out.println(\"A\");\n    break label;\n    System.out.println(\"B\");\n}\nSystem.out.println(\"C\");\n```", choices: ["A C", "A B C", "A", "Compilation error"], answer_index: 0 },
      { q: "Which loop guarantees at least ONE execution of the body?", choices: ["do-while", "while", "for", "enhanced for"], answer_index: 0 },
      { q: "What is the output?\n```java\nint n = 5;\nfor (int i = n; i > 0; i -= 2) {\n    if (i == 3) continue;\n    System.out.print(i + \" \");\n}\n```", choices: ["5 1", "5 3 1", "5", "Compilation error"], answer_index: 0 },
      { q: "What does `yield` do in a Java 14+ switch expression?", choices: ["Returns a value from the switch case", "Pauses execution", "Exits the switch", "It doesn't exist in Java"], answer_index: 0 },
      { q: "What is the output?\n```java\nint a = 1;\nwhile (a++ <= 1) {\n    if (a > 2) break;\n    System.out.print(a);\n}\n```", choices: ["2", "1 2", "12", "Nothing"], answer_index: 0 },
      { q: "Which control flow statement CANNOT have a label?", choices: ["if", "break", "continue", "switch"], answer_index: 0 },
      { q: "What is the output?\n```java\nfor (int i = 0; i < 5; i++) {\n    if (i % 2 == 0) continue;\n    if (i > 3) break;\n    System.out.print(i);\n}\n```", choices: ["13", "135", "1357", "Nothing"], answer_index: 0 },
    ],
    "Methods and Functions": [
      { q: "What is the output?\n```java\npublic static int foo(int x) {\n    return x > 0 ? x : -x;\n}\npublic static void main(String[] args) {\n    System.out.println(foo(foo(-3) + foo(2)));\n}\n```", choices: ["5", "1", "-5", "3"], answer_index: 0 },
      { q: "What is the output?\n```java\nstatic int count = 0;\nstatic void increment() { count++; }\npublic static void main(String[] args) {\n    increment();\n    increment();\n    System.out.println(count);\n}\n```", choices: ["2", "0", "1", "Compilation error"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static int calc(int a, int b) {\n    return a++ + ++b;\n}\npublic static void main(String[] args) {\n    int x = 3, y = 4;\n    System.out.println(calc(x, y));\n    System.out.println(x + y);\n}\n```", choices: ["8, 7", "7, 8", "8, 8", "7, 7"], answer_index: 0 },
      { q: "Can a method be overloaded based only on return type?", choices: ["No, return type alone is not enough", "Yes, always", "Yes, if the return type is different", "Only with primitives"], answer_index: 0 },
      { q: "What is the output?\n```java\nvoid greet(String name) { System.out.println(\"Hello \" + name); }\nvoid greet() { System.out.println(\"Hello World\"); }\npublic static void main(String[] args) {\n    greet();\n    greet(\"Alice\");\n}\n```", choices: ["Hello World, Hello Alice", "Compilation error", "Hello Alice, Hello World", "Runtime error"], answer_index: 0 },
      { q: "What is a 'varargs' parameter declared as?", choices: ["String... args", "String[] args", "var String[] args", "String args..."], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static int mystery(int n) {\n    if (n <= 1) return n;\n    return mystery(n-1) + mystery(n-2);\n}\npublic static void main(String[] args) {\n    System.out.println(mystery(6));\n}\n```", choices: ["8", "6", "13", "5"], answer_index: 0 },
      { q: "Which is NOT a valid method signature for `void test(int a, String b)`?", choices: ["void test(int x, String y)", "void test(int a, String b)", "public void test(int a, String b)", "static void test(int a, String b)"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static String concat(String a, String... b) {\n    return a + Arrays.toString(b);\n}\npublic static void main(String[] args) {\n    System.out.println(concat(\"Hi\", \"A\", \"B\"));\n}\n```", choices: ["Hi[A, B]", "HiAB", "Compilation error", "Hi A B"], answer_index: 0 },
      { q: "Pass-by-value in Java means:", choices: ["A copy of the value/reference is passed, not the original", "The original variable is modified directly", "Primitives are passed by reference", "Objects are cloned before passing"], answer_index: 0 },
      { q: "What is the output?\n```java\nint x = 10;\nchange(x);\nSystem.out.println(x);\n}\nstatic void change(int x) { x = 20; }\n```", choices: ["10", "20", "Compilation error", "0"], answer_index: 0 },
      { q: "Which keyword prevents a method from being overridden?", choices: ["final", "static", "private", " sealed"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static int sum(int... nums) {\n    int total = 0;\n    for (int n : nums) total += n;\n    return total;\n}\npublic static void main(String[] args) {\n    System.out.println(sum(1, 2, 3, 4, 5));\n}\n```", choices: ["15", "5", "0", "120"], answer_index: 0 },
      { q: "A recursive method MUST have:", choices: ["A base case and a recursive case", "Only one parameter", "A return type of int", "A loop inside"], answer_index: 0 },
      { q: "What is the output?\n```java\nint a = 5;\nSystem.out.println(a > 3 ? a < 10 ? 1 : 2 : 3);\n```", choices: ["1", "2", "3", "Compilation error"], answer_index: 0 },
    ],
    "Arrays and Collections": [
      { q: "What is the output?\n```java\nint[] arr = new int[5];\nSystem.out.println(arr[4]);\nSystem.out.println(arr[5]);\n```", choices: ["0, then ArrayIndexOutOfBoundsException", "0, 0", "null, null", "Compilation error"], answer_index: 0 },
      { q: "What is the output?\n```java\nint[] arr = {1, 2, 3, 4, 5};\nfor (int i = 0; i < arr.length; i++) {\n    if (i % 2 == 0) arr[i] *= 2;\n}\nSystem.out.println(Arrays.toString(arr));\n```", choices: ["[2, 2, 6, 4, 10]", "[2, 4, 6, 8, 10]", "[2, 2, 6, 8, 10]", "[1, 2, 3, 4, 5]"], answer_index: 0 },
      { q: "What is the output?\n```java\nArrayList<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.add(2);\nlist.add(1);\nlist.remove(Integer.valueOf(1));\nSystem.out.println(list);\n```", choices: ["[2, 1]", "[2]", "[1, 2]", "[1, 1, 2]"], answer_index: 0 },
      { q: "What is the output?\n```java\nHashMap<String, Integer> map = new HashMap<>();\nmap.put(\"A\", 1);\nmap.put(\"B\", 2);\nmap.put(\"A\", 3);\nSystem.out.println(map.size() + \", \" + map.get(\"A\"));\n```", choices: ["2, 3", "3, 3", "3, 1", "2, 1"], answer_index: 0 },
      { q: "What is the difference between `remove(1)` and `remove(Integer.valueOf(1))` on an ArrayList<Integer>?", choices: ["remove(1) removes by index, remove(obj) removes by value", "Both remove by index", "Both remove by value", "remove(1) causes a compile error"], answer_index: 0 },
      { q: "What is the output?\n```java\nint[][] matrix = {{1, 2}, {3, 4, 5}, {6}};\nSystem.out.println(matrix[1].length + \", \" + matrix[1][2]);\n```", choices: ["3, 5", "2, 4", "3, 3", "Compilation error"], answer_index: 0 },
      { q: "Which collection allows duplicate elements?", choices: ["ArrayList", "HashSet", "TreeSet", "None of the above"], answer_index: 0 },
      { q: "What is the output?\n```java\nint[] a = {1, 2, 3};\na = {4, 5, 6}; // line X\na[0] = 7;\nSystem.out.println(a[0]);\n```", choices: ["7", "4", "Compilation error at line X", "1"], answer_index: 0 },
      { q: "TreeMap sorts keys by default using:", choices: ["Natural ordering (Comparable)", "Insertion order", "Hash code", "Random order"], answer_index: 0 },
      { q: "What is the output?\n```java\nString[] words = {\"apple\", \"banana\", \"cherry\"};\nfor (String w : words) {\n    if (w.length() > 5) break;\n    System.out.print(w + \" \");\n}\n```", choices: ["apple banana", "apple", "banana cherry", "apple banana cherry"], answer_index: 0 },
      { q: "HashSet.contains() uses which methods internally?", choices: ["hashCode() then equals()", "equals() only", "== comparison", "compareTo()"], answer_index: 0 },
      { q: "What is the output?\n```java\nList<Integer> list = Arrays.asList(1, 2, 3);\nlist.add(4);\nSystem.out.println(list.size());\n```", choices: ["UnsupportedOperationException", "4", "3", "Compilation error"], answer_index: 0 },
      { q: "Which has the fastest `contains()` for 1M elements?", choices: ["HashSet (O(1))", "ArrayList (O(n))", "LinkedList (O(n))", "All are the same"], answer_index: 0 },
      { q: "What is the output?\n```java\nint[] arr = new int[3];\nfor (int i : arr) {\n    System.out.print(i + \" \");\n}\n```", choices: ["0 0 0", "null null null", "Compilation error", "Nothing"], answer_index: 0 },
      { q: "Arrays.sort() uses which algorithm for primitives?", choices: ["Dual-Pivot Quicksort", "MergeSort", "TimSort", "BubbleSort"], answer_index: 0 },
    ],
    "Object-Oriented Programming": [
      { q: "What is the output?\n```java\nclass A {\n    void greet() { System.out.println(\"A\"); }\n}\nclass B extends A {\n    void greet() { System.out.println(\"B\"); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        A obj = new B();\n        obj.greet();\n    }\n}\n```", choices: ["B", "A", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "What is the output?\n```java\nclass Parent {\n    Parent() { System.out.print(\"P\"); }\n}\nclass Child extends Parent {\n    Child() { System.out.print(\"C\"); }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Child c = new Child();\n    }\n}\n```", choices: ["PC", "C", "P", "Compilation error"], answer_index: 0 },
      { q: "What is the output?\n```java\nclass Test {\n    String s = \"hello\";\n    void change(String s) { this.s = s + \" world\"; }\n    public static void main(String[] args) {\n        Test t = new Test();\n        t.change(\"hi\");\n        System.out.println(t.s);\n    }\n}\n```", choices: ["hi world", "hello", "Compilation error", "hello world"], answer_index: 0 },
      { q: "Which of the following is NOT a pillar of OOP?", choices: ["Modularity", "Encapsulation", "Abstraction", "Polymorphism"], answer_index: 0 },
      { q: "What is the output?\n```java\ninterface A { default void show() { System.out.println(\"A\"); } }\nclass B implements A {}\npublic class Test {\n    public static void main(String[] args) {\n        B b = new B();\n        b.show();\n    }\n}\n```", choices: ["A", "Compilation error", "B", "Nothing"], answer_index: 0 },
      { q: "What does `super()` do in a constructor?", choices: ["Calls the parent class constructor", "Creates a new object", "Returns the parent reference", "It doesn't exist in Java"], answer_index: 0 },
      { q: "What is the output?\n```java\nclass A { void m() { System.out.println(\"A\"); } }\nclass B extends A { void m() { System.out.println(\"B\"); } }\npublic class Test {\n    public static void main(String[] args) {\n        A a = new A();\n        a.m();\n        B b = new B();\n        b.m();\n        A ab = new B();\n        ab.m();\n    }\n}\n```", choices: ["A B B", "A B A", "B B B", "Compilation error"], answer_index: 0 },
      { q: "A class declared `final`:", choices: ["Cannot be subclassed", "Cannot have any methods", "Cannot be instantiated", "Must have all final methods"], answer_index: 0 },
      { q: "What is the output?\n```java\nclass A { int x = 10; }\nclass B extends A { int x = 20; }\npublic class Test {\n    public static void main(String[] args) {\n        A a = new B();\n        System.out.println(a.x);\n    }\n}\n```", choices: ["10", "20", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "What is method overriding?", choices: ["Subclass provides its own implementation of a parent's method", "Two methods with same name but different parameters", "Calling a method from parent class", "Overloading with different return types"], answer_index: 0 },
      { q: "Which relationship represents 'has-a'?", choices: ["Composition", "Inheritance", "Association", "Aggregation"], answer_index: 0 },
      { q: "What is the output?\n```java\nclass A {\n    A() { System.out.println(\"A\"); }\n    A(int x) { System.out.println(\"A(int)\"); }\n}\nclass B extends A {\n    B() { super(5); System.out.println(\"B\"); }\n}\npublic class Test {\n    public static void main(String[] args) { new B(); }\n}\n```", choices: ["A(int)\nB", "A\nB", "B\nA(int)", "Compilation error"], answer_index: 0 },
      { q: "What is the output?\n```java\ninterface I { int VALUE = 100; }\nclass A implements I {\n    void change() { VALUE = 200; }\n}\n```\nWhat happens?", choices: ["Compilation error: cannot assign a value to final variable VALUE", "200", "100", "Runtime error"], answer_index: 0 },
      { q: "Polymorphism allows you to:", choices: ["Use a superclass reference to refer to subclass objects", "Have multiple main methods", "Override all methods", "Use multiple inheritance"], answer_index: 0 },
      { q: "An abstract class vs interface: which is TRUE?", choices: ["Abstract class can have state (fields); interface cannot (before Java 8)", "Interface can have constructors", "Abstract class can be instantiated", "No difference"], answer_index: 0 },
    ],
    "Exception Handling": [
      { q: "What is the output?\n```java\ntry {\n    int[] arr = {1, 2, 3};\n    System.out.println(arr[3]);\n} catch (ArrayIndexOutOfBoundsException e) {\n    System.out.println(\"A\");\n} catch (Exception e) {\n    System.out.println(\"B\");\n}\n```", choices: ["A", "B", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "What is the output?\n```java\ntry {\n    int x = 10 / 0;\n} finally {\n    System.out.println(\"Finally\");\n}\n```", choices: ["Finally (then ArithmeticException)", "A (then ArithmeticException)", "Compilation error", "Nothing"], answer_index: 0 },
      { q: "What is the output?\n```java\ntry {\n    return 1;\n} finally {\n    return 2;\n}\n```", choices: ["2", "1", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "Which exception does `new FileInputStream(\"missing.txt\")` throw?", choices: ["FileNotFoundException (checked)", "IOException (unchecked)", "NullPointerException", "RuntimeException"], answer_index: 0 },
      { q: "What is the output?\n```java\ntry {\n    throw new RuntimeException();\n} catch (Exception e) {\n    System.out.println(\"Caught\");\n} finally {\n    System.out.println(\"Finally\");\n}\n```", choices: ["Caught\\nFinally", "Finally", "RuntimeException", "Compilation error"], answer_index: 0 },
      { q: "What is NOT a subclass of RuntimeException?", choices: ["IOException", "NullPointerException", "ArrayIndexOutOfBoundsException", "ClassCastException"], answer_index: 0 },
      { q: "What is the output?\n```java\ntry {\n    int x = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(e.getMessage());\n}\n```", choices: ["/ by zero", "null", "java.lang.ArithmeticException: / by zero", "Compilation error"], answer_index: 0 },
      { q: "try-with-resources requires the resource to:", choices: ["Implement java.lang.AutoCloseable", "Extend InputStream", "Be a File object", "Implement Serializable"], answer_index: 0 },
      { q: "What is the output?\n```java\nthrow new IllegalArgumentException(\"bad\");\n```\nWhat type of exception is thrown?", choices: ["Unchecked (RuntimeException)", "Checked", "Error", "Compilation error"], answer_index: 0 },
      { q: "What happens when `System.exit(0)` is called?", choices: ["JVM terminates immediately, finally blocks may NOT run", "It throws SystemExitException", "Finally blocks always run", "Only the current thread stops"], answer_index: 0 },
      { q: "What is the output?\n```java\ntry {\n    int[] a = new int[-5];\n} catch (Exception e) {\n    System.out.println(e.getClass().getSimpleName());\n}\n```", choices: ["NegativeArraySizeException", "IllegalArgumentException", "ArrayIndexOutOfBoundsException", "RuntimeException"], answer_index: 0 },
      { q: "Which keyword is used to manually throw an exception?", choices: ["throw", "throws", "throw new", "raise"], answer_index: 0 },
      { q: "What is the output?\n```java\ntry {\n    String s = null;\n    System.out.println(s.length());\n} catch (NullPointerException e) {\n    System.out.println(\"NPE\");\n} catch (Exception e) {\n    System.out.println(\"General\");\n}\n```", choices: ["NPE", "General", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "Which block runs ALWAYS, even if no exception occurs?", choices: ["finally", "catch", "try", "throw"], answer_index: 0 },
      { q: "What is StackOverflowError?", choices: ["An Error caused by infinite or too-deep recursion", "A checked exception", "A RuntimeException subclass", "An IOException variant"], answer_index: 0 },
    ],
    "Debugging": [
      { q: "What does this stack trace tell you?\n```\nException in thread \"main\" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5\n    at Main.findMax(Main.java:12)\n    at Main.main(Main.java:3)\n```", choices: ["The error is at line 12 in findMax, called from main at line 3", "The error is at line 5", "The error is at line 3", "There is no error — just a warning"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static void main(String[] args) {\n    int[] arr = {1, 2, 3};\n    for (int i = 0; i <= arr.length; i++) {\n        System.out.println(arr[i]);\n    }\n}\n```", choices: ["1 2 3, then ArrayIndexOutOfBoundsException", "1 2 3", "Compilation error", "0 1 2 3"], answer_index: 0 },
      { q: "Which is NOT a valid debugging strategy?", choices: ["Rewrite the entire codebase without reading the error", "Use the IDE debugger", "Add print statements", "Read the stack trace"], answer_index: 0 },
      { q: "What is 'step over' in a debugger?", choices: ["Executes the current line and moves to the next, without entering methods", "Enters the method call", "Exits the current method", "Runs until a breakpoint"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static int divide(int a, int b) {\n    return a / b;\n}\npublic static void main(String[] args) {\n    System.out.println(divide(10, 0));\n}\n```", choices: ["ArithmeticException: / by zero", "0", "Infinity", "Compilation error"], answer_index: 0 },
      { q: "A watch expression in a debugger shows:", choices: ["The current value of a variable/expression", "Execution time of each line", "Memory address", "Method signature"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic static void main(String[] args) {\n    String s = null;\n    System.out.println(s.length());\n}\n```", choices: ["NullPointerException", "null", "0", "Compilation error"], answer_index: 0 },
      { q: "What does `e.printStackTrace()` do?", choices: ["Prints the exception and its stack trace to System.err", "Removes the exception from memory", "Logs to a file", "Throws a new exception"], answer_index: 0 },
      { q: "Rubber duck debugging means:", choices: ["Explain your code/problem out loud to find the issue", "Use a physical rubber duck tool", "Debug by throwing objects", "A type of automated debugging"], answer_index: 0 },
      { q: "What is NOT a sign of good logging?", choices: ["Logging every variable at every step", "Using log levels (DEBUG, INFO, WARN, ERROR)", "Including context in log messages", "Removing debug logs in production"], answer_index: 0 },
      { q: "A 'hotspot' in a profiler indicates:", choices: ["The method consuming the most CPU time", "A syntax error", "A thread deadlock", "A memory leak location"], answer_index: 0 },
      { q: "What is the output?\n```java\nint a = 5, b = 0;\nint c = a / b;\nSystem.out.println(c);\n```", choices: ["ArithmeticException: / by zero", "Infinity", "0", "NaN"], answer_index: 0 },
      { q: "A stack trace is useful because it shows:", choices: ["The call chain of methods leading to the error", "Variable values at each step", "Memory addresses", "Only the line that caused the error"], answer_index: 0 },
      { q: "Which IDE feature lets you examine variable values during execution?", choices: ["Debugger / Variables panel", "Code completion", "Refactoring", "Git integration"], answer_index: 0 },
      { q: "What does 'premature debugging' mean?", choices: ["Debugging code that hasn't been fully written yet", "Debugging before running the program", "Using a debugger before trying print statements", "It's not a real term"], answer_index: 0 },
    ],
    "Testing": [
      { q: "What is the output of this test?\n```java\n@Test\nvoid test() {\n    assertEquals(4, 2 + 2);\n    assertEquals(4, 3 + 1);\n}\n```", choices: ["Test passes (green)", "Test fails (red)", "Compilation error", "One assertion fails, one passes"], answer_index: 0 },
      { q: "What does `assertThrows(ArithmeticException.class, () -> 10/0)` verify?", choices: ["That dividing by zero throws ArithmeticException", "That 10/0 equals 0", "That no exception is thrown", "That a different exception is thrown"], answer_index: 0 },
      { q: "In the AAA pattern, what does 'Arrange' mean?", choices: ["Set up test data and preconditions", "Call the method under test", "Verify the expected result", "Analyze the outcome"], answer_index: 0 },
      { q: "What is the output?\n```java\n@Test\nvoid test() {\n    List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));\n    list.remove(1);\n    assertEquals(2, list.size());\n}\n```", choices: ["Test passes", "Test fails", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "Why should test names be descriptive?", choices: ["So anyone reading the test report understands what failed", "To make the code compile faster", "To satisfy the IDE", "To reduce test runtime"], answer_index: 0 },
      { q: "A 'flaky test' is:", choices: ["A test that sometimes passes and sometimes fails non-deterministically", "A test that always fails", "A test with too many assertions", "A test that takes too long"], answer_index: 0 },
      { q: "What is the output?\n```java\n@Test\nvoid test() {\n    assertEquals(5, 2 + 3);\n    assertTrue(5 > 3);\n    assertNotNull(\"hello\");\n}\n```", choices: ["Test passes", "Test fails at assertEquals", "Test fails at assertNotNull", "Compilation error"], answer_index: 0 },
      { q: "Mockito's `when().thenReturn()` pattern is used for:", choices: ["Stubbing mock object behavior", "Making assertions", "Setting up test fixtures", "Cleaning up after tests"], answer_index: 0 },
      { q: "What does 80% code coverage mean?", choices: ["80% of your code lines are executed by tests", "80% of tests pass", "80% of bugs are found", "80% of methods are tested"], answer_index: 0 },
      { q: "Which annotation runs before EACH test method?", choices: ["@BeforeEach", "@BeforeAll", "@Before", "@Setup"], answer_index: 0 },
      { q: "What is the output?\n```java\n@Test\nvoid testList() {\n    List<Integer> list = List.of(1, 2, 3);\n    list.add(4); // line X\n}\n```", choices: ["UnsupportedOperationException at line X", "Test passes", "Compilation error", "Runtime error: NullPointerException"], answer_index: 0 },
      { q: "TDD stands for:", choices: ["Test-Driven Development", "Test Data Design", "Test Deployment Directive", "Type-Driven Development"], answer_index: 0 },
      { q: "What is a unit test?", choices: ["Tests a single class/method in isolation", "Tests multiple components together", "Tests the UI only", "Tests the database"], answer_index: 0 },
      { q: "`assertSame(a, b)` checks:", choices: ["That a and b reference the exact same object", "That a and b are equal", "That a and b have the same type", "That a and b are not null"], answer_index: 0 },
      { q: "Why should tests be independent?", choices: ["So they can run in any order without side effects", "So they share data for speed", "So they run in parallel", "So they need less setup"], answer_index: 0 },
    ],
    "Performance": [
      { q: "What is the time complexity of binary search on a sorted array of 1,000,000 elements?", choices: ["O(log n) ≈ 20 steps", "O(n) ≈ 1,000,000 steps", "O(1)", "O(n²)"], answer_index: 0 },
      { q: "What is the output?\n```java\n// Loop 1: O(n)\nfor (int i = 0; i < n; i++) { /* O(1) */ }\n// Loop 2: O(n²)\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++) { /* O(1) */ }\n// Total complexity?", choices: ["O(n²)", "O(n)", "O(n³)", "O(2n)"], answer_index: 0 },
      { q: "Which has better lookup performance for 1M strings?", choices: ["HashSet O(1)", "ArrayList O(n)", "LinkedList O(n)", "All the same O(n)"], answer_index: 0 },
      { q: "What is the output?\n```java\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 1000; i++)\n    sb.append(i);\nSystem.out.println(sb.length());\n```", choices: ["2893", "1000", "4000", "Compilation error"], answer_index: 0 },
      { q: "Why is String concatenation with + in a loop slow?", choices: ["Each + creates a new String object (immutable)", "The + operator is not supported in loops", "It uses reflection", "Strings are cached only up to 127 chars"], answer_index: 0 },
      { q: "What does O(n log n) mean?", choices: ["The algorithm's time grows as n times log(n)", "The fastest possible complexity", "It's worse than O(n²)", "It's constant time"], answer_index: 0 },
      { q: "What is the output?\n```java\nArrayList<Integer> list = new ArrayList<>();\nfor (int i = 0; i < 100000; i++)\n    list.add(i);\nSystem.out.println(list.get(50000));\n```\nWhat is the complexity of list.get(50000)?", choices: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer_index: 0 },
      { q: "What is 'amortized' O(1) for ArrayList.add()?", choices: ["Most adds are O(1); occasionally O(n) when resizing", "Always O(1) guaranteed", "Average of O(1) and O(n)", "Always O(n)"], answer_index: 0 },
      { q: "Which sorting algorithm does Arrays.sort() use for primitives?", choices: ["Dual-Pivot Quicksort", "MergeSort", "TimSort", "BubbleSort"], answer_index: 0 },
      { q: "What is the output?\n```java\nHashSet<Integer> set = new HashSet<>();\nfor (int i = 0; i < 100; i++) set.add(i);\nSystem.out.println(set.contains(50));\n```\nWhat is the average complexity of contains()?", choices: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer_index: 0 },
      { q: "Premature optimization is bad because:", choices: ["It wastes time optimizing non-bottlenecks", "Java always optimizes automatically", "It makes code harder to read", "It increases memory usage"], answer_index: 0 },
      { q: "What is a memory leak in Java?", choices: ["Objects are referenced but never used, preventing GC", "Memory physically leaks from the computer", "Primitive types overflow", "Stack overflow"], answer_index: 0 },
      { q: "Which data structure is best for implementing a LIFO (Last In, First Out)?", choices: ["Stack (Deque)", "Queue", "ArrayList", "HashMap"], answer_index: 0 },
      { q: "What is the output?\n```java\nList<Integer> list = new ArrayList<>();\nfor (int i = 0; i < 10; i++) list.add(i);\nlist.removeIf(x -> x % 2 == 0);\nSystem.out.println(list);\n```", choices: ["[1, 3, 5, 7, 9]", "[0, 2, 4, 6, 8]", "[1, 2, 3, 4, 5]", "[]"], answer_index: 0 },
      { q: "Big O of nested loops where inner runs n/2 times:", choices: ["O(n²)", "O(n log n)", "O(n)", "O(n/2) simplifies to O(n)"], answer_index: 0 },
    ],
    "Real-World Project": [
      { q: "What is the output?\n```java\nHashMap<String, Double> grades = new HashMap<>();\ngrades.put(\"Alice\", 95.5);\ngrades.put(\"Bob\", 87.0);\ngrades.put(\"Alice\", 98.0);\nSystem.out.println(grades.size() + \", \" + grades.get(\"Alice\"));\n```", choices: ["2, 98.0", "3, 98.0", "2, 95.5", "3, 95.5"], answer_index: 0 },
      { q: "What is the output?\n```java\nArrayList<Student> students = new ArrayList<>();\nstudents.add(new Student(\"Alice\", 3.8));\nstudents.add(new Student(\"Bob\", 3.5));\nstudents.sort((a, b) -> Double.compare(b.gpa, a.gpa));\nSystem.out.println(students.get(0).name);\n```", choices: ["Alice", "Bob", "Compilation error", "Runtime error"], answer_index: 0 },
      { q: "Why should fields be `private` with getters/setters?", choices: ["Encapsulation — control access and validation", "To make the class shorter", "It's required by the compiler", "To prevent inheritance"], answer_index: 0 },
      { q: "What is the output?\n```java\nrecord Student(String name, double gpa) {}\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student(\"Alice\", 3.9);\n        System.out.println(s.name() + \" \" + s.gpa());\n    }\n}\n```", choices: ["Alice 3.9", "Compilation error", "Alice=3.9", "name=Alice, gpa=3.9"], answer_index: 0 },
      { q: "A 'God class' violates which design principle?", choices: ["Single Responsibility Principle", "Open/Closed Principle", "Liskov Substitution Principle", "Interface Segregation Principle"], answer_index: 0 },
      { q: "What is the output?\n```java\npublic class GradeManager {\n    public static double average(int... scores) {\n        return Arrays.stream(scores).average().orElse(0);\n    }\n    public static void main(String[] args) {\n        System.out.println(average(80, 90, 100));\n    }\n}\n```", choices: ["90.0", "270", "100", "80"], answer_index: 0 },
      { q: "Why is hardcoding values bad?", choices: ["They're hard to maintain and change", "They compile slower", "They cause memory leaks", "They're not type-safe"], answer_index: 0 },
      { q: "What is the output?\n```java\nint[] nums = {3, 1, 4, 1, 5, 9};\nArrays.sort(nums);\nSystem.out.println(Arrays.binarySearch(nums, 5));\n```", choices: ["4", "5", "-1", "3"], answer_index: 0 },
      { q: "Git commit best practice:", choices: ["Write clear, descriptive commit messages", "Commit everything at once", "Never commit working code", "Use commit messages like 'update' and 'fix'"], answer_index: 0 },
      { q: "What does the Stream API's `.filter()` do?", choices: ["Keeps elements matching a predicate", "Removes duplicates", "Sorts elements", "Limits the stream size"], answer_index: 0 },
      { q: "What is the output?\n```java\nList<String> names = List.of(\"alice\", \"bob\", \"charlie\");\nnames.replaceAll(String::toUpperCase);\nSystem.out.println(names);\n```", choices: ["UnsupportedOperationException", "[ALICE, BOB, CHARLIE]", "[alice, bob, charlie]", "Compilation error"], answer_index: 0 },
      { q: "SOLID principle: 'O' stands for:", choices: ["Open/Closed Principle", "Object-Oriented", "Optimization", "Override"], answer_index: 0 },
      { q: "Which is the BEST way to handle user input in a console app?", choices: ["Use Scanner with proper exception handling", "Use BufferedReader always", "Use System.in.read() directly", "Hardcode input values"], answer_index: 0 },
      { q: "What is the output?\n```java\nMap<String, Integer> map = new LinkedHashMap<>();\nmap.put(\"first\", 1);\nmap.put(\"second\", 2);\nmap.put(\"third\", 3);\nmap.remove(\"second\");\nSystem.out.println(map.keySet());\n```", choices: ["[first, third]", "[first, second, third]", "[second]", "[]"], answer_index: 0 },
      { q: "The purpose of the `package` keyword is:", choices: ["Organize classes into namespaces", "Import classes", "Declare a JAR file", "Create a main method"], answer_index: 0 },
    ],
    "Next Steps": [
      { q: "Which annotation in Spring Boot marks a class as a REST controller?", choices: ["@RestController", "@Controller", "@Service", "@Component"], answer_index: 0 },
      { q: "What does Maven primarily manage?", choices: ["Dependencies, build lifecycle, and project structure", "Runtime environment only", "Database connections", "HTTP requests"], answer_index: 0 },
      { q: "Which Java framework is used for dependency injection?", choices: ["Spring", "JUnit", "Hibernate", "Maven"], answer_index: 0 },
      { q: "What does the 'D' in SOLID stand for?", choices: ["Dependency Inversion Principle", "Data-Driven Design", "Dynamic Dispatch", "Design Pattern"], answer_index: 0 },
      { q: "What is the purpose of Gradle's `build.gradle`?", choices: ["Declare dependencies, plugins, and build configuration", "Run tests only", "Deploy to production", "Write documentation"], answer_index: 0 },
      { q: "Hibernate is classified as a(n):", choices: ["ORM (Object-Relational Mapping) framework", "Build tool", "Testing framework", "Web server"], answer_index: 0 },
      { q: "What does REST stand for?", choices: ["Representational State Transfer", "Remote Execution Service Transfer", "Relational Entity State Transfer", "Representational Entity Structure Transfer"], answer_index: 0 },
      { q: "Which pattern ensures only ONE instance of a class exists?", choices: ["Singleton", "Factory", "Observer", "Strategy"], answer_index: 0 },
      { q: "What is the output?\n```java\n// Spring Boot style pseudo-code\n@RestController\n@RequestMapping(\"/api\")\nclass MyController {\n    @GetMapping(\"/hello\")\n    public String hello() { return \"Hi\"; }\n}\n// What HTTP method and path does this handle?", choices: ["GET /api/hello", "POST /api/hello", "GET /hello", "POST /api"], answer_index: 0 },
      { q: "What is the primary purpose of Docker in Java development?", choices: ["Package apps with their dependencies for consistent deployment", "Compile Java code", "Run unit tests", "Manage databases"], answer_index: 0 },
      { q: "What does ACID stand for in database transactions?", choices: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Atomic, Consistent, Independent, Durable", "Add, Create, Insert, Delete"], answer_index: 0 },
      { q: "Which design pattern is demonstrated by `ArrayList` and `LinkedList` both implementing `List`?", choices: ["Strategy pattern", "Singleton", "Factory", "Observer"], answer_index: 0 },
      { q: "Microservices architecture means:", choices: ["Building an app as small, independent services", "Using microprocessors for computation", "Writing code in micro batches", "Minimizing file sizes"], answer_index: 0 },
      { q: "What is the 'L' in SOLID principles?", choices: ["Liskov Substitution Principle", "Lightweight design", "Layered Architecture", "Loose coupling"], answer_index: 0 },
      { q: "CI/CD stands for:", choices: ["Continuous Integration / Continuous Deployment", "Code Inspection / Code Delivery", "Centralized Integration / Centralized Deployment", "Compiler Input / Compiler Output"], answer_index: 0 },
    ],
  };

  const questions = questionBank[title] || [
    { q: `What is Module ${i + 1} "${title}" about?`, choices: [`${objective}`, "Nothing important", "Advanced topics only", "Debugging techniques"], answer_index: 0 },
    { q: "Why is practice important in learning Java?", choices: ["It reinforces concepts through hands-on experience", "It's not important", "Only theory matters", "It replaces understanding"], answer_index: 0 },
    { q: "What should you do when stuck on a problem?", choices: ["Break it down and research", "Give up immediately", "Copy code blindly", "Ignore it"], answer_index: 0 },
    { q: "Which mindset helps most when learning?", choices: ["Growth mindset — embrace challenges", "Fixed mindset — avoid difficulty", "Perfectionism", "Impatience"], answer_index: 0 },
    { q: "How do you retain knowledge best?", choices: ["Active practice and building projects", "Passive reading only", "Memorizing without understanding", "Skipping difficult topics"], answer_index: 0 },
    { q: "When reading error messages, you should:", choices: ["Read the full message carefully", "Ignore them", "Only look at line numbers", "Copy-paste to Google immediately"], answer_index: 0 },
    { q: "What does DRY stand for?", choices: ["Don't Repeat Yourself", "Do Read Yourself", "Don't Run Yet", "Debug Repeatedly"], answer_index: 0 },
    { q: "Comments in code should explain:", choices: ["WHY, not what the code does", "Every single line", "Nothing — code should be self-documenting only", "Variable names"], answer_index: 0 },
    { q: "A 'magic number' in code is:", choices: ["A hardcoded number with no explanation", "A lucky number", "A prime number", "A special constant"], answer_index: 0 },
    { q: "Pair programming means:", choices: ["Two developers coding together", "Programming on two computers", "Solo development", "Using two monitors"], answer_index: 0 },
    { q: "Code review helps with:", choices: ["Catching bugs and sharing knowledge", "Slowing down development", "Finding style issues only", "Automated testing"], answer_index: 0 },
    { q: "Technical debt refers to:", choices: ["Shortcuts that need fixing later", "Money owed for tools", "Unpaid bills", "Licensing costs"], answer_index: 0 },
    { q: "Refactoring means:", choices: ["Improving code structure without changing behavior", "Rewriting from scratch", "Adding more features", "Deleting code"], answer_index: 0 },
    { q: "Agile development emphasizes:", choices: ["Iterative development and flexibility", "Rigid long-term plans", "No planning", "Waterfall only"], answer_index: 0 },
    { q: "The most important thing when learning programming is:", choices: ["Consistent practice over time", "Being naturally smart", "Knowing everything upfront", "Having the best equipment"], answer_index: 0 },
  ];

  return { questions };
}

export const createCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw: unknown) =>
    z.object({
      prompt: z.string().min(3).max(2000),
      timeframe: z.string().optional(),
      level: z.string().optional(),
      format: z.string().optional(),
    }).parse(raw),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: course, error } = await supabase.from("courses").insert({
      user_id: userId,
      title: data.prompt.slice(0, 80),
      goal_prompt: data.prompt,
      status: "generating",
      timeframe: data.timeframe ?? null,
      level: data.level ?? null,
      format: data.format ?? null,
    }).select().single();
    if (error || !course) throw new Error(error?.message ?? "Failed to create course");

    await supabase.from("agent_runs").insert(
      AGENTS.map((a, i) => ({
        course_id: course.id,
        agent_name: a.name,
        status: "queued",
        order: i,
      })),
    );
    return { courseId: course.id };
  });

export const orchestrateCourse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw: unknown) => z.object({ courseId: z.string().uuid() }).parse(raw))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: course } = await supabase.from("courses").select("*").eq("id", data.courseId).eq("user_id", userId).single();
    if (!course) throw new Error("Course not found");

    const runs = await supabase.from("agent_runs").select("*").eq("course_id", course.id).order("order");
    const runById = (name: string) => runs.data?.find((r: any) => r.agent_name === name);

    let currentAgent = "Planner Agent";
    const setStatus = async (name: string, status: string, summary?: string) => {
      const r = runById(name);
      if (!r) return;
      if (status === "working") currentAgent = name;
      const patch: any = { status };
      if (status === "working") patch.started_at = new Date().toISOString();
      if (status === "done" || status === "error") {
        patch.completed_at = new Date().toISOString();
        if (summary) patch.output_summary = summary;
      }
      await supabase.from("agent_runs").update(patch).eq("id", r.id);
    };

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    try {
      // 1. Planner
      await setStatus("Planner Agent", "working");
      await sleep(800);
      await setStatus("Planner Agent", "done", "Plan: up to 10 modules across your timeframe.");

      // 2. Curriculum — structured module data
      await setStatus("Curriculum Agent", "working");
      await sleep(600);
      const modules = COURSE_MODULES;
      const { data: insertedModules } = await supabase.from("modules").insert(
        modules.map((m: any, i: number) => ({
          course_id: course.id,
          title: String(m.title).slice(0, 120),
          objective: String(m.objective).slice(0, 400),
          order: i,
        })),
      ).select();
      await supabase.from("courses").update({ summary: `A comprehensive Java programming course covering: ${modules.map(m => m.title).join(", ")}.` }).eq("id", course.id);
      await setStatus("Curriculum Agent", "done", `${modules.length} modules sequenced.`);

      // 3. Content — generate lessons
      await setStatus("Content Agent", "working");
      const lessonRows: any[] = [];
      for (let i = 0; i < modules.length; i++) {
        const mod = insertedModules?.[i];
        if (!mod) continue;
        await sleep(400);
        lessonRows.push({
          module_id: mod.id,
          title: modules[i].title,
          content: generateLesson(modules[i].title, course.goal_prompt, modules[i].objective, i),
          generated_by_agent: "Content Agent",
          order: 0,
        });
        await setStatus("Content Agent", "working", `${lessonRows.length}/${modules.length} lessons written.`);
      }
      if (lessonRows.length) await supabase.from("lessons").insert(lessonRows);
      await setStatus("Content Agent", "done", `${lessonRows.length} detailed lessons written.`);

      // 4. Assessment — generate quizzes
      await setStatus("Assessment Agent", "working");
      const quizRows: any[] = [];
      for (let i = 0; i < modules.length; i++) {
        const mod = insertedModules?.[i];
        if (!mod) continue;
        await sleep(350);
        quizRows.push({
          module_id: mod.id,
          type: "quiz",
          content_json: generateQuiz(modules[i].title, modules[i].objective, i),
          generated_by_agent: "Assessment Agent",
        });
        await setStatus("Assessment Agent", "working", `${quizRows.length}/${modules.length} quizzes ready.`);
      }
      if (quizRows.length) await supabase.from("assessments").insert(quizRows);
      await setStatus("Assessment Agent", "done", `${quizRows.length} quizzes ready.`);

      // 5. QA
      await setStatus("QA Agent", "working");
      await sleep(600);
      await setStatus("QA Agent", "done", "Reviewed for tone and coherence.");

      await supabase.from("courses").update({ status: "ready" }).eq("id", course.id);
      return { ok: true };
    } catch (e: any) {
      const message = e?.message ?? "Generation failed";
      await setStatus(currentAgent, "error", message);
      await supabase.from("courses").update({ status: "failed" }).eq("id", course.id);
      throw new Error(message);
    }
  });

function generateTutorReply(question: string): string {
  const javaResponses: string[] = [
    `Great question about Java! Think about what you know from previous modules — how do the basics of Java syntax help you understand this concept? Remember, in Java, everything revolves around objects and classes. What part of this is still unclear to you?`,
    `That's an excellent question. Let's break it down: in Java, the key principle here is that everything has a type and a scope. Can you think of how this connects to what you learned about variables and data types?`,
    `Interesting! This concept builds on OOP fundamentals. Ask yourself: if you were designing a real-world solution, what would the classes and methods look like? Sometimes thinking in terms of real objects helps clarify the programming concept.`,
    `Good thinking! In Java, the answer often comes down to understanding the type system. Consider: what happens at compile time vs runtime? How does the JVM handle this particular scenario?`,
    `I like your curiosity on this topic! Let's connect it to something practical — have you tried writing a small program to test this behavior? Often, experimenting with a few lines of code reveals more than any explanation.`,
  ];
  return javaResponses[Math.floor(Math.random() * javaResponses.length)];
}

export const askTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((raw: unknown) => z.object({
    lessonContent: z.string(),
    question: z.string().min(1),
    courseTitle: z.string(),
  }).parse(raw))
  .handler(async ({ data }) => {
    return { reply: generateTutorReply(data.question) };
  });
