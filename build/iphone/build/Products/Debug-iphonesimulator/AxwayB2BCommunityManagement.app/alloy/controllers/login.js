function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function swcKeepMeSignedInChecked() {
        true == $.swcKeepMeSignedIn.value ? Ti.App.Properties.setBool("remember", true) : Ti.App.Properties.setBool("remember", false);
    }
    function btnLoginClicked() {
        if (0 != $.txtUserName.value.length && 0 != $.txtPassword.value.length) {
            $.activityIndicator.show();
            var hostIP = $.txtHostIP.value, username = $.txtUserName.value, password = $.txtPassword.value;
            true == $.swcKeepMeSignedIn.value && LoginGlobal.saveLoginInformationToProperties(username, hostIP);
            LoginGlobal.login(hostIP, username, password);
        } else alert("Please enter a username and password.");
    }
    function loginBackButtonPressed() {}
    function nextField(e) {
        var data = JSON.stringify(e.source), nextField = JSON.parse(data).nextTextBox;
        switch (nextField) {
          case "txtUserName":
            $.txtUserName.focus();
            break;

          case "txtPassword":
            $.txtPassword.focus();
        }
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundImage: "/images/login_background.png",
        id: "login",
        navBarHidden: true,
        fullscreen: true,
        title: ""
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    loginBackButtonPressed ? $.addListener($.__views.login, "androidback", loginBackButtonPressed) : __defers["$.__views.login!androidback!loginBackButtonPressed"] = true;
    $.__views.svScrollView = Ti.UI.createScrollView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "10%",
            width: "80%",
            height: "70%",
            backgroundColor: "white",
            opacity: ".93",
            borderRadius: "10"
        });
        Alloy.deepExtend(true, o, {
            id: "svScrollView",
            scrollType: "vertical",
            scrollingEnabled: true
        });
        return o;
    }());
    $.__views.login.add($.__views.svScrollView);
    $.__views.lblProductName = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            height: "17%",
            width: "100%",
            top: 0,
            color: "white",
            backgroundColor: "#3d4051",
            textAlign: "center",
            font: {
                fontSize: "22"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblProductName"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.lblProductName);
    $.__views.imgAxwayLogo = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            height: "70",
            left: "2%",
            top: "2%",
            image: "/images/Axway_logo_tag_vert_rev_rgb.png"
        });
        Alloy.deepExtend(true, o, {
            id: "imgAxwayLogo"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.imgAxwayLogo);
    $.__views.vwLoginView = Ti.UI.createView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            width: Ti.UI.SIZE
        });
        Alloy.deepExtend(true, o, {
            id: "vwLoginView"
        });
        return o;
    }());
    $.__views.svScrollView.add($.__views.vwLoginView);
    $.__views.lblWelcome = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            left: 0,
            top: "20%",
            width: 200,
            color: "black",
            font: {
                fontSize: "28"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblWelcome"
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.lblWelcome);
    $.__views.txtHostIP = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "32%",
            width: "85%",
            height: 35,
            borderColor: "gray",
            backgroundColor: "white",
            backgroundFocusedColor: "white",
            hintText: "URL",
            hintTextColor: "gray",
            autocorrect: false,
            autocapitalization: false,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "txtHostIP",
            nextTextBox: "txtUserName"
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.txtHostIP);
    nextField ? $.addListener($.__views.txtHostIP, "return", nextField) : __defers["$.__views.txtHostIP!return!nextField"] = true;
    $.__views.txtUserName = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "42%",
            width: "85%",
            height: 35,
            borderColor: "gray",
            backgroundColor: "white",
            backgroundFocusedColor: "white",
            hintTextColor: "gray",
            autocorrect: false,
            autocapitalization: false,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "txtUserName",
            nextTextBox: "txtPassword"
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.txtUserName);
    nextField ? $.addListener($.__views.txtUserName, "return", nextField) : __defers["$.__views.txtUserName!return!nextField"] = true;
    $.__views.txtPassword = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "52%",
            width: "85%",
            height: 35,
            borderColor: "gray",
            backgroundColor: "white",
            backgroundFocusedColor: "white",
            hintTextColor: "gray",
            passwordMask: true,
            autocorrect: false,
            autocapitalization: false,
            borderRadius: "5"
        });
        Alloy.deepExtend(true, o, {
            id: "txtPassword",
            autocorrect: false
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.txtPassword);
    btnLoginClicked ? $.addListener($.__views.txtPassword, "return", btnLoginClicked) : __defers["$.__views.txtPassword!return!btnLoginClicked"] = true;
    $.__views.lblRememberMe = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            left: "12.5%",
            top: "68%",
            width: 200,
            color: "gray",
            font: {
                fontSize: "16"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblRememberMe",
            text: "remember me"
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.lblRememberMe);
    $.__views.swcKeepMeSignedIn = Ti.UI.createSwitch(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            right: "12.5%",
            top: "67%",
            color: "black",
            tintColor: "gray",
            font: {
                fontSize: "18"
            }
        });
        Alloy.deepExtend(true, o, {
            value: false,
            id: "swcKeepMeSignedIn"
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.swcKeepMeSignedIn);
    swcKeepMeSignedInChecked ? $.addListener($.__views.swcKeepMeSignedIn, "change", swcKeepMeSignedInChecked) : __defers["$.__views.swcKeepMeSignedIn!change!swcKeepMeSignedInChecked"] = true;
    $.__views.btnLogin = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "85%",
            width: "70%",
            color: "white",
            backgroundColor: "#407CA0"
        });
        Alloy.deepExtend(true, o, {
            id: "btnLogin"
        });
        return o;
    }());
    $.__views.vwLoginView.add($.__views.btnLogin);
    btnLoginClicked ? $.addListener($.__views.btnLogin, "click", btnLoginClicked) : __defers["$.__views.btnLogin!click!btnLoginClicked"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: -50,
        width: "50",
        height: "50",
        indicatorColor: "black",
        id: "activityIndicator"
    });
    $.__views.vwLoginView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var LoginGlobal = {};
    !function() {
        $.lblProductName.text = L("product_name");
        $.lblWelcome.text = L("welcome_message");
        $.btnLogin.title = L("login");
        $.txtUserName.hintText = L("username");
        $.txtPassword.hintText = L("password");
        $.swcKeepMeSignedIn.title = L("remember");
        var rememberMeFromProperties = Ti.App.Properties.getBool("remember", false);
        if (true == rememberMeFromProperties) {
            var hostFromProperties = Ti.App.Properties.getString("hostIP"), usernameFromProperties = Ti.App.Properties.getString("username");
            $.txtHostIP.value = hostFromProperties;
            $.txtUserName.value = usernameFromProperties;
            $.swcKeepMeSignedIn.value = true;
            $.txtPassword.value = null;
            $.txtPassword.focus();
        } else {
            Ti.App.Properties.setBool("remember", false);
            $.txtPassword.value = null;
            $.txtHostIP.focus();
        }
        LoginGlobal.login = function(hostIP, username, password) {
            Alloy.Globals.creds = "Basic " + Ti.Utils.base64encode(username + ":" + password);
            var url = "http://" + hostIP + ":6080/rest/v1/login";
            var xhr = Ti.Network.createHTTPClient({
                onload: function(e) {
                    Alloy.Globals.hostIP = hostIP;
                    Alloy.Globals.username = username;
                    Alloy.Globals.password = password;
                    console.info("Login: " + this);
                    var home = Alloy.createController("home", args).getView();
                    $.activityIndicator.hide();
                    home.open({
                        transition: Ti.UI.iOS.AnimationStyle.FLIP_FROM_LEFT,
                        duration: 500
                    });
                    return true;
                },
                onerror: function(e) {
                    Alloy.Globals.hostIP = null;
                    Alloy.Globals.username = null;
                    Alloy.Globals.password = null;
                    Alloy.Globals.sessionToken = null;
                    $.activityIndicator.hide();
                    alert("Login invalid");
                    alert(e.error);
                    return false;
                },
                timeout: 1e4
            });
            xhr.open("POST", url);
            xhr.setRequestHeader("Authorization", Alloy.Globals.creds);
            xhr.send();
        };
        LoginGlobal.logout = function() {
            var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/logout";
            var xhr = Ti.Network.createHTTPClient({
                onload: function(e) {
                    console.info("Logout success: " + this.responseText);
                    return true;
                },
                onerror: function(e) {
                    console.warn("Logout error: " + this.status);
                    return false;
                },
                timeout: 1e4
            });
            xhr.open("POST", url);
            xhr.send();
        };
        LoginGlobal.saveLoginInformationToProperties = function(username, hostIP) {
            Ti.App.Properties.setString("hostIP", hostIP);
            Ti.App.Properties.setString("username", username);
        };
    }();
    Ti.App.addEventListener("cleanUpAfterLogoutEvent", function() {
        LoginGlobal.logout();
        if (true == $.swcKeepMeSignedIn.value) {
            Alloy.Globals.password = null;
            $.txtPassword.value = null;
            $.txtPassword.focus();
        } else {
            Alloy.Globals.hostIP = null;
            Alloy.Globals.username = null;
            Alloy.Globals.password = null;
            $.txtUserName.value = null;
            $.txtPassword.value = null;
            $.txtHostIP.focus();
        }
    });
    __defers["$.__views.login!androidback!loginBackButtonPressed"] && $.addListener($.__views.login, "androidback", loginBackButtonPressed);
    __defers["$.__views.txtHostIP!return!nextField"] && $.addListener($.__views.txtHostIP, "return", nextField);
    __defers["$.__views.txtUserName!return!nextField"] && $.addListener($.__views.txtUserName, "return", nextField);
    __defers["$.__views.txtPassword!return!btnLoginClicked"] && $.addListener($.__views.txtPassword, "return", btnLoginClicked);
    __defers["$.__views.swcKeepMeSignedIn!change!swcKeepMeSignedInChecked"] && $.addListener($.__views.swcKeepMeSignedIn, "change", swcKeepMeSignedInChecked);
    __defers["$.__views.btnLogin!click!btnLoginClicked"] && $.addListener($.__views.btnLogin, "click", btnLoginClicked);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;