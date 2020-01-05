let placeholderCoverList = [
  "/img/create-amazing-amazon-alexa-skills.jpeg",
  "/img/do-your-video-and-photo-editing.png",
  "/img/provide-high-quality-audio-video-editing-services.jpg",
  "/img/provide-high-quality-audio-video-editing-services.png",
  "/img/do-your-video-and-photo-editing.jpeg",
  "/img/edit-your-video-to-perfection.png",
  "/img/create-short-versions-of-your-ad-to-social-media.png",
  "/img/edit-your-footage-into-a-sleek-corporate-video.png"
];

function generateCover() {
  let randomIndex = Math.floor(Math.random() * placeholderCoverList.length);
  let placeholderCover = placeholderCoverList[randomIndex];
  return placeholderCover;
}

let placeholderAvatarList = [
  "/img/61461bc1-7d1c-4b0c-97e2-d818f1244de9.webp",
  "/img/1466002444103_Profile.webp",
  "/img/f4d65675-05fb-4688-aa53-18ddaabe993d.webp",
  "/img/8f2a6a18-a421-422d-868e-028aa3a03259.webp",
  "/img/square_white.webp",
  "/img/afa1de53-5ebd-4e04-aaad-8e12b68fc5fb.webp"
];

function generateAvatar() {
  let randomIndex = Math.floor(Math.random() * placeholderAvatarList.length);
  let placeholderAvatar = placeholderAvatarList[randomIndex];
  return placeholderAvatar;
}

export { generateCover, generateAvatar };
