function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openCommunities() {
        var communities = Alloy.createController("communities", args).getView();
        Alloy.Globals.mainwin.openWindow(communities);
    }
    function openStuckMessages() {
        alert("show stuck messages");
    }
    function openExpiringCertificates() {
        var certificatesHome = Alloy.createController("certificatesHome", args).getView();
        Alloy.Globals.mainwin.openWindow(certificatesHome);
    }
    function mnuLogoutClicked() {
        Ti.App.Properties.getBool("remember");
        Ti.App.fireEvent("cleanUpAfterLogoutEvent");
        Alloy.createController("login").getView().open();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.community = Ti.UI.createWindow({
        id: "community",
        backgroundColor: "white",
        title: ""
    });
    $.__views.logoutBtn = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            color: "black",
            font: {
                fontSize: 12
            },
            right: 15,
            top: 20
        });
        Alloy.deepExtend(true, o, {
            id: "logoutBtn",
            title: L("mainmenu_logout")
        });
        return o;
    }());
    $.__views.community.add($.__views.logoutBtn);
    mnuLogoutClicked ? $.addListener($.__views.logoutBtn, "click", mnuLogoutClicked) : __defers["$.__views.logoutBtn!click!mnuLogoutClicked"] = true;
    $.__views.ivCommunities = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "10%",
            height: "15%",
            center: "50%"
        });
        Alloy.deepExtend(true, o, {
            id: "ivCommunities",
            image: "/images/social_graph-512.png"
        });
        return o;
    }());
    $.__views.community.add($.__views.ivCommunities);
    openCommunities ? $.addListener($.__views.ivCommunities, "click", openCommunities) : __defers["$.__views.ivCommunities!click!openCommunities"] = true;
    $.__views.lblCommunities = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "25%",
            center: "50%",
            color: "blue",
            font: {
                fontSize: 32,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "Communities",
            id: "lblCommunities"
        });
        return o;
    }());
    $.__views.community.add($.__views.lblCommunities);
    openCommunities ? $.addListener($.__views.lblCommunities, "click", openCommunities) : __defers["$.__views.lblCommunities!click!openCommunities"] = true;
    $.__views.ivMessages = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "40%",
            height: "15%",
            center: "50%"
        });
        Alloy.deepExtend(true, o, {
            id: "ivMessages",
            image: "/images/messages.jpg"
        });
        return o;
    }());
    $.__views.community.add($.__views.ivMessages);
    openStuckMessages ? $.addListener($.__views.ivMessages, "click", openStuckMessages) : __defers["$.__views.ivMessages!click!openStuckMessages"] = true;
    $.__views.lblStuckMessages = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "55%",
            center: "50%",
            color: "blue",
            font: {
                fontSize: 32,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "Messages",
            id: "lblStuckMessages"
        });
        return o;
    }());
    $.__views.community.add($.__views.lblStuckMessages);
    openStuckMessages ? $.addListener($.__views.lblStuckMessages, "click", openStuckMessages) : __defers["$.__views.lblStuckMessages!click!openStuckMessages"] = true;
    $.__views.ivCertificates = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "70%",
            height: "15%",
            width: 125,
            center: "50%"
        });
        Alloy.deepExtend(true, o, {
            id: "ivCertificates",
            image: "/images/certificates-icon.png"
        });
        return o;
    }());
    $.__views.community.add($.__views.ivCertificates);
    openExpiringCertificates ? $.addListener($.__views.ivCertificates, "click", openExpiringCertificates) : __defers["$.__views.ivCertificates!click!openExpiringCertificates"] = true;
    $.__views.lblExpiringCertificates = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "85%",
            center: "50%",
            color: "blue",
            font: {
                fontSize: 32,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "Certificates",
            id: "lblExpiringCertificates"
        });
        return o;
    }());
    $.__views.community.add($.__views.lblExpiringCertificates);
    openExpiringCertificates ? $.addListener($.__views.lblExpiringCertificates, "click", openExpiringCertificates) : __defers["$.__views.lblExpiringCertificates!click!openExpiringCertificates"] = true;
    $.__views.home = (require("ui").createNavigationWindow || Ti.UI.iOS.createNavigationWindow)({
        window: $.__views.community,
        id: "home"
    });
    $.__views.home && $.addTopLevelView($.__views.home);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    Alloy.Globals.mainwin = $.getView();
    $.community.hideNavBar(true, {
        animated: false
    });
    __defers["$.__views.logoutBtn!click!mnuLogoutClicked"] && $.addListener($.__views.logoutBtn, "click", mnuLogoutClicked);
    __defers["$.__views.ivCommunities!click!openCommunities"] && $.addListener($.__views.ivCommunities, "click", openCommunities);
    __defers["$.__views.lblCommunities!click!openCommunities"] && $.addListener($.__views.lblCommunities, "click", openCommunities);
    __defers["$.__views.ivMessages!click!openStuckMessages"] && $.addListener($.__views.ivMessages, "click", openStuckMessages);
    __defers["$.__views.lblStuckMessages!click!openStuckMessages"] && $.addListener($.__views.lblStuckMessages, "click", openStuckMessages);
    __defers["$.__views.ivCertificates!click!openExpiringCertificates"] && $.addListener($.__views.ivCertificates, "click", openExpiringCertificates);
    __defers["$.__views.lblExpiringCertificates!click!openExpiringCertificates"] && $.addListener($.__views.lblExpiringCertificates, "click", openExpiringCertificates);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;