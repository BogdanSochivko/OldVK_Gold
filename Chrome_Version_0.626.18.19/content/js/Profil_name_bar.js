window.addEventListener('load', function() {
  (function() {
    if (document.getElementById('profile_redesigned')) {
      var content = document.getElementById('content');
      var profileName = document.createElement('span');
      profileName.className = 'Profile_Name';
      content.insertBefore(profileName, content.firstChild);
      var ownerPageName = document.querySelector('[owner_page_name]');
      if (ownerPageName) {
        profileName.textContent = ownerPageName.getAttribute('owner_page_name');
      }
    }
  })();
});