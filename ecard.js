// Get query parameter (?id=...)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const id = getQueryParam("id");

// Fetch the team data and populate the card
fetch("team.json")
  .then((r) => r.json())
  .then((data) => {
    if (id && data[id]) {
      const person = data[id];
      document.getElementById("photo").src = person.photo || "images/default.jpg";
      document.getElementById("name").textContent = person.name || "";
      document.getElementById("designation").textContent = person.designation || "";
      document.getElementById("company").textContent = person.company || "";
      if (person.phone) {
        document.getElementById("phone").href = `tel:${person.phone}`;
        document.getElementById("phone").textContent = `📞 ${person.phone}`;
      }
      if (person.email) {
        document.getElementById("email").href = `mailto:${person.email}`;
        document.getElementById("email").textContent = `✉️ ${person.email}`;
      }
    } else {
      document.getElementById("name").textContent = "No data found!";
      document.getElementById("designation").textContent = "Check the ?id= in the URL.";
    }
  })
  .catch(() => {
    document.getElementById("name").textContent = "Data error";
  });
