(function() {
'User';
if (document.getElementById('profile')) {
var content = document.getElementById('content');
var profileName = document.createElement('span');
profileName.className = 'Profile_Name';
content.insertBefore(profileName, content.firstChild);
profileName.textContent = document.getElementsByTagName('title')[0].textContent;
}
})();