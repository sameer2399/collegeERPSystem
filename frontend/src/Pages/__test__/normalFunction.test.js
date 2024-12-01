// Testing Using Jest aka Basic Functional Testing

// Function to add two numbers
const add = (a, b) => a + b;

// Function to subtract two numbers
const subtract = (a, b) => a - b;

// Function to get sum of array elements
const addSumOfArray = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};


// Function to print my name
const printMyName = (name) => name;

// // Test add function
describe("should add two numbers", () => {
  test("Add function test for number data type", () => {
    expect(add(1, 2)).toBe(3);
  })
  // test("Add function test", () => {
  //   expect(add(1, 2)).toBe(5);
  // })
});

// // Test subtract function
// test("Subtract function test", () => {
//   expect(subtract(1, 2)).toBe(-1);
// });

// // Test addSumOfArray function
// test("Add sum of array test", () => {
//   expect(addSumOfArray([1, 2, 3, 4, 5])).toBe(14 + 1);
// });

// // Test printMyName function
// test("Print my name test", () => {
//   expect(printMyName("John")).toBe("John");
// });
