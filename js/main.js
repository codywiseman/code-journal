
var $profileForm = document.querySelector('.profile-form');

var $avatarImage = document.querySelector('.placeholder-img');

var $inputElements = document.querySelectorAll('[type=text]');

$profileForm.addEventListener('input', function (e) {
  if (e.target.matches('[name=avatarUrl]')) { $avatarImage.src = e.target.value; }
});

$profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  for (var inputNode = 0; inputNode < $inputElements.length; inputNode++) {
    data.profile[$inputElements[inputNode].name] = $inputElements[inputNode].value;

  }
});
