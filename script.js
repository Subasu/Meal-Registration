const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const locationSelect = document.getElementById('location');
const mealCheckboxes = document.querySelectorAll('input[name="meal[]"]');
const dateInput = document.getElementById('date');
const orderForm = document.getElementById('orderForm');
const orderButton = document.querySelector('button[type="button"]');
const genderRadios = document.querySelectorAll('input[name="gender"]');

// Error message elements
const usernameError = document.getElementById('usernameError');
const genderError = document.getElementById('genderError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const locationError = document.getElementById('locationError');
const mealError = document.getElementById('mealError');
const dateError = document.getElementById('dateError');

// Function to display error message 
function displayError(errorElement, message) {
    errorElement.textContent = message;
}

// Function to clear error message and remove error class
function clearError(errorElement) {
    errorElement.textContent = '';  
}

// Username validation
function validateUsername() {
    const username = usernameInput.value;

    if (!username) {
        displayError(usernameError, 'Username is required.');
        return false;
    }

    if (username.length >= 20) {
        displayError(usernameError, 'Username cannot exceed 20 characters.');
        return false;
    }

    if (!/[a-zA-Z0-9_#]/.test(username)) {
        displayError(usernameError, 'Username must contain letters, numbers, underscore, or hash.');
        return false;
    }
    
    if (/^[0-9]/.test(username)) {
        displayError(usernameError, 'Username cannot start with a number.');
        return false;
    }

    if (username.indexOf('_') === -1 && username.indexOf('#') === -1) {
        displayError(usernameError, 'Username should contain at least one of underscore (_) or hash (#).');
        return false;
    }

    clearError(usernameError);
    return true;
}

// Email validation
function validateEmail() {
    const email = emailInput.value;

    if (!email) {
        displayError(emailError, 'Email is required.');
        return false;
    }

    if (email.length > 250) {
        displayError(emailError, 'Email cannot exceed 250 characters.');
        return false;
    }

    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    if (atIndex < 0 || dotIndex < 0 || atIndex > dotIndex) {
        displayError(emailError, 'Invalid email format (must contain "@" and ".").');
        return false;
    }

    if (email.indexOf('@', atIndex + 1) !== -1) {
        displayError(emailError, 'Email can only contain one "@" symbol.');
        return false;
    }

    if (email.length - dotIndex < 4) {
        displayError(emailError, 'Email must have at least 3 characters after ".".');
        return false;
    }

    if (email.length - atIndex < 4) {
        displayError(emailError, 'Email must have at least 3 characters after "@".');
        return false;
    }

    const plusIndex = email.indexOf('+');
    if (plusIndex > -1 && plusIndex < atIndex) {//if plus exist and plus is before at
        // Plus sign is before "@" symbol
        if (atIndex-plusIndex-1===0) {
            displayError(emailError, 'Invalid email format (must have at least one character between "+" and "@").');
            return false;
        }
    }

    clearError(emailError);
    return true;
}

// Gender validation
function validateGender() {
    const maleRadio = document.getElementById('male');
    const femaleRadio = document.getElementById('female');

    if (!maleRadio.checked && !femaleRadio.checked) {
        genderError.textContent = 'Please select your gender (Male or Female).';
        return false;
    }
    clearError(genderError);
    return true;
}

// Phone validation
function validatePhone() {
    const phone = phoneInput.value.trim();
    
    if (phone && !/^\+91\d{10}$/.test(phone)) {
        displayError(phoneError, 'Invalid phone number format. Must start with +91 and have 10 digits.');
        return false;
    }
    
    if (phone.length > 13) {
        displayError(phoneError, 'Phone number cannot exceed 13 characters.');
        return false;
    }
    clearError(phoneError);
    return true;
}

//location validation
function validateLocation() {
    const location = locationSelect.value;
    if (!location) {
        displayError(locationError, 'Location is required.');
        return false;
    }
    clearError(locationError);
    return true;
}

//meal validation
function validateMeal() {
    let isChecked = false;
    mealCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isChecked = true;
        }
    });
    if (!isChecked) {
        mealError.textContent = 'At least one meal must be selected.';
        return false;
    }
    mealError.textContent = '';
    return true;
}

