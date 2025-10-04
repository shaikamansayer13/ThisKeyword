// Get form and input elements
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const bioInput = document.getElementById("bio");
const photoInput = document.getElementById("photo");

// User manager object
const userManager = {
  users: [],

  // Initialize event listeners
  firstrun: function () {
    // Arrow function here preserves this = userManager
    form.addEventListener("submit", (e) => this.submitform(e));
  },

  // Handle form submission
  submitform: function (e) {
    e.preventDefault();
    this.addUser();
  },

  // Add new user to the array
  addUser: function () {
    this.users.push({
      name: nameInput.value.trim(),
      role: roleInput.value.trim(),
      bio: bioInput.value.trim(),
      photo: photoInput.value.trim(),
    });

    form.reset();
    this.showuser();
  },

  // Display all users in the grid
  showuser: function () {
    const usersContainer = document.querySelector(".users");
    usersContainer.innerHTML = "";

    this.users.forEach((user, index) => {
      const card = document.createElement("div");
      card.className = "user-card";

      // User photo
      const img = document.createElement("img");
      img.src = user.photo || "https://via.placeholder.com/100";
      img.alt = "User Photo";
      card.appendChild(img);

      // User name
      const name = document.createElement("h3");
      name.textContent = user.name;
      card.appendChild(name);

      // User role
      const role = document.createElement("p");
      role.className = "role";
      role.textContent = user.role;
      card.appendChild(role);

      // User bio
      const desc = document.createElement("p");
      desc.className = "bio";
      desc.textContent = user.bio;
      card.appendChild(desc);

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";

      // Use this.removeUser inside arrow function
      deleteBtn.addEventListener("click", () => this.removeUser(index));
      card.appendChild(deleteBtn);

      // Append card to container
      usersContainer.appendChild(card);
    });
  },

  // Remove a user from the array
  removeUser: function (index) {
    this.users.splice(index, 1);
    this.showuser();
  },
};

// Initialize everything
userManager.firstrun();
