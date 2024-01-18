const addGS = (css = styles) => {
  const head = document.getElementsByTagName('head')[0];
  const customFixStyle = document.getElementById('customFixStyle');

  if (!head || customFixStyle) {
    return null;
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', 'customFixStyle');
  style.innerHTML = css;

  document.head.appendChild(style);
};

// Main Function

function VkInitScript() {
  let VkApiScript = document.createElement('script');
  VkApiScript.setAttribute("src", "https://vk.com/js/api/openapi.js?169");
  VkApiScript.setAttribute("type", "text/javascript");

  document.head.appendChild(VkApiScript);

  VkApiScript.onload = () => {
    VK.init({apiId: 51447748});

    VK.Api.call('users.get', {user_ids: 1, v: "5.131"}, request => {
      if (request.response) {
        console.log(request.response[0].first_name);
        console.log('Vk Open Api is loaded.');
      }
    });
  };
}

function mainPoint() {
  console.log('Main point of script loaded.');
  VkInitScript();

  const observer = new MutationObserver(mutationRecords => {
    for(let mutation of mutationRecords) {
      /*
      if (mutation.target && mutation.target.querySelector('div.OwnerPageAvatar__in .AvatarRich__img')) {
        console.log(mutation);
      }
      */

      if (mutation.target && mutation.target.classList && mutation.target.classList.contains('vkuiAppRoot')) {
        console.log('Applying changes.');
        addGS();
        fixAvatar();
        fixPageContent();
        break;
      }
    }
  });

  // наблюдать за всем, кроме атрибутов

  observer.observe(document.getElementById('page_body'), {
    childList: true, // наблюдать за непосредственными детьми
    subtree: true // и более глубокими потомками
  });

  // injectInterval = setTimeout(tryInject(), 200);
  // window.addEventListener('click', windowClickListener, false);
}

let windowClickListener = () => {
  console.log('Click on page.');
  injectInterval = setTimeout(tryInject(), 200);
};

let injectInterval;

function tryInject(attempts = 20) {
  return () => {
    console.log('Search owner photos.');
    let photos = document.querySelector('.OwnerContentTabPhotos__items');

    if (photos && photos.firstChild) {
      console.log('Owner photos are found.');
      fixAvatar(photos);
      attempts = 0;
      return 0;
    }

    if (--attempts > 0) {
      console.log('Owner photos are not found. Count of attempts less: ' + attempts);
      injectInterval = setTimeout(tryInject(attempts), 200);
    }
  }
}

function fixAvatar(avatar) {
  avatar = document.querySelector('div.OwnerPageAvatar__in .AvatarRich__img') || avatar;

  if (!avatar) {
    return null;
  }

  let divCoverInfoWrapper = document.createElement('div');
  divCoverInfoWrapper.classList.add('ProfileHeader__wrapper');

  // pageAvatarImg.src = fullSizeAvatar.src;

  let profileHeaderDiv = document.querySelector('.ProfileHeader');
  let profileHeaderCoverDiv = profileHeaderDiv.querySelector('.OwnerPageCover');
  let profileHeaderInner = profileHeaderDiv.querySelector('.ProfileHeader__in');
  let profileHeaderAvatarDiv = profileHeaderDiv.querySelector('.ProfileHeader__ava');

  profileHeaderDiv.parentElement.insertBefore(divCoverInfoWrapper, profileHeaderDiv);
  divCoverInfoWrapper.appendChild(profileHeaderAvatarDiv);
  divCoverInfoWrapper.appendChild(profileHeaderDiv);

  // profileHeaderAvatarDiv.style.position = 'absolute';
  profileHeaderAvatarDiv.style.top = '10px';
  profileHeaderAvatarDiv.style.left = '10px';

  let coverAvatar = profileHeaderAvatarDiv.querySelector('.OwnerPageAvatar__underlay');
  let avatarRich = profileHeaderAvatarDiv.querySelector('.AvatarRich');
  let ownerPageAvatar = profileHeaderAvatarDiv.querySelector('.OwnerPageAvatar');

  ownerPageAvatar.style.borderRadius = '1';
  avatarRich.style.borderRadius = '1';
  avatarRich.style.height = '100%';

  profileHeaderDiv.style.borderRadius = '0';
  profileHeaderInner.style.borderRadius = '0';
}

function fixPageContent() {
  let profilePage = document.querySelector('.Profile__column');
  let contentWrapper = profilePage.parentElement;

  contentWrapper.style.display = 'flex';
  contentWrapper.style.flexDirection = 'row-reverse';
  contentWrapper.style.justifyContent = 'space-between';
}


(function () {
  'use strict';

  if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
    mainPoint();
  } else {
    window.addEventListener('DOMContentLoaded', mainPoint);
  }
})();