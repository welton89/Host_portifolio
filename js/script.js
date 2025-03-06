// document.addEventListener('DOMContentLoaded', function() {
//     const navToggle = document.querySelector('.nav-toggle');
//     const navLinks = document.querySelector('.nav-links');
  
//     if (navToggle) {
//       navToggle.addEventListener('click', function() {
//         navLinks.classList.toggle('active');
//       });
//     }
//   });


  document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
  
    if (navToggle) {
      navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    document.addEventListener('click', function(event) {
      if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && !navToggle.contains(event.target)) {
        navLinks.classList.remove('active');
      }
    });
  });
  