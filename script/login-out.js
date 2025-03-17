const headerArea = document.getElementById("header");
const bannerArea =document.getElementById("banner-sect");
const cardArea = document.getElementById("card-sect");
const faqArea = document.getElementById("faq-sect");
const inputName = document.getElementById("input-name");
const password = document.getElementById("input-pass");


document.getElementById("login").addEventListener("click", function () {
  if(inputName.value) {
    if(Number(password.value) === 123456) {
      Swal.fire({
        title: 'Login Successful',
        text: 'আজ নতুন কিছু শেখা যাক!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
        bannerArea.classList.add('hidden');
        headerArea.classList.remove('hidden');
        cardArea.classList.remove('hidden');
        faqArea.classList.remove('hidden');
    }
    else {
        alert('Wrong Password! Contact admin to get your password');
    }
  } else {
    alert('Please tell us your name first!'); 
  }
  inputName.value = '';
  password.value = '';
});

document.getElementById('logout').addEventListener('click', function() {
    bannerArea.classList.remove('hidden');
  headerArea.classList.add('hidden');
  cardArea.classList.add('hidden');
  faqArea.classList.add('hidden');
})
