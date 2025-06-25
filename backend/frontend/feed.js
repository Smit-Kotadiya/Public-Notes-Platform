const userEmail = localStorage.getItem("userEmail");
if (!userEmail)
   {
      alert("Not logged in!");
      window.location.href = "login.html";
   }
else 
  {
    let name = "";
    fetch(`/api/users/name?email=${userEmail}`)
    .then(res => res.json())
    .then(userData => {
        loggedInUser = userData.name;
        return fetch(`/api/notes/author?author=${loggedInUser}`);
      })
    .then(res => res.json())
    .then(notes => {
        const container = document.getElementById("notes-container");
        if (notes.length === 0) {
          container.innerHTML = "<p>No notes found</p>";
        } else {
          notes.forEach(note => {
          // or compare email if needed
          const card = createNoteCard(note, loggedInUser);
          container.appendChild(card);
          });
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error" + err.message);
      });
  }
      
  function createNoteCard(note, loggedInUser) 
  {
     const card = document.createElement("div");
     card.className = "note-card";
 
     const header = document.createElement("div");
     header.className = "note-header";
 
     const title = document.createElement("h3");
     title.textContent = note.title;

      const meta = document.createElement("small");
      meta.textContent = `Created on: ${new Date(note.createdAt).toLocaleDateString()}`;

      const content = document.createElement("p");
      content.textContent = note.content;

      const tags = document.createElement("p");
      tags.innerHTML = `<strong>Tags:</strong> ${note.tags.join(", ")}`;

      header.appendChild(title);
      if (note.author === loggedInUser) {
        const buttons = document.createElement("div");
        buttons.innerHTML = `
          <button onclick="editNote(${JSON.stringify(note).replace(/"/g, '&quot;')}, '${loggedInUser}')">✏️</button>
          <button onclick="deleteNote('${note._id}', '${loggedInUser}')">🗑️</button>
        `;
        header.appendChild(buttons);
      } else {
        const author = document.createElement("p");
        author.innerHTML = `<strong>Author:</strong> ${note.author}`;
        card.appendChild(author);
      }

      card.appendChild(header);
      card.appendChild(document.createElement("hr"));
      card.appendChild(content);
      card.appendChild(tags);
      card.appendChild(meta);

      return card;
  }

  //Delete Note - DELETE - /api/notes/:id
  function deleteNote(noteId, loggedInUser)
  {
      console.log("noteId: ", noteId);
    if (!confirm("Are you sure you want to delete this note?")) return;

    fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ loggedInUser }),
    })
    .then(response => {
      if (response.ok) 
      {
        // Optional: refresh the note list or remove the note from the DOM
        alert("Note deleted successfully.");
        location.reload(); // or update UI without full reload
      } 
      else 
      {
        throw new Error("Failed to delete note");
      }
      })
      .catch(err => {
      console.error("Error:", err.message);
      alert("An error occurred while deleting the note.");
    });
  }

//Edit Note - PATCH -/api/notes/:id
let currentNoteId = null;
let currentLoggedInUser = null;

//create notes
document.getElementById("create-note-btn").addEventListener("click", openCreateModal);

function openCreateModal() {
  const modalHtml = `
    <div id="create-modal" class="modal">
      <div class="modal-content">
        <h2>Create New Note</h2>
        <input type="text" id="new-title" placeholder="Title"><br>
        <textarea id="new-content" placeholder="Content"></textarea><br>
        <input type="text" id="new-tags" placeholder="Tags (comma-separated)"><br>
        <button onclick="submitNewNote()">Create</button>
        <button onclick="closeCreateModal()">Cancel</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  document.getElementById("create-modal").classList.remove("hidden");
}

function closeCreateModal() {
  const modal = document.getElementById("create-modal");
  if (modal) modal.remove();
}

function submitNewNote() {
  const title = document.getElementById("new-title").value;
  const content = document.getElementById("new-content").value;
  const tags = document.getElementById("new-tags").value.split(',').map(t => t.trim());

  const userEmail = localStorage.getItem("userEmail"); // from login
  if (!userEmail) return alert("User not logged in.");

  // Fetch author name from email
  fetch(`/api/users/name?email=${userEmail}`)
    .then(res => res.json())
    .then(user => {
      const author = user.name;
      return fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content, tags, author })
      });
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to create note");
      return res.json();
    })
    .then(() => {
      alert("Note created successfully");
      closeCreateModal();
      location.reload();
    })
    .catch(err => alert("Error: " + err.message));
}
// Opens the edit modal and fills it with existing note datafunction editNote(noteId, loggedInUser, note) {
function editNote(note, loggedInUser) {  
  currentNoteId = note._id;
  currentLoggedInUser = loggedInUser;

  // Fill form fields with the passed note object
  document.getElementById("edit-title").value = note.title;
  document.getElementById("edit-content").value = note.content;
  document.getElementById("edit-tags").value = Array.isArray(note.tags) ? note.tags.join(", ") : "";

  // Show the modal
  document.getElementById("edit-modal").classList.remove("hidden");
}

// Closes the modal
function closeEditModal() {
  currentNoteId = null;
  currentLoggedInUser = null;
  document.getElementById("edit-modal").classList.add("hidden");
}

// Called when the "Save" button is clicked
function submitEdit() {
  const updatedNote = {
    title: document.getElementById("edit-title").value,
    content: document.getElementById("edit-content").value,
    tags: document.getElementById("edit-tags").value.split(',').map(t => t.trim()),
    loggedInUser: currentLoggedInUser
  };

  fetch(`/api/notes/${currentNoteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedNote)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update note");
      return res.json();
    })
    .then(() => {
      alert("Note updated!");
      closeEditModal();
      location.reload(); // or you can re-render notes dynamically
    })
    .catch(err => alert("Error: " + err.message));
}

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";  // Redirect to login page
});

