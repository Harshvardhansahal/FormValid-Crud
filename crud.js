let userid = document.getElementById("userid");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let country = document.getElementById("country");
let city = document.getElementById("city");
let zip = document.getElementById("zip");
var imageUpload = document.getElementById("imageUpload");
var imagePreview = document.getElementById("imagePreview");

var row = null; //It will be used to store a reference to the current row being edited.

function validateForm(e) {
  e.preventDefault();

  let flag = true;
  flag = validateUserId() && flag;
  flag = validateUsername() && flag;
  flag = validateEmail() && flag;
  flag = validatePassword() && flag;
  flag = validateConfirmPassword() && flag;
  flag = validatePhone() && flag;
  flag = validateAddress() && flag;
  flag = validateCountry() && flag;
  flag = validateCity() && flag;
  flag = validateZip() && flag;
  flag = validateImage() && flag;

  if (flag) {
   // Check if table header row already exists
   var tableHead = document.getElementById("table-head");
   if (!tableHead.querySelector("tr")) {
     // Create the table header row
     var headerRow = document.createElement("tr");
     headerRow.innerHTML = `
       <td class="col">UserId</td>
       <td class="col">Name</td>
       <td class="col">Email Address</td>
       <td class="col">Create Password</td>
       <td class="col">Confirm Password</td>
       <td class="col">Phone Number</td>
       <td class="col">Address</td>
       <td class="col">Country</td>
       <td class="col">City</td>
       <td class="col">ZIP Code</td>
       <td class="col">Profile Picture</td>
       <td class="col">Action</td>
     `;
     tableHead.appendChild(headerRow);
   }
    var dataEntered = retrieveData();
    if (row == null) {
      insert(dataEntered);
    } else {
      update();
    }
    resetForm();
  }
}

function validateUserId() {
  //USER ID
  if (userid.value.trim().length === 0) {
    document.getElementById("iderror").innerHTML =
      "User Id should not be empty ";
    userid.focus();
    return false;
  } else if (userid.value.trim().match(/[ \t\n\r\f\v\\/]/)) {
    document.getElementById("iderror").innerHTML =
      "User Id should not contain any whitespace, backspace, forward slash, or backward slash. ";
    userid.focus();
    return false;
  } else {
    document.getElementById("iderror").innerHTML = "";
    return true;
  }
}

function validateUsername() {
  // USER NAME
  if (username.value.trim().length === 0) {
    document.getElementById("usererror").innerHTML = "User Name is Empty!";
    username.focus();
    return false;
  } else if (username.value.length < 3) {
    document.getElementById("usererror").innerHTML =
      "User Name require min 3 char!";
    username.focus();
    return false;
  } else {
    document.getElementById("usererror").innerHTML = "";
    return true;
  }
}

function validateEmail() {
  //USER EMAIL
  var mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.value.match(mailformat)) {
    document.getElementById("emailerror").innerHTML = "";
    return true;
  } else {
    document.getElementById("emailerror").innerHTML =
      "You have entered an invalid email address!";
    email.focus();
    return false;
  }
}

function validatePassword() {
  //USER CREATE PASSWORD
  if (password.value === "") {
    document.getElementById("passerror").innerHTML = "Password is empty!";
    password.focus();
    return false;
  } else {
    document.getElementById("passerror").innerHTML = "";
    return true;
  }
}

function validateConfirmPassword() {
  //USER CONFIRM PASSWORD
  if (password.value === password2.value) {
    document.getElementById("pass2error").innerHTML = "";
    return true;
  } else {
    document.getElementById("pass2error").innerHTML = "password must Match!";
    password2.focus();
    return false;
  }
}

function validatePhone() {
  // USER PHONE NUMBER
  var phoneno = /^\d{10}$/;
  if (phone.value.match(phoneno)) {
    document.getElementById("pherror").innerHTML = "";
    return true;
  } else {
    document.getElementById("pherror").innerHTML =
      "Enter 10 Digit phone Number!";
    phone.focus();
    return false;
  }
}

