document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`Navbar DOMContentLoaded`)
});

btnClickCount = 0;

//-------------------------------------------------------------------
document.getElementById('btnQuit').addEventListener('click', (event) => {
  btnClickCount += 1;
  console.log(`Quit button was clicked ${btnClickCount} times.`);
  window.electronAPI.quitButton();
})

//-------------------------------------------------------------------
document.getElementById('btnStudents').addEventListener('click', (event) => {
  btnClickCount += 1;
  console.log(`Students button was clicked ${btnClickCount} times.`);
  window.electronAPI.changePage('btnStudents');
})

//-------------------------------------------------------------------
document.getElementById('btnCheckin').addEventListener('click', (event) => {
  btnClickCount += 1;
  console.log(`Checkin button was clicked ${btnClickCount} times.`);
  window.electronAPI.changePage('btnCheckin');
})

//-------------------------------------------------------------------
document.getElementById('btnAttendance').addEventListener('click', (event) => {
  btnClickCount += 1;
  console.log(`Attendance button was clicked ${btnClickCount} times.`);
  window.electronAPI.changePage("btnAttendance");
})
