// ---------------------------------------------------------------------------
let click_counter = 0;
function navButtons() {
  return [
    'navAddress',
    'navContact',
    'navAttendance',
    'navClasses'
  ]
}
document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded - Student Layout`)
  for (let i = 0; i < navButtons().length; i++) {
    console.log(`navButton: ${navButtons[i]}`);
  }  
});

// ---------------------------------------------------------------------------
document.getElementById('navButtonsDiv').addEventListener('click', (event) => {
  click_counter += 1;
  console.log('Button clicked:', event.target.id);
})




//-------------------------------------------------------------------
// invoked by the search by badge button click event
//-------------------------------------------------------------------
try{
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    console.log('searchButton button was clicked');
    badgeData = { 'badgeNumber' : document.getElementById('badgeNumber').value, }
    resetStudentData();
    window.electronAPI.searchByBadge(badgeData);
  })
  window.electronAPI.searchByBadgeResult((result) => {
     console.log(`searchByBadgeResult was activated: ${JSON.stringify(result)}`);
     processSearchResult(result);
  })
  function processSearchResult(result) {
    resetStudentData();
    if (result.status === 'err') {
      const badgeNumber       = document.getElementById('badgeNumber');
      badgeNumber.classList.add("text-danger")
      badgeNumber.classList.remove("text-success")
      badgeNumber.focus();
      const badgeNumber_error = document.getElementById('badgeNumber_error');
      badgeNumber_error.innerHTML = result.msg;
    }
    else {
      const badgeNumber_error = document.getElementById('badgeNumber_error');
      badgeNumber_error.innerHTML = "";
      badgeNumber.classList.remove("text-danger")
      badgeNumber.classList.add("text-success")
      badgeNumber.focus();
      displayStudentData(result.studentData);
    }
  }
  function displayStudentData (studentData) {
    document.getElementById('firstName').value = studentData.firstName;
    document.getElementById('middleName').value = studentData.middleName;
    document.getElementById('lastName').value = studentData.lastName;
    document.getElementById('address').value = studentData.address;
    document.getElementById('address2').value = studentData.address2;
    document.getElementById('city').value = studentData.city;
    document.getElementById('state').value = studentData.state;
    document.getElementById('zipCode').value = studentData.zipCode;
  }
  function resetStudentData (studentData) {
    document.getElementById('firstName').value = "";
    document.getElementById('middleName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('address').value = "";
    document.getElementById('address2').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
    document.getElementById('zipCode').value = "";
  }
}
catch(error){console.log(error);}
