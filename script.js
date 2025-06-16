let cart = [];
let votes = { aarti: 150, dev: 125, tina: 100 };


function uploadArt() {
  const input = document.getElementById("artUpload");
  const priceInput = document.getElementById("artPrice");
  const preview = document.getElementById("uploadPreview");
  const gallery = document.getElementById("galleryContainer");

  if (input.files && input.files[0]) {
    const price = priceInput.value.trim();
    if (!price || isNaN(price) || price <= 0) {
      alert("Please enter a valid price for the artwork.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const imgSrc = e.target.result;
      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.maxWidth = "150px";

      preview.innerHTML = "<h4>Preview:</h4>";
      preview.appendChild(img);

      const container = document.createElement("div");
      container.classList.add("gallery-item");

      const galleryImg = document.createElement("img");
      galleryImg.src = imgSrc;

      const priceLabel = document.createElement("p");
      priceLabel.innerText = "₹" + price;

      const buyBtn = document.createElement("button");
      buyBtn.innerText = "Add to Cart 🛒";
      buyBtn.onclick = () => addToCart(imgSrc, price);

      container.appendChild(galleryImg);
      container.appendChild(priceLabel);
      container.appendChild(buyBtn);
      gallery.appendChild(container);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function addToCart(imgSrc, price) {
  cart.push({ imgSrc, price });
  alert("✅ Art added to cart! Total items: " + cart.length);
}

function openCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const img = document.createElement("img");
      img.src = item.imgSrc;
      img.style.maxWidth = "100px";
      const price = document.createElement("p");
      price.textContent = "₹" + item.price;
      cartItemsContainer.appendChild(img);
      cartItemsContainer.appendChild(price);
    });
  }
  document.getElementById("cartModal").style.display = "flex";
}
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function checkout() {
  alert("Thank you for your purchase! 🎉");
  cart = [];
  closeCart();
}

function joinCompetition() {
  document.getElementById("competitionStatus").textContent = "✅ You've successfully joined this week's competition!";
}

function simulateLive() {
  const result = document.getElementById("battleResult");
  const outcomes = ["You Won! 🥇", "You Lost! 😢", "It's a Draw 🤝"];
  result.textContent = outcomes[Math.floor(Math.random() * outcomes.length)];
}

function submitFeedback() {
  const input = document.getElementById("feedbackInput");
  const feedbackList = document.getElementById("feedbackList");
  if (input.value.trim() !== "") {
    const feedback = document.createElement("p");
    feedback.textContent = "🗣️ " + input.value;
    feedbackList.appendChild(feedback);
    input.value = "";
  }
}

function changeLang(lang) {
  if (lang === "hi") {
    document.querySelector(".hero h1").textContent = "Artify में आपका स्वागत है";
    document.querySelector(".hero p").textContent = "अपनी कला दिखाएं, प्रतिस्पर्धा करें, और जीतें।";
    document.querySelector(".btn").textContent = "अपनी कला अपलोड करें";
  } else {
    document.querySelector(".hero h1").textContent = "Welcome to Artify";
    document.querySelector(".hero p").textContent = "Showcase your creativity. Compete. Win. Sell. Connect.";
    document.querySelector(".btn").textContent = "Upload Your Art";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  const msg = input.value.trim();
  if (!msg) return;
  const userMsg = document.createElement("p");
  userMsg.innerHTML = "<strong>You:</strong> " + msg;
  chatWindow.appendChild(userMsg);
  const botMsg = document.createElement("p");
  botMsg.innerHTML = "<strong>Bot:</strong> " + getBotReply(msg);
  chatWindow.appendChild(botMsg);
  input.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("help")) return "How can I assist you with Artify?";
  if (msg.includes("upload")) return "Go to Upload section and add your artwork!";
  if (msg.includes("buy")) return "You can buy any artwork in the Gallery.";
  return "Sorry, I'm still learning! 😊";
}

function vote(name) {
  votes[name]++;
  document.getElementById("votes-" + name).textContent = votes[name];
  alert("✅ Voted for " + name.charAt(0).toUpperCase() + name.slice(1));
}

function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function toggleForm() {
  const title = document.getElementById("formTitle");
  const btn = document.querySelector("#authForm button");
  const switcher = document.querySelector(".switch");
  isLogin = !isLogin;
  if (isLogin) {
    title.textContent = "Login";
    btn.textContent = "Login";
    switcher.textContent = "Don't have an account? Signup";
  } else {
    title.textContent = "Signup";
    btn.textContent = "Signup";
    switcher.textContent = "Already have an account? Login";
  }
}

function authAction() {
  const email = document.getElementById("authEmail").value.trim();
  const pass = document.getElementById("authPass").value.trim();
  if (email && pass) {
    alert(`${isLogin ? "Logged in" : "Signed up"} successfully as ${email}`);
    closeLogin();
  } else {
    alert("Please fill in all fields.");
  }
}
  let isLogin = true;
    let otpCode = "";

    // Check if user is already logged in
    window.onload = () => {
      if (localStorage.getItem("loggedInUser")) {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "inline-block";
      }
    };

    function toggleForm() {
      const title = document.getElementById("formTitle");
      const btn = document.querySelector("#authForm button");
      const switcher = document.querySelector(".switch");
      const reEmail = document.getElementById("authReEmail");
      const rePass = document.getElementById("authRePass");

      isLogin = !isLogin;

      if (isLogin) {
        title.textContent = "Login";
        btn.textContent = "Login";
        switcher.textContent = "Don't have an account? Signup";
        reEmail.style.display = "none";
        rePass.style.display = "none";
        document.getElementById("otpField").style.display = "none";
      } else {
        title.textContent = "Signup";
        btn.textContent = "Signup";
        switcher.textContent = "Already have an account? Login";
        reEmail.style.display = "block";
        rePass.style.display = "block";
        document.getElementById("otpField").style.display = "block";
      }
    }

    function generateOTP() {
      otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      alert("Your OTP is: " + otpCode);
    }

    function authAction() {
      const email = document.getElementById("authEmail").value.trim();
      const pass = document.getElementById("authPass").value.trim();

      if (!email || !pass) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!isLogin) {
        const reEmail = document.getElementById("authReEmail").value.trim();
        const rePass = document.getElementById("authRePass").value.trim();
        const enteredOTP = document.getElementById("otpField").value.trim();

        if (email !== reEmail || pass !== rePass) {
          alert("Emails or Passwords do not match.");
          return;
        }

        if (!enteredOTP || enteredOTP !== otpCode) {
          alert("Invalid OTP. Try again.");
          return;
        }

        // Save user (basic local storage based simulation)
        localStorage.setItem("user-" + email, pass);
        alert("🎉 Signup Successful!");
        toggleForm(); // switch to login
      } else {
        const storedPass = localStorage.getItem("user-" + email);
        if (storedPass && storedPass === pass) {
          localStorage.setItem("loggedInUser", email);
          document.getElementById("loginBtn").style.display = "none";
          document.getElementById("logoutBtn").style.display = "inline-block";
          closeLogin();
          alert("✅ Logged in successfully!");
        } else {
          alert("❌ Invalid email or password.");
        }
      }
    }

    function openLogin() {
      document.getElementById("loginModal").style.display = "flex";
      if (!isLogin) generateOTP(); // generate OTP on signup open
    }

    function closeLogin() {
      document.getElementById("loginModal").style.display = "none";
    }

    function logout() {
      localStorage.removeItem("loggedInUser");
      alert("🚪 Logged out!");
      document.getElementById("loginBtn").style.display = "inline-block";
      document.getElementById("logoutBtn").style.display = "none";
    }