function validateAddress() {
  //USER ADDRESS
  var letters = /^[0-9a-zA-Z]+$/;
  if (!address.value.match(letters)) {
    document.getElementById("adderror").innerHTML =
      "User address should be correct!";
    address.focus();
    return false;
  } else {
    document.getElementById("adderror").innerHTML = "";
    return true;
  }
}

function validateCountry() {
  //USER COUNTRY
  if (country.value === "Default") {
    document.getElementById("countryerror").innerHTML =
      "Select your country from the list!";
    country.focus();
    return false;
  } else {
    document.getElementById("countryerror").innerHTML = "";
    return true;
  }
  
}

var options = {
  australia:["Select an City","Melbourne","Sydney","Brisbane"],
  canada:["Select an City","Toronto","Montréal","Vancouver"],
  india:["Select an City","Delhi","Mumbai","Bangalore"],
  russia:["Select an City","Moscow","Saint Petersburg","Novosibirsk"],
  usa:["Select an City","New York","Los Angeles","Chicago"]

};
// Disable the city select element by default
city.disabled = true;
// Add event listener to the first select box
country.addEventListener("change", function() {
  var selectedValue = country.value;
  // Populate the second select box with the dependent options
  
  if (selectedValue && options[selectedValue]) {
    options[selectedValue].forEach(function(option) {
      var optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      city.appendChild(optionElement);
    });
  }
  
  // Enable the city select element when a country is selected
  city.disabled = false;
});

function validateCity() {
  //USER COUNTRY
  if (city.value === "Select an City") {
    document.getElementById("cityerror").innerHTML =
      "Select your city from the list!";
    city.focus();
    return false;
  } else {
    document.getElementById("cityerror").innerHTML = "";
    return true;
  }
}

function validateZip() {
  //USER ZIP CODE
  if (zip.value.length < 5 || zip.value.length > 7) {
    document.getElementById("ziperror").innerHTML =
      "ZIP code should have a length between 5 and 7";
    zip.focus();
    return false;
  } else {
    document.getElementById("ziperror").innerHTML = "";
    return true;
  }
}

//This function checks if an image file is selected, validates its size and type, and displays corresponding error messages.
function validateImage() {
  // Check if the file input has a file selected
  if (imageUpload.files && imageUpload.files[0]) {
    var file = imageUpload.files[0];

    // Check if the file is an image
    if (file.type.startsWith("image/")) {
      // Check the file size (in bytes)
      var maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size <= maxSizeInBytes) {
        imagePreview.innerHTML = ""; // Clear any previous error messages
        return true;
      } else {
        imagePreview.innerHTML =
          "<p>Image size exceeds the maximum limit (5MB)..</p>";
        return false;
      }
    } else {
      imagePreview.innerHTML = "<p>Please select an image file..</p>";
      return false;
    }
  } else {
    imagePreview.innerHTML = "<p>No image selected..</p>";
    imageUpload.focus();
    return false;
  }
}

//This function is called when an image file is selected. It reads the file, converts it to a data URL, and displays a preview of the image.
function previewImage() {
  var file = imageUpload.files[0]; // Get the selected file

  // Check if the file is an image
  if (file && file.type.startsWith("image/")) {
    var reader = new FileReader(); //It reads the selected file using the FileReader API, converts it to a data URL using the readAsDataURL method.

    // Read the image file and display the preview
    reader.onload = function (e) {
      imagePreview.innerHTML =
        '<img width="200" src="' + e.target.result + '">';
      // You can also set the image preview dimensions here using CSS if needed.
    };

    reader.readAsDataURL(file); // Convert the file to data URL
  } else {
    imagePreview.innerHTML = "<p>Please select an image file.</p>";
    imagePreview.focus();
  }
}

//CREATE
//This function collect the data entered in the form fields. It accesses each form field by its ID and gets the corresponding value. It stores these values in an array and returns the array.
function retrieveData() {
  

  var dataEntered = [
    userid.value,
    username.value,
    email.value,
    password.value,
    password2.value,
    phone.value,
    address.value,
    country.value,
    city.value,
    zip.value,
    imageUpload.files[0],
  ];
  return dataEntered;
  
}

