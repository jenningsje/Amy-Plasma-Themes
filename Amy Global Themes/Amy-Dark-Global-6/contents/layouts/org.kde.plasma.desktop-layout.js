var desktopsArray = desktopsForActivity(currentActivity());

for (var j = 0; j < desktopsArray.length; j++) {
    desktopsArray[j].wallpaperPlugin = "org.kde.image";
    desktopsArray[j].currentConfigGroup = ["Wallpaper", "org.kde.image", "General"];
    desktopsArray[j].writeConfig("Image", "/usr/share/wallpapers/Next/contents/images/1440x900.jpg");
}

