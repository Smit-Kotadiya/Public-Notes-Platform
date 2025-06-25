function searchNotes() {
  const input = document.getElementById("tag-input").value;
  const tags = input.split(',').map(t => t.trim()).filter(t => t);

  if (tags.length === 0) {
    alert("Please enter at least one tag.");
    return;
  }

  const matchType = document.querySelector('input[name="matchType"]:checked')?.value || "any";
  const queryParams = tags.map(tag => `tag=${encodeURIComponent(tag)}`).join('&');
  const url = `/api/notes/search?${queryParams}&matchType=${matchType}`;

  fetch(url)
    .then(res => res.json())
    .then(notes => {
      const container = document.getElementById("results");
      container.innerHTML = "";

      if (!notes.length) {
        container.innerHTML = "<p>No notes found.</p>";
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
  window.location.href = "login.html";
});
