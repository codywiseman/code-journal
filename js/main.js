
var $profileForm = document.querySelector('.profile-form');

var $avatarUrl = document.querySelector('.url');

var $avatarImage = document.querySelector('.placeholder-img');

/* var $submit = document.querySelector('.submit') */

$profileForm.addEventListener('input', function (e) {
  $avatarImage.src = $avatarUrl.value;
});

$profileForm.addEventListener('submit', function (e) {

});
