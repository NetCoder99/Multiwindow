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

// ---------------------------------------------------------------------------
document.getElementById('selectPicture').addEventListener('click', () => {
  click_counter += 1;
  console.log(`selectPicture was clicked: ${click_counter}`)
})
document.getElementById('savePicture').addEventListener('click', () => {
  click_counter += 1;
  console.log(`savePicture was clicked: ${click_counter}`)
})

