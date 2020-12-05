
var $profileForm = document.querySelector('.profile-form');
var $entryForm = document.querySelector('.entry-form')
var $avatarImage = document.querySelector('.placeholder-img');
var $entryImage = document.querySelector('.entry-img-place');
var $inputElements = document.querySelectorAll('.form-input[type=text]');
var $entryInputs = document.querySelectorAll('.entry-input[type = text]');
var $profileDiv = document.querySelector('div[data-view="profile"]');
var $viewClasses = document.querySelectorAll('.view');
var $bio = document.getElementById('bio');




/*    Photo Input Listeners   */

$profileForm.addEventListener('input', function (e) {
  if (e.target.matches('[name=avatarUrl]')) { $avatarImage.src = e.target.value; }
});

$entryForm.addEventListener('input', function (e) {
  if (e.target.matches('[name=photoUrl]')) { $entryImage.src = e.target.value; }
});



/*    Submit Listeners    */


$profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  for (var inputNode = 0; inputNode < $inputElements.length; inputNode++) {
    data.profile[$inputElements[inputNode].name] = $inputElements[inputNode].value;
  }
  $profileForm.reset();
  $avatarImage.src = 'images/placeholder-image-square.jpg';
  dataView('profile');
});


$entryForm.addEventListener('submit', function(e) {
  var entryObject = {};
  for(var entry = 0; entry < $entryInputs.length; entry++){
    entryObject[$entryInputs[entry].name] = $entryInputs[entry].value;
  }
  data.entries.unshift(entryObject);
  $entryForm.reset();
  $entryImage.src = 'images/placeholder-image-square.jpg';
  dataView('entries');
});


/*   Render Profile and Journal Entry DOM Creation Function    */

function renderProfile(avatar) {
  var divOne = document.createElement('div');
  divOne.setAttribute('data-view', 'profile');
  divOne.setAttribute('class', 'view');

  var divTwo = document.createElement('div');

  var headingOne = document.createElement('h1');

  var headingOneText = document.createTextNode(data.profile.fullName);

  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'row');

  var divFour = document.createElement('div');
  divFour.setAttribute('class', 'column-half');

  var avatarImg = document.createElement('img');
  avatarImg.setAttribute('src', data.profile.avatarUrl);
  avatarImg.setAttribute('class', 'placeholder-img');
  avatarImg.setAttribute('alt', 'Avatar Photo');

  var divFive = document.createElement('div');
  divFive.setAttribute('class', 'column-half');

  var headingFour = document.createElement('h4');

  var iconImgOne = document.createElement('img');
  iconImgOne.setAttribute('src', 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png');
  iconImgOne.setAttribute('class', 'icon');

  var headingFourText = document.createTextNode(data.profile.username);

  var headingThree = document.createElement('h3');

  var iconImgTwo = document.createElement('img');
  iconImgTwo.setAttribute('src', 'https://img.icons8.com/pastel-glyph/2x/worldwide-location.png');
  iconImgTwo.setAttribute('class', 'icon');

  var headingThreeText = document.createTextNode(data.profile.location);

  var paraOne = document.createElement('p');

  var bioText = document.createTextNode(data.profile.bio);

  var link = document.createElement('a');
  var linkText = document.createTextNode('EDIT');
  link.setAttribute('href', '#');
  link.setAttribute('data-view', 'edit-profile');
  link.setAttribute('class', 'edit');

  divOne.appendChild(divTwo);
  headingOne.appendChild(headingOneText);
  divTwo.appendChild(headingOne);
  divFour.appendChild(avatarImg);
  divThree.appendChild(divFour);
  headingFour.appendChild(iconImgOne);
  headingFour.appendChild(headingFourText);
  divFive.appendChild(headingFour);
  divThree.appendChild(divFive);
  headingThree.appendChild(iconImgTwo);
  headingThree.appendChild(headingThreeText);
  divFive.appendChild(headingThree);
  paraOne.appendChild(bioText);
  divFive.appendChild(paraOne);
  link.appendChild(linkText);
  divFive.appendChild(link);
  divOne.appendChild(divThree);

  return divOne;
}



function renderJournalEntry (entry) {
  for(var x = 0; x < data.entries.length; x++ ) {
    var listItem = document.createElement('li');
    var divRow = document.createElement('div');
    divRow.setAttribute('class', 'row');
    var divColOne = document.createElement('div');
    divColOne.setAttribute('class', 'column-half');
    var entryImg = document.createElement('img');
    entryImg.setAttribute('src', entry.photoUrl);
    entryImg.setAttribute('class', 'entry-img');
    var divColTwo = document.createElement('div');
    divColTwo.setAttribute('class', 'column-half');
    var entryHeadTag = document.createElement('h3');
    entryHeadTag.setAttribute('class', 'entry-title');
    var entryTitle = document.createTextNode(entry.title);
    entryHeadTag.appendChild(entryTitle);
    var entryTag = document.createElement('p');
    var entryNotes = document.createTextNode(entry.notes);
    entryTag.appendChild(entryNotes);

    listItem.appendChild(divRow);
    divRow.appendChild(divColOne);
    divColOne.appendChild(entryImg);
    divRow.appendChild(divColTwo);
    divColTwo.appendChild(entryHeadTag);
    divColTwo.appendChild(entryTag);

    $orderedList.appendChild(listItem);
}
}



/*    View Swapping    */

function dataView(viewName) {
  for (var i = 0; i < $viewClasses.length; i++) {
    if ($viewClasses[i].getAttribute('data-view') === viewName) {
      $viewClasses[i].className = 'view';
      data.view = viewName;
    } else {
      $viewClasses[i].className = 'view hidden';
    }
  }
  if (viewName === 'profile') {
    $profileDiv.innerHTML = '';
    $profileDiv.appendChild(renderProfile(data));
  }
  for (var input = 0; input < $inputElements.length; input++) {
    if (viewName === 'edit-profile' && data.profile.username !== '') {
      var inputNameValue = data.profile[$inputElements[input].getAttribute('name')];
      $inputElements[input].setAttribute('value', inputNameValue);
    }
  }
  if (viewName === 'edit-profile' && data.profile.username !== '') {
    $avatarImage.src = data.profile.avatarUrl;
    $bio.value = data.profile.bio;
  }
}


 /*     Click Event Listener For Edits      */


document.addEventListener('click', function(e) {
  if(e.target.tagName !== 'A') {
    return;
  } else if (e.target.matches('a.edit')){
    dataView('edit-profile');
  } else if (e.target.matches('.profile-link') && data.profile.username !== ''){
    dataView('profile');
  } else if (e.target.matches('.entries-link') && data.profile.username !== '') {
    dataView('entries');
  } else if (e.target.matches('.new-entry') && data.profile.username !== '') {
    dataView('create-entry');
  }
})