//insert
//This function is responsible for inserting a new row with the entered data into a table on the page. It takes the dataEntered array as input and populates the table cells accordingly.
function insert(dataEntered) {
  var table = document.getElementById("table");
  var row = table.insertRow();


  for (var i = 0; i < dataEntered.length-1; i++) {
    var cell = row.insertCell(i);
    cell.innerHTML = dataEntered[i];
  }

  // Create an empty cell for the image preview
  var imageCell = row.insertCell(dataEntered.length-1);

  // Append the image file to the image cell
  if (dataEntered[dataEntered.length-1]) {
    var file = dataEntered[dataEntered.length-1];
    var reader = new FileReader();

    // Read the image file and display the preview
    reader.onload = function (e) {
      var imgElement = document.createElement("img");
      imgElement.width = 60;
      imgElement.src = e.target.result;
      imageCell.appendChild(imgElement);
    };

    reader.readAsDataURL(file); // Convert the file to data URL
  }

  var actionCell = row.insertCell(dataEntered.length);
  actionCell.innerHTML =
    "<button onclick='edit(this)'>Edit</button><button onclick='remove(this)'>Delete</button>";
}

//Edit
//This function is called when the "Edit" button is clicked. It retrieves the data from the selected row and populates the form fields with that data for editing.
function edit(td) {
  row = td.parentElement.parentElement;
 

  var inputIds = [
    "userid",
    "username",
    "email",
    "password",
    "password2",
    "phone",
    "address",
    "country",
    "city",
    "zip",
  ];
  for (var i = 0; i < inputIds.length; i++) {
    // var inputId = inputIds[i];
    document.getElementById(inputIds[i]).value = row.cells[i].innerHTML;
  }
  
  // Set the selected city option based on the current row data
  var selectedCity = row.cells[8].innerHTML;
  var cityOptions = document.getElementById("city").options;

  for (var j = 0; j < cityOptions.length; j++) {
    if (cityOptions[j].value === selectedCity) {
      cityOptions[j].selected = true;
      break;
    }
  }
  
  
  document.getElementById("imagePreview").innerHTML = row.cells[10].innerHTML;
  city.disabled = false;
} 

//UPDATE
//This function updates the data of the selected row with the edited values when the "Update" button is clicked.
function update() {
  var rowIndex = row.rowIndex; //return the position and index of row
  var table = document.getElementById("table");
  var updatedRow = table.rows[rowIndex];

  var inputIds = [
    "userid",
    "username",
    "email",
    "password",
    "password2",
    "phone",
    "address",
    "country",
    "city",
    "zip",
  ];

  if (updatedRow) {
    for (var i = 0; i < inputIds.length; i++) {
      updatedRow.cells[i].innerHTML = document.getElementById(inputIds[i]).value;
    }
  }
  

  var imageUpload = document.getElementById("imageUpload");
  var imageCell = updatedRow.cells[10];
  imageCell.innerHTML = ""; // Clear previous content

  // Check if a new image file is selected
  if (imageUpload.files.length > 0) {
    var file = imageUpload.files[0];
    var reader = new FileReader();

    // Read the new image file and update the preview
    reader.onload = function (e) {
      var imgElement = document.createElement("img");
      imgElement.width = 60;
      imgElement.src = e.target.result;
      imageCell.appendChild(imgElement);
    };

    reader.readAsDataURL(file); // Convert the file to data URL
  }

  row = null;
}

//DELETE
//This function is triggered when the "Delete" button is clicked. It removes the corresponding row from the table after confirming the deletion.
function remove(td) {
  if (confirm("Do you want to delete this record ")) {
    row = td.parentElement.parentElement;
    document.getElementById("table").deleteRow(row.rowIndex);
  }
  resetForm();
}

//Reset the data
//This function resets the form by clearing the input fields and resetting the preview section.
function resetForm() {
  
  var inputIds = [
    "userid",
    "username",
    "email",
    "password",
    "password2",
    "phone",
    "address",
    "city",
    "zip",
  ];
  for (var i = 0; i < inputIds.length; i++) {
    var inputId = inputIds[i];
    document.getElementById(inputId).value = "";
  }
  document.getElementById("country").value = "Default";
  document.getElementById("imageUpload").value = "";
  document.getElementById("imagePreview").innerHTML = "";
  city.disabled = true;
}
