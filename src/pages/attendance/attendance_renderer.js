document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`Attendance DOMContentLoaded`)

});

// document.addEventListener("blur", function(event) {
//   console.log(`document lost focus`)
// });
// document.addEventListener("focus", function(event) {
//   console.log(`document gained focus`)
// });


//-------------------------------------------------------------------
// invoked by the search button click event
//-------------------------------------------------------------------
const searchButton = document.getElementById('refreshButton')
searchButton.addEventListener('click', () => {
  console.log(`refreshButton was clicked`)
  window.electronAPI.fetchAttendanceData();
})

//-------------------------------------------------------------------
// invoked by the main ipc emit event 
//-------------------------------------------------------------------
window.electronAPI.displayAttendanceData((results) => {
  try {
    console.log(`displayAttendanceData was activated`);
    attendanceTable = document.getElementById('attendanceTable');
    const tbody     = document.getElementById('attendanceTableBody');
    tbody.innerHTML = "";
    results.forEach(result => {
      console.log(JSON.stringify(result));
      const row = tbody.insertRow();
      const cell1 = row.insertCell(0);
      cell1.innerHTML = result.attendance_id;
      const cell2 = row.insertCell(1);
      cell2.innerHTML = result.badgeNumber;
      const cell3 = row.insertCell(2);
      cell3.innerHTML = result.checkinDate;
      const cell4 = row.insertCell(3);
      cell4.innerHTML = result.checkinTime;
      const cell5 = row.insertCell(4);
      cell5.innerHTML = result.studentName;
    });
    
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log(`displayAttendanceData exited finally`)
    //setFormEnabled(document.getElementById('formStudentData'), false);
  }
})

//-------------------------------------------------------------------
// invoked by the main ipc emit event 
//-------------------------------------------------------------------
window.electronAPI.resetDisplay(() => {
  console.log(`Attendance resetDisplay was activated.`);
  window.electronAPI.fetchAttendanceData();
})

