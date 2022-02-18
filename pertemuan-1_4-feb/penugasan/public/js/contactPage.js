const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', () => {
  console.log('form submitted');
  Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  );
});