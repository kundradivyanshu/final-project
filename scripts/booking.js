/********* create variables *********/
// Define cost values and other elements/variables needed for interaction
let Full_cost = 35;
let Half_cost = 20;
let SelectedDays = []; // Array to store selected days
let daysSelectedElements = document.querySelectorAll('.day-selector li'); // Get all day elements
let Full_Button = document.getElementById('full'); // Full-day button element
let Half_Button = document.getElementById('half'); // Half-day button element
let Button_clear = document.getElementById('clear-button'); // Clear button element
let Cost_New = document.getElementById('calculated-cost'); // Element to display calculated cost

/********* colour change days of week *********/
// Creating a function to handle color change of selected days
function changeColour(event) {
  let selectDay = event.target;
  
  // If the day is not already selected, adding to SelectedDays and apply 'clicked' class
  if (!SelectedDays.includes(selectDay.id)) {
    SelectedDays.push(selectDay.id);
    selectDay.classList.add('clicked');
  } else { // Remove from SelectedDays and remove 'clicked' class,If the day is already selected,
    let dayIndex = SelectedDays.indexOf(selectDay.id);
    SelectedDays.splice(dayIndex, 1);
    selectDay.classList.remove('clicked');
  }
  
  calculateCost(); // Calculating the total cost
}

// Attaching the changeColour function to element's click event
daysSelectedElements.forEach(function(dayElement) {
  dayElement.addEventListener('click', changeColour);
});

/********* clear days *********/
Button_clear.addEventListener('click', function() {
  SelectedDays = []; // Clear the selected days array
  daysSelectedElements.forEach(function(dayElement) {
    dayElement.classList.remove('clicked'); // Remove 'clicked' class from all day elements
  });
  Full_Button.classList.add('clicked'); // Set Full_Button as clicked
  Half_Button.classList.remove('clicked'); // Remove clicked class from Half_Button
  calculateCost(); // Recalculate the total cost
});

/********* change rate *********/
// Function to handle changing the rate (full or half day)
function changeRate(dayType) {
  if (dayType === 'half') {
    Half_Button.classList.add('clicked'); // Set Half_Button as clicked
    Full_Button.classList.remove('clicked'); // Remove clicked class from Full_Button
  } else {
    Full_Button.classList.add('clicked'); // Set Full_Button as clicked
    Half_Button.classList.remove('clicked'); // Remove clicked class from Half_Button
  }
  
  calculateCost(); //
}

// Attach the changeRate function to Full_Button's click event
Full_Button.addEventListener('click', function() {
  changeRate('full');
});

// Attach the changeRate function to Half_Button's click event
Half_Button.addEventListener('click', function() {
  changeRate('half');
});

/********* calculate *********/
// Function to calculate and update the displayed cost
function calculateCost() {
  let days = SelectedDays.length; // Get the number of selected days
  let cost = Full_Button.classList.contains('clicked') ? Full_cost : Half_cost; // Get the cost based on button state
  let totalCost = days * cost; // Calculate total cost
  Cost_New.innerHTML = totalCost; // Update the displayed cost
}
