//Hamburger for mobileresponsiveness 
const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');

    // Toggle the icon
    if (menu.classList.contains('active')) {
      hamburger.innerHTML = '&times;'; // ✖
    } else {
      hamburger.innerHTML = '&#9776;'; // ☰
    }
  });

   // Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if(name && email && message) {
        let feedback = { name, email, message };
        
        // Save to localStorage
        let storedFeedback = JSON.parse(localStorage.getItem('feedbacks')) || [];
        storedFeedback.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(storedFeedback));

        // Show confirmation
        document.getElementById('confirmation').innerText = "Thank you! Your message has been sent.";
        document.getElementById('contactForm').reset();
      }
    });

    // FAQ Accordion
    const acc = document.querySelectorAll(".accordion button");
    acc.forEach(btn => {
      btn.addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
      });
    });