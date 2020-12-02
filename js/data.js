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

window.addEventListener('beforeunload', function (e) {
  if (data.profile.username !== '') {
    var dataJSON = JSON.stringify(data);
    localStorage.setItem('profile data', dataJSON);
  }
});