//date validation
function validateDate() {
    const date = dateInput.value;

    if (!date) {
        displayError(dateError, 'Date is required.');
        return false;
    }

    clearError(dateError);
    return true;
}

//display meal using location
function updateMealOptions() {
    const location = locationSelect.value;
    const breakfastCheckbox = document.getElementById('breakfast');
    const lunchCheckbox = document.getElementById('lunch');
    const dinnerCheckbox = document.getElementById('dinner');
    const breakfastLabel = document.querySelector('label[for="breakfast"]');
    const lunchLabel = document.querySelector('label[for="lunch"]');
    const dinnerLabel = document.querySelector('label[for="dinner"]');
    
      const checkboxes = [breakfastCheckbox, lunchCheckbox, dinnerCheckbox];
      checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.style.display = 'none';
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            label.style.display = 'none';
      });

    if (location === 'chennai') {
        breakfastCheckbox.style.display = 'inline';
        lunchCheckbox.style.display = 'inline';
        breakfastLabel.style.display = 'inline';
        lunchLabel.style.display = 'inline';
    } else if (location === 'coimbatore') {
        breakfastCheckbox.style.display = 'inline';
        lunchCheckbox.style.display = 'inline';
        dinnerCheckbox.style.display = 'inline';
        breakfastLabel.style.display = 'inline';
        lunchLabel.style.display = 'inline';
        dinnerLabel.style.display = 'inline';
    } else if (location === 'erode') {
        lunchCheckbox.style.display = 'inline';
        dinnerCheckbox.style.display = 'inline';
        lunchLabel.style.display = 'inline';
        dinnerLabel.style.display = 'inline';
    }
}

// Function to submit order form
function submitOrder() {
    const isValidUsername = validateUsername();
    const isValidEmail = validateEmail();
    const isValidGender = validateGender();
    const isValidPhone = validatePhone();
    const isValidLocation = validateLocation();
    const isValidMeal = validateMeal();
    const isValidDate = validateDate();

    if (isValidUsername && isValidEmail && isValidGender && isValidPhone && isValidLocation && isValidMeal && isValidDate) {
        const username = usernameInput.value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const location = locationSelect.value;
        const meals = Array.from(mealCheckboxes)
                           .filter(checkbox => checkbox.checked)
                           .map(checkbox => checkbox.value)
        const date = dateInput.value;

        // create a new row
        const table = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        // insert data
        newRow.insertCell(0).textContent = username;
        newRow.insertCell(1).textContent = gender;
        newRow.insertCell(2).textContent = email;
        newRow.insertCell(3).textContent = phone;
        newRow.insertCell(4).textContent = location;
        newRow.insertCell(5).textContent = meals;
        newRow.insertCell(6).textContent = date;

        // amount to be paid
        const amountToBePaid = ()=>{
            const price={
                "breakfast":15,
                "lunch":25,
                "dinner":20
            };
            let amount=0;
            meals.forEach((meal)=>{
                amount+=price[meal];
            })
            return amount;
        } 
        newRow.insertCell(7).textContent = amountToBePaid();

        // clear form 
        document.getElementById('orderForm').reset();
        console.log('Form is valid, submitting...');
    } else {
        console.log('Form is not valid, please correct the errors.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    locationSelect.value = 'chennai';
    updateMealOptions();
})
orderButton.addEventListener('click',submitOrder);
usernameInput.addEventListener('blur', validateUsername);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
locationSelect.addEventListener('change', validateLocation);
genderRadios.forEach(gender => gender.addEventListener('change', validateGender));
mealCheckboxes.forEach(checkbox => checkbox.addEventListener('change', validateMeal));
dateInput.addEventListener('blur', validateDate);
locationSelect.addEventListener('change', updateMealOptions);



