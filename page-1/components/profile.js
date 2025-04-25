function loadProfile({ container, name, photo, country, flag, socialMedia }) {
  const profileCard = document.createElement("div");
  profileCard.className = "profile-card card";

  const profileContent = document.createElement("div");
  profileContent.className = "profile-content";

  const profilePhoto = document.createElement("img");
  profilePhoto.className = "profile-photo";
  profilePhoto.src = photo;
  profilePhoto.alt = `${name}'s profile photo`;
  profileContent.appendChild(profilePhoto);

  const profileName = document.createElement("h2");
  profileName.className = "profile-name";
  profileName.textContent = name;
  profileContent.appendChild(profileName);

  const profileCountry = document.createElement("div");
  profileCountry.className = "profile-country";
  profileCountry.innerHTML = `<span>${country}</span> ${flag}`;
  profileContent.appendChild(profileCountry);

  profileCard.appendChild(profileContent);

  const divider = document.createElement("div");
  divider.className = "profile-divider";
  profileCard.appendChild(divider);

  const socialMediaContainer = document.createElement("div");
  socialMediaContainer.className = "social-media-container";

  const socialMediaHeading = document.createElement("h3");
  socialMediaHeading.className = "social-media-heading";
  socialMediaHeading.textContent = "Social Media";
  socialMediaContainer.appendChild(socialMediaHeading);

  const socialMediaLinks = document.createElement("div");
  socialMediaLinks.className = "social-media-links";

  if (socialMedia.facebook) {
    const facebookLink = createSocialLink(
      socialMedia.facebook.url,
      "fa-brands fa-facebook-f",
      socialMedia.facebook.label,
    );
    socialMediaLinks.appendChild(facebookLink);
  }

  if (socialMedia.instagram) {
    const instagramLink = createSocialLink(
      socialMedia.instagram.url,
      "fa-brands fa-instagram",
      socialMedia.instagram.label,
    );
    socialMediaLinks.appendChild(instagramLink);
  }

  if (socialMedia.twitter) {
    const twitterLink = createSocialLink(
      socialMedia.twitter.url,
      "fa-brands fa-twitter",
      socialMedia.twitter.label,
    );
    socialMediaLinks.appendChild(twitterLink);
  }

  socialMediaContainer.appendChild(socialMediaLinks);

  profileCard.appendChild(socialMediaContainer);

  container.appendChild(profileCard);
}

function createSocialLink(url, iconClass, label) {
  const link = document.createElement("a");
  link.className = "social-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const icon = document.createElement("i");
  icon.className = `${iconClass} social-icon`;
  link.appendChild(icon);

  const text = document.createElement("span");
  text.textContent = label;
  link.appendChild(text);

  return link;
}
