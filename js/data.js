/* exported data */

var data = {
  view: 'edit-profile',
  profile: {
    username: '',
    fullName: '',
    location: '',
    avatarUrl: '',
    bio: ''
  },
  entries: []
};

var previousProfile = localStorage.getItem('profile data');

if (previousProfile !== null) {
  data = (JSON.parse(previousProfile));
}

window.addEventListener('beforeunload', function (e) {
  if (data.profile.username !== '') {
    var dataJSON = JSON.stringify(data);
    localStorage.setItem('profile data', dataJSON);
  }
});
