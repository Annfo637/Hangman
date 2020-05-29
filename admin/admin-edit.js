/* Detta script hanterar funktioner som hör till admin-edit-sidan. */

const editForm = document.querySelector("#editform");

//Förhindra att formuläret skickas om användaren trycker på enter
editForm.onkeypress = function (event) {
  let key = event.charCode || event.keyCode || 0;
  if (key === 13) {
    alert("Välj på knapparna om du vill uppdatera eller ta bort ordet.");
    event.preventDefault();
  }
};
