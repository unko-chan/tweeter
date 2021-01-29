"use strict";

const Chance      = require("chance"),
      chance      = new Chance();

const md5 = require('md5');


module.exports = {
  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.last();
    const userName  = firstName + " " + lastName;
    
    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }
   
    const avatars = {
    
      Female: ["https://i.imgur.com/yaktK6q.png","https://i.imgur.com/KZgbR05.png","https://i.imgur.com/AzWPj5K.png","https://i.imgur.com/4oJyL9W.png", "https://i.imgur.com/8JXCIH1.png"],
      Male: ["https://i.imgur.com/l1Kyki7.png","https://i.imgur.com/GukyDiR.png","https://i.imgur.com/Rfpv0Tw.png","https://i.imgur.com/30X6f8Y.png", "https://i.imgur.com/am3I9Ov.png"]
    
    }
    
    const avatarArray = avatars[gender]
    const userAvatar = avatarArray[Math.floor(Math.random()*avatarArray.length)]
  

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar
    };
  }
};