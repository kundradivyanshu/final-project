/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?

let fullCost = 35;
let halfCost = 20;
let daysSelected = [];
let daysSelectedElements = document.querySelectorAll('.day-selector li');
let fullDayButton = document.getElementById('full');
let halfDayButton = document.getElementById('half');
let clearDayButton = document.getElementById('clear-button');
let modifiedCost = document.getElementById('calculated-cost');



/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function changeColour(event) {
  let selectDay = event.target;
  if (!daysSelected.includes(selectDay.id)) {
    daysSelected.push(selectDay.id);
    selectDay.classList.add('clicked');
  } else {
    let dayIndex = daysSelected.indexOf(selectDay.id);
    daysSelected.splice(dayIndex, 1);
    selectDay.classList.remove('clicked');
  }
  calculateCost();
}

daysSelectedElements.forEach(function(dayElement) {
  dayElement.addEventListener('click', changeColour);
});



/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

clearDayButton.addEventListener('click', function() {
  daysSelected = [];
  daysSelectedElements.forEach(function(dayElement) {
    dayElement.classList.remove('clicked');
  });
  fullDayButton.classList.add('clicked');
  halfDayButton.classList.remove('clicked');
  calculateCost();
});


/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

function changeRate(dayType) {
  if (dayType === 'half') {
    halfDayButton.classList.add('clicked');
    fullDayButton.classList.remove('clicked');
  } else {
    fullDayButton.classList.add('clicked');
    halfDayButton.classList.remove('clicked');
  }
  calculateCost();
}

fullDayButton.addEventListener('click', function() {
  changeRate('full');
});

halfDayButton.addEventListener('click', function() {
  changeRate('half');
});



/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateCost() {
  let days = daysSelected.length;
  let cost = fullDayButton.classList.contains('clicked') ? fullCost : halfCost;
  let totalCost = days * cost;
  modifiedCost.innerHTML = totalCost;
}
