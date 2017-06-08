function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function btnGetAllCertificatesPressed() {
        Alloy.Globals.daysToExpire = 0;
        var certificates = Alloy.createController("certificates", args).getView();
        $.activityIndicator.show();
        Alloy.Globals.mainwin.openWindow(certificates);
        $.activityIndicator.hide();
    }
    function btnGetCertificatesThatWillExpireIn3DaysPressed() {
        Alloy.Globals.daysToExpire = 3;
        var certificates = Alloy.createController("certificates", args).getView();
        $.activityIndicator.show();
        Alloy.Globals.mainwin.openWindow(certificates);
        $.activityIndicator.hide();
    }
    function btnGetCertificatesThatWillExpireIn15DaysPressed() {
        Alloy.Globals.daysToExpire = 15;
        var certificates = Alloy.createController("certificates", args).getView();
        $.activityIndicator.show();
        Alloy.Globals.mainwin.openWindow(certificates);
        $.activityIndicator.hide();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "certificatesHome";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.home = Ti.UI.createWindow({
        backgoundColor: "white",
        id: "home",
        layout: "vertical",
        backgroundColor: "white",
        title: "Certificate Management"
    });
    $.__views.home && $.addTopLevelView($.__views.home);
    $.__views.svScrollView = Ti.UI.createScrollView({
        top: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        opacity: ".93",
        id: "svScrollView",
        scrollType: "vertical",
        scrollingEnabled: true
    });
    $.__views.home.add($.__views.svScrollView);
    $.__views.lblGetAllCertificatesHelp = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 100,
            left: 10,
            color: "blue",
            font: {
                fontSize: 24
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 10,
            left: 10,
            color: "blue",
            font: {
                fontSize: 18
            }
        });
        Alloy.deepExtend(true, o, {
            text: "To view all certificates, press the All Certificates button.",
            id: "lblGetAllCertificatesHelp"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblGetAllCertificatesHelp);
    $.__views.btnGetAllCertificates = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 150,
            height: Ti.UI.SIZE,
            width: 200,
            color: "black",
            backgroundColor: "white",
            borderColor: "black",
            borderRadius: "10",
            font: {
                fontSize: 22,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 60,
            height: Ti.UI.SIZE,
            width: 200,
            color: "black",
            backgroundColor: "white",
            borderColor: "black",
            borderRadius: "10",
            font: {
                fontSize: 16,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            title: "All Certificates",
            id: "btnGetAllCertificates"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.btnGetAllCertificates);
    btnGetAllCertificatesPressed ? $.addListener($.__views.btnGetAllCertificates, "click", btnGetAllCertificatesPressed) : __defers["$.__views.btnGetAllCertificates!click!btnGetAllCertificatesPressed"] = true;
    $.__views.lblGetCertificatesThatWillExpireIn3DaysHelp = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 250,
            left: 10,
            color: "blue",
            font: {
                fontSize: 24
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 120,
            left: 10,
            color: "blue",
            font: {
                fontSize: 18
            }
        });
        Alloy.deepExtend(true, o, {
            text: "To view certificates that will expire within 3 days, press the 3 Days button.",
            id: "lblGetCertificatesThatWillExpireIn3DaysHelp"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblGetCertificatesThatWillExpireIn3DaysHelp);
    $.__views.btnGetCertificatesThatWillExpireIn3Days = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 300,
            backgroundColor: "white",
            color: "black",
            borderRadius: "10",
            font: {
                fontSize: 30
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 170,
            backgroundColor: "white",
            color: "black",
            height: 50,
            borderRadius: "10",
            font: {
                fontSize: 24
            }
        });
        Alloy.deepExtend(true, o, {
            id: "btnGetCertificatesThatWillExpireIn3Days",
            image: "/images/3-days.jpg"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.btnGetCertificatesThatWillExpireIn3Days);
    btnGetCertificatesThatWillExpireIn3DaysPressed ? $.addListener($.__views.btnGetCertificatesThatWillExpireIn3Days, "click", btnGetCertificatesThatWillExpireIn3DaysPressed) : __defers["$.__views.btnGetCertificatesThatWillExpireIn3Days!click!btnGetCertificatesThatWillExpireIn3DaysPressed"] = true;
    $.__views.lblGetCertificatesThatWillExpireIn15DaysHelp = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 600,
            left: 10,
            color: "blue",
            font: {
                fontSize: 24
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 270,
            left: 10,
            color: "blue",
            font: {
                fontSize: 18
            }
        });
        Alloy.deepExtend(true, o, {
            text: "To view certificates that will expire within 15 days, press the 15 Days button.",
            id: "lblGetCertificatesThatWillExpireIn15DaysHelp"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblGetCertificatesThatWillExpireIn15DaysHelp);
    $.__views.btnGetCertificatesThatWillExpireIn15Days = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            top: 650,
            backgroundColor: "white",
            color: "black",
            borderRadius: "10",
            font: {
                fontSize: 30
            }
        });
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 320,
            backgroundColor: "white",
            color: "black",
            height: 50,
            borderRadius: "10",
            font: {
                fontSize: 24
            }
        });
        Alloy.deepExtend(true, o, {
            id: "btnGetCertificatesThatWillExpireIn15Days",
            image: "/images/15-days.jpg"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.btnGetCertificatesThatWillExpireIn15Days);
    btnGetCertificatesThatWillExpireIn15DaysPressed ? $.addListener($.__views.btnGetCertificatesThatWillExpireIn15Days, "click", btnGetCertificatesThatWillExpireIn15DaysPressed) : __defers["$.__views.btnGetCertificatesThatWillExpireIn15Days!click!btnGetCertificatesThatWillExpireIn15DaysPressed"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: "50%",
        left: "50%",
        style: Ti.UI.ActivityIndicatorStyle.BIG_DARK,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator"
    });
    $.__views.svScrollView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    $.activityIndicator.hide();
    __defers["$.__views.btnGetAllCertificates!click!btnGetAllCertificatesPressed"] && $.addListener($.__views.btnGetAllCertificates, "click", btnGetAllCertificatesPressed);
    __defers["$.__views.btnGetCertificatesThatWillExpireIn3Days!click!btnGetCertificatesThatWillExpireIn3DaysPressed"] && $.addListener($.__views.btnGetCertificatesThatWillExpireIn3Days, "click", btnGetCertificatesThatWillExpireIn3DaysPressed);
    __defers["$.__views.btnGetCertificatesThatWillExpireIn15Days!click!btnGetCertificatesThatWillExpireIn15DaysPressed"] && $.addListener($.__views.btnGetCertificatesThatWillExpireIn15Days, "click", btnGetCertificatesThatWillExpireIn15DaysPressed);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;