// Set Amy Dark wallpaper for all desktops on current activity
var desktopsArray = desktopsForActivity(currentActivity());
for (var j = 0; j < desktopsArray.length; j++) {
    desktopsArray[j].wallpaperPlugin = "org.kde.image";
    desktopsArray[j].currentConfigGroup = ["Wallpaper", "org.kde.image", "General"];
    desktopsArray[j].writeConfig("Image", "/usr/share/wallpapers/Amy-Dark/contents/images/1440x900.jpg"); // Amy dark wallpaper path
}

// Amy Dark Panel layout (from amy-panel-layout.js, simplified and adapted)
var panelIds = panels();
var panel = new Panel;
var panelScreen = panel.screen;

// Track which edges are free (Amy tries bottom, top, left, right)
var freeEdges = {"bottom": true, "top": true, "left": true, "right": true};
for (var i = 0; i < panelIds.length; ++i) {
    var tmpPanel = panelById(panelIds[i]);
    if (tmpPanel.screen == panelScreen && tmpPanel.id != panel.id) {
        freeEdges[tmpPanel.location] = false;
    }
}

if (freeEdges["bottom"]) {
    panel.location = "bottom";
} else if (freeEdges["top"]) {
    panel.location = "top";
} else if (freeEdges["left"]) {
    panel.location = "left";
} else if (freeEdges["right"]) {
    panel.location = "right";
} else {
    panel.location = "top";
}

// Set panel height (icons-only task manager friendly)
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2);

// Limit horizontal panel max size for ultrawide monitors (Amy style)
const maximumAspectRatio = 21/9;
if (panel.formFactor === "horizontal") {
    const geo = screenGeometry(panelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);
    if (geo.width > maximumWidth) {
        panel.alignment = "center";
        panel.minimumLength = maximumWidth;
        panel.maximumLength = maximumWidth;
    }
}

// Add Amy Dark widgets — assuming similar to default but can adjust as needed
panel.addWidget("org.kde.plasma.kickoff");
panel.addWidget("org.kde.plasma.systemtray");
panel.addWidget("org.kde.plasma.digitalclock");

// Set dark translucent panel background (Amy style)
panel.currentConfigGroup = ["Appearance"];
panel.writeConfig("backgroundHints", 2);        // translucent background
panel.writeConfig("backgroundColor", "#000000"); // black
panel.writeConfig("backgroundAlpha", 0.6);      // 60% opacity
panel.currentConfigGroup = [];

// Set global Plasma theme and colors to Amy Dark
var lookAndFeelConfig = [
    {file: "kdeglobals", group: "General", key: "ColorScheme", value: "AmyDark"},
    {file: "kdeglobals", group: "Icons", key: "Theme", value: "AmyDarkIcons"},
    {file: "kdeglobals", group: "KCursor", key: "CursorTheme", value: "AmyDarkCursor"},
    {file: "plasmarc", group: "Theme", key: "name", value: "AmyDark"},
];

// Write configs for look and feel
lookAndFeelConfig.forEach(function(conf) {
    writeConfig(conf.file, conf.group, conf.key, conf.value);
});

// Helper function for writing configs in plasma script environment
function writeConfig(file, group, key, value) {
    var cfgGroup = [group];
    var config = new ConfigFile();
    config.open(file, ConfigFile.ReadWrite);
    config.group = cfgGroup;
    config.writeEntry(key, value);
    config.sync();
}