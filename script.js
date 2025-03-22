// Smooth scrolling untuk navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Form submission
emailjs.init("i28Cd43tKnucE_p4j"); // Ganti dengan Public Key-mu

document.getElementById('submit-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        alert('Mohon isi semua field!');
        return;
    }
    
    // Kirim Email dengan EmailJS
    emailjs.send("service_6qzldhl", "template_x4rc94i", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    }).then(function(response) {
        alert('Terima kasih! Pesan Anda telah dikirim.');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';
    }, function(error) {
        alert('Gagal mengirim pesan. Coba lagi!');
        console.error("Error:", error);
    });
});


// Animasi scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Inisialisasi animasi
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animasi untuk section pertama
    setTimeout(() => {
        const firstSection = document.querySelector('section');
        if (firstSection) {
            firstSection.style.opacity = '1';
            firstSection.style.transform = 'translateY(0)';
        }
    }, 300);
});