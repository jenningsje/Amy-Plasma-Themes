// Set Plasma global theme to Amy Dark
var themeConfig = workspace.readConfig("org.kde.kdeglobals", "KDE", "ColorScheme");
if (themeConfig !== "AmyDark") {
    workspace.writeConfig("org.kde.kdeglobals", "KDE", "ColorScheme", "AmyDark");
}

// Now apply the Amy panel layout script from the repo
// (replace this block with actual amy-panel layout code from GitHub)
var panelIds = panels();
var panel = new Panel;
var panelScreen = panel.screen;

// You can add logic here to place panel etc.
// (Use amy-panel-layout.js code you have)

panel.addWidget("org.kde.plasma.kickoff");
panel.addWidget("org.kde.plasma.systemtray");
panel.addWidget("org.kde.plasma.digitalclock");

panel.currentConfigGroup = ["Appearance"];
panel.writeConfig("backgroundHints", 2);       // translucent background
panel.writeConfig("backgroundColor", "#000000"); // black
panel.writeConfig("backgroundAlpha", 0.6);     // 60% opacity
panel.currentConfigGroup = [];
