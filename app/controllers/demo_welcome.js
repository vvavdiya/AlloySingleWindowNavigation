// Extend the demo_view controller
exports.baseController = "demo_view";
$.main.add($.content);
var navigation = Alloy.Globals.navigation;

// Bind the button
$.button.addEventListener("click", function() {
	navigation.open("demo_subview", {title: "Subview"});
});
