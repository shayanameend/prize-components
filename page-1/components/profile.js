function loadProfile({ container, name, photo, country, flag, socialMedia }) {
  const profileCard = document.createElement("div");
  profileCard.className = "ca-profile-card ca-card";

  const profileContent = document.createElement("div");
  profileContent.className = "ca-profile-content";

  const profilePhoto = document.createElement("img");
  profilePhoto.className = "ca-profile-photo";
  profilePhoto.src = photo;
  profilePhoto.alt = `${name}'s profile photo`;
  profileContent.appendChild(profilePhoto);

  const profileTextInfo = document.createElement("div");
  profileTextInfo.className = "ca-profile-text-info";

  const profileName = document.createElement("h2");
  profileName.className = "ca-profile-name";
  profileName.textContent = name;
  profileTextInfo.appendChild(profileName);

  const profileCountry = document.createElement("div");
  profileCountry.className = "ca-profile-country";
  profileCountry.innerHTML = `<span>${country}</span> ${flag}`;
  profileTextInfo.appendChild(profileCountry);

  profileContent.appendChild(profileTextInfo);

  profileCard.appendChild(profileContent);

  const divider = document.createElement("div");
  divider.className = "ca-profile-divider";
  profileCard.appendChild(divider);

  const socialMediaContainer = document.createElement("div");
  socialMediaContainer.className = "ca-social-media-container";

  const socialMediaHeading = document.createElement("h3");
  socialMediaHeading.className = "ca-social-media-heading";
  socialMediaHeading.textContent = "Social Media";
  socialMediaContainer.appendChild(socialMediaHeading);

  const socialMediaLinks = document.createElement("div");
  socialMediaLinks.className = "ca-social-media-links";

  if (socialMedia.facebook) {
    const facebookLink = createSocialLink(
      socialMedia.facebook.url,
      "fa-brands fa-facebook-f",
      socialMedia.facebook.label
    );
    socialMediaLinks.appendChild(facebookLink);
  }

  if (socialMedia.instagram) {
    const instagramLink = createSocialLink(
      socialMedia.instagram.url,
      "fa-brands fa-instagram",
      socialMedia.instagram.label
    );
    socialMediaLinks.appendChild(instagramLink);
  }

  if (socialMedia.twitter) {
    const twitterLink = createSocialLink(
      socialMedia.twitter.url,
      "fa-brands fa-twitter",
      socialMedia.twitter.label
    );
    socialMediaLinks.appendChild(twitterLink);
  }

  socialMediaContainer.appendChild(socialMediaLinks);

  const socialMediaContainerMobile = socialMediaContainer.cloneNode(true);
  socialMediaContainer.classList.add("ca-social-media-desktop");
  socialMediaContainerMobile.classList.add("ca-social-media-mobile");

  profileCard.appendChild(socialMediaContainer);

  container.appendChild(profileCard);
  container.appendChild(socialMediaContainerMobile);
}

function createSocialLink(url, iconClass, label) {
  const link = document.createElement("a");
  link.className = "ca-social-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const icon = document.createElement("i");
  icon.className = `${iconClass} ca-social-icon`;
  link.appendChild(icon);

  const text = document.createElement("span");
  text.textContent = label;
  link.appendChild(text);

  return link;
}
