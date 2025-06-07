document.addEventListener("DOMContentLoaded", function(event) {
  console.log(`DOMContentLoaded`)
  document.getElementById('badgeNumberInp').focus()
});


//-------------------------------------------------------------------
document.getElementById('badgeNumberInp').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const badgeNumberInp  = document.getElementById('badgeNumberInp')
    const checkinLbl      = document.getElementById('checkinLbl')
    event.preventDefault();
    window.electronAPI.saveCheckin(badgeNumberInp.value);
    badgeNumberInp.value  = ''
    document.getElementById('badgeNumberInp').disabled = true
    checkinLbl.innerHTML  = `Processing checkin action ...`
  }  
})

//-------------------------------------------------------------------
// invoked by the main ipc emit event 
//-------------------------------------------------------------------
window.electronAPI.saveCheckinResult((result) => {
  console.log(`saveCheckinResult was activated: ${JSON.stringify(result)}`)
  checkinLbl.innerHTML  = `Check-in processing complete.`
  if (result.status == 'ok' ) {
    checkinLbl.classList.remove("text-warning"); 
    checkinLbl.classList.add("text-success"); 
    checkinLbl.innerHTML  = `Check-in processing complete for: ${result.firstName} ${result.lastName}`
  }
  else {
    checkinLbl.classList.add("text-warning"); 
    checkinLbl.classList.remove("text-success"); 
    checkinLbl.innerHTML  = `Check-in processing complete for: ${result.badgeNumber}`
  }
  setTimeout(() => {
    resetCheckinDisplay();
  }, 3000);
})

function resetCheckinDisplay() {
  console.log(`resetCheckinDisplay`);
  document.getElementById('badgeNumberInp').disabled = false;
  document.getElementById('badgeNumberInp').value = '';
  document.getElementById('badgeNumberInp').focus();
  checkinLbl.classList.remove("text-warning"); 
  checkinLbl.classList.remove("text-danger"); 
  checkinLbl.classList.remove("text-success"); 
  checkinLbl.innerHTML  = '';
}