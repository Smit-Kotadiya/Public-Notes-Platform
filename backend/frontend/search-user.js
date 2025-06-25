window.onload = () => {
  fetch("/api/users/name-email")
    .then(res => res.json())
    .then(users => {
      const userList = document.getElementById("user-list");
      const container = document.getElementById("user-list");
      console.log("userEmail: ", users.email);
      const currentUserEmail = localStorage.getItem("userEmail");
    users.forEach(user => {
      console.log("user.email: ", user.email);
      console.log("currentUserEmail: ", currentUserEmail);
     if (user.email !== currentUserEmail) {
        const box = document.createElement("div");
        box.className = "user-box";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = `${user.name} → `;
        nameSpan.className = "user-name";

        const emailLink = document.createElement("a");
        emailLink.href = "#";
        emailLink.textContent = user.email;
        emailLink.className = "user-email";
        emailLink.addEventListener("click", () => loadUserNotes(user.email));

        box.appendChild(nameSpan);
        box.appendChild(emailLink);
        userList.appendChild(box);
    }
    });
})}
function loadUserNotes(email) {
  fetch(`/api/users/name?email=${email}`)
    .then(res => res.json())
    .then(userData => {
      if (!userData || !userData.name) throw new Error("User not found.");
      return fetch(`/api/notes/author?author=${userData.name}`);
    })
    .then(res => res.json())
    .then(notes => {
      const container = document.getElementById("notes-container");
      container.innerHTML = "";

      if (!notes.length) {
        container.innerHTML = "<p>No notes found for this user.</p>";
        return;
      }

      notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";
        card.innerHTML = `
          <h3>${note.title}</h3>
          <hr>
          <p>${note.content}</p>
          <p><strong>Tags:</strong> ${note.tags.join(', ')}</p>
          <p><strong>Author:</strong> ${note.author}</p>
          <p><strong>Created:</strong> ${new Date(note.createdAt).toLocaleString()}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Error: " + err.message);
    });
}

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";  // Redirect to login page
});