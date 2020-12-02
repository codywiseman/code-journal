
var $avatarUrl = document.querySelector('.url');

var $avatarImage = document.querySelector('.placeholder-img');

$avatarUrl.addEventListener('input', function (e) {
  $avatarImage.src = $avatarUrl.value;
});
