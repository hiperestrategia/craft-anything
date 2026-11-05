(function () {
  var form = document.getElementById("inquiry");
  var confirmBox = document.getElementById("confirm");
  var error = document.getElementById("form-error");
  var ref = document.getElementById("ref");
  if (!form || !confirmBox) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.textContent = "";
    if (!form.checkValidity()) {
      error.textContent = "Revisa los campos marcados. First name, last name, email, trip, departure and the demo checkbox are required.";
      form.reportValidity();
      return;
    }
    var stamp = Date.now().toString().slice(-4);
    ref.textContent = "CAL-" + stamp;
    form.hidden = true;
    confirmBox.classList.add("show");
    confirmBox.focus();
  });
})();
