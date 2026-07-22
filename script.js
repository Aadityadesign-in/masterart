// 1. Top Scroll Progress Bar & Active Nav Highlight
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
    
    // Parallax Effect
    let parallax = document.querySelector('.parallax-bg');
    if (parallax) {
        let offset = window.pageYOffset;
        parallax.style.transform = `translate(-5%, calc(-5% + ${offset * 0.25}px))`;
    }

    // Scroll-Spy Navigation Highlight
    let sections = document.querySelectorAll('section, footer');
    let navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let activeNav = document.querySelector('nav ul li a[href*=' + id + ']');
                if (activeNav) activeNav.classList.add('active');
            });
        }
    });
};

// 2. Direct WhatsApp Booking Function (Guaranteed Working)
function sendToWhatsApp(event) {
    event.preventDefault(); // Page reload rokne ke liye

    // 🔴 IMPORTANT: Yahan apna WhatsApp Number daalein (Country Code 91 ke saath, Bina + ya space ke)
    const ownerWhatsAppNumber = "919135766040"; 

    // Form inputs se value lena
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const date = document.getElementById('custDate').value;
    const guests = document.getElementById('custGuests').value;

    // Encoded WhatsApp Message
    const message = `*NEW TABLE RESERVATION*%0A` +
                    `--------------------%0A` +
                    `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                    `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                    `📅 *Date:* ${encodeURIComponent(date)}%0A` +
                    `👥 *Guests:* ${encodeURIComponent(guests)}%0A%0A` +
                    `Please confirm my reservation!`;

    // WhatsApp Direct Link
    const whatsappURL = `https://wa.me/${ownerWhatsAppNumber}?text=${message}`;

    // New Tab me WhatsApp kholna
    window.open(whatsappURL, '_blank');
}

// 3. Website AI Chatbot Toggle Logic
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('hidden');
}

// Chatbot Auto Response System
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
}

function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // Add User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.innerHTML = `<p>${userMessage}</p>`;
    chatBody.appendChild(userDiv);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // AI Reply Simulation
    setTimeout(() => {
        let botReply = "Namaste! 🙏 Welcome to Masala Art.";
        const lower = userMessage.toLowerCase();
        
        if (lower.includes('hello') || lower.includes('hi')) {
            botReply = "Namaste! How can I assist you today?";
        } else if (lower.includes('menu') || lower.includes('dish')) {
            botReply = "Today's specials are Shahi Paneer, Hyderabadi Biryani, and fresh Garlic Naan!";
        } else if (lower.includes('book') || lower.includes('table')) {
            botReply = "You can fill out our 'Book A Table' form in the Reservations section!";
        } else {
            botReply = "Thanks for asking! Let me get that information for you.";
        }

        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-message';
        botDiv.innerHTML = `<p>${botReply}</p>`;
        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}