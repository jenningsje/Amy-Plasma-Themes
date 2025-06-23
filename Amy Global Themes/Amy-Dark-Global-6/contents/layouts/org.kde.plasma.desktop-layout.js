// layout.js — load the amy panel layout and set wallpaper plugin for desktops

loadTemplate("amy-panel-layout");  // load your detailed panel layout

// Set wallpaper plugin for all desktops on current activity
var desktopsArray = desktopsForActivity(currentActivity());
for (var j = 0; j < desktopsArray.length; j++) {
    desktopsArray[j].wallpaperPlugin = 'org.kde.image';
}

