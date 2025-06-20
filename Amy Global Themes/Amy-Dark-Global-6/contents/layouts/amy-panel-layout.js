// amy-panel-layout.js — minimal working panel layout

var panelIds = panels();
var panel = new Panel;
var panelScreen = panel.screen;

// Track which edges are free
var freeEdges = {"bottom": true, "top": true, "left": true, "right": true};

for (var i = 0; i < panelIds.length; ++i) {
    var tmpPanel = panelById(panelIds[i]);
    if (tmpPanel.screen == panelScreen) {
        // Ignore the new panel itself
        if (tmpPanel.id != panel.id) {
            freeEdges[tmpPanel.location] = false;
        }
    }
}

// Place panel on first free edge: bottom, top, left, right (in that order)
if (freeEdges["bottom"]) {
    panel.location = "bottom";
} else if (freeEdges["top"]) {
    panel.location = "top";
} else if (freeEdges["left"]) {
    panel.location = "left";
} else if (freeEdges["right"]) {
    panel.location = "right";
} else {
    // fallback
    panel.location = "top";
}

// Panel height (icons-only task manager friendly)
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2);

// Limit horizontal panel max size for ultrawide monitors
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

// Add some standard widgets
panel.addWidget("org.kde.plasma.kickoff");
panel.addWidget("org.kde.plasma.systemtray");
panel.addWidget("org.kde.plasma.digitalclock");

// Set dark translucent background on the panel
panel.currentConfigGroup = ["Appearance"];
panel.writeConfig("backgroundHints", 2);       // enable translucent background
panel.writeConfig("backgroundColor", "#000000"); // black
panel.writeConfig("backgroundAlpha", 0.6);     // 60% opacity
panel.currentConfigGroup = [];
