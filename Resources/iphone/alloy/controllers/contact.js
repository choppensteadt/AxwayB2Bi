function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function enterViewMode(contactId) {
        hideAllTextFields();
        showAllLabels();
        Alloy.Globals.mode = "view";
        $.btnCancel.title = L("contact_close_button");
        $.btnSave.hide();
        $.btnEdit.show();
        $.btnCancel.show();
        $.activityIndicator.show();
        var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/contacts/" + contactId;
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                try {
                    var response = JSON.parse(this.responseText);
                } catch (e) {
                    console.warn("Response parsing failed.", this.responseText, e);
                }
                var contactName = response.name;
                var contactTitle = response.title;
                var contactPhone = response.phone;
                var contactEmail = response.email;
                var contactNotes = response.notes;
                response.primary;
                $.lblContactName.text = contactName;
                $.lblContactTitle.text = contactTitle;
                $.lblContactEmail.text = contactEmail;
                $.lblContactPhone.text = contactPhone;
                $.lblContactNotes.text = contactNotes;
                $.swcPrimaryContactYN.value = response.primary;
                "" != $.lblContactEmail.text ? $.ivEmail.show() : $.ivEmail.hide();
                if (true == $.swcPrimaryContactYN.value) {
                    $.ivPrimaryContact.show();
                    Alloy.Globals.primaryContactYN = true;
                    $.btnDelete.hide();
                } else {
                    $.ivPrimaryContact.hide();
                    Alloy.Globals.primaryContactYN = false;
                    $.btnDelete.show();
                }
                $.activityIndicator.hide();
                return true;
            },
            onerror: function(e) {
                $.activityIndicator.hide();
                alert(e.error);
                return false;
            },
            timeout: 1e4
        });
        xhr.open("GET", url);
        xhr.send();
    }
    function enterNewMode() {
        hideAllLabels();
        showAllTextFields();
        Alloy.Globals.mode = "new";
        $.swcPrimaryContactYN.value = false;
        if (true == $.swcPrimaryContactYN.value) {
            $.ivPrimaryContact.show();
            Alloy.Globals.primaryContactYN = true;
            $.btnDelete.hide();
        } else {
            $.ivPrimaryContact.hide();
            Alloy.Globals.primaryContactYN = false;
        }
        $.btnCancel.title = L("contact_cancel_button");
        $.btnDelete.hide();
        $.btnSave.show();
        $.btnEdit.hide();
        $.btnCancel.show();
    }
    function enterEditMode() {
        hideAllLabels();
        showAllTextFields();
        Alloy.Globals.mode = "edit";
        $.btnDelete.hide();
        $.btnSave.show();
        $.btnEdit.hide();
        $.btnCancel.show();
        $.btnCancel.title = L("contact_cancel_button");
        $.tfContactName.value = $.lblContactName.text;
        $.tfContactTitle.value = $.lblContactTitle.text;
        $.tfContactEmail.value = $.lblContactEmail.text;
        $.tfContactPhone.value = $.lblContactPhone.text;
        $.taContactNotes.value = $.lblContactNotes.text;
        $.swcPrimaryContactYN.value = $.swcPrimaryContactYN.value;
    }
    function saveContact() {
        $.activityIndicator.show();
        if ("edit" == Alloy.Globals.mode) {
            var primary = $.swcPrimaryContactYN.value;
            var name = $.tfContactName.value;
            var email = $.tfContactEmail.value;
            var phone = $.tfContactPhone.value;
            var notes = $.taContactNotes.value;
            var title = $.tfContactTitle.value;
            var body = {
                primary: primary,
                name: name,
                email: email,
                phone: phone,
                notes: notes,
                title: title,
                "@id": Alloy.Globals.contactId
            };
            var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/contacts";
            var xhr = Ti.Network.createHTTPClient({
                onload: function(e) {
                    try {
                        JSON.parse(this.responseText);
                    } catch (e) {
                        console.warn("Response parsing failed.", this.responseText, e);
                    }
                    $.activityIndicator.hide();
                    return true;
                },
                onerror: function(e) {
                    $.activityIndicator.hide();
                    alert(e.error);
                    return false;
                },
                timeout: 1e4
            });
            xhr.open("PUT", url);
            xhr.send(body);
            $.contact.close();
        } else if ("new" == Alloy.Globals.mode) {
            var primary = $.swcPrimaryContactYN.value;
            var name = $.tfContactName.value;
            var email = $.tfContactEmail.value;
            var phone = $.tfContactPhone.value;
            var notes = $.taContactNotes.value;
            var title = $.tfContactTitle.value;
            var bodyString = '{"primary":true,"name":"Contact","email":"contact@axway.com","phone":"123456789","notes":"Notes","title":"Title"}';
            bodyString = bodyString.replace(/[\u0000-\u0019]+/g, "");
            var body = JSON.parse(bodyString);
            var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/" + communityId + "/contacts";
            var xhr = Ti.Network.createHTTPClient({
                onload: function(e) {
                    try {
                        JSON.parse(this.responseText);
                    } catch (e) {
                        console.warn("Response parsing failed.", this.responseText, e);
                    }
                    $.activityIndicator.hide();
                    return true;
                },
                onerror: function(e) {
                    $.activityIndicator.hide();
                    alert(e.error);
                    return false;
                },
                timeout: 1e4
            });
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.open("POST", url);
            xhr.send(body);
            contactModifiedRefreshCommunity();
        }
    }
    function updateContact() {
        enterEditMode();
    }
    function deleteContact() {
        var dialog = Ti.UI.createAlertDialog({
            title: L("delete_contact_dialog_title"),
            message: L("delete_contact_dialog_message"),
            buttonNames: [ L("delete_contact_dialog_yes"), L("delete_contact_dialog_cancel") ],
            send: 1,
            cancel: 2
        });
        dialog.addEventListener("click", function(e) {
            if (1 === e.index) ; else if (0 === e.index) {
                var url = "http://" + Alloy.Globals.hostIP + ":6080/rest/v1/communities/contacts/" + Alloy.Globals.contactId;
                var xhr = Ti.Network.createHTTPClient({
                    onload: function(e) {
                        try {
                            JSON.parse(this.responseText);
                        } catch (e) {
                            console.warn("Response parsing failed.", this.responseText, e);
                        }
                        $.activityIndicator.hide();
                        return true;
                    },
                    onerror: function(e) {
                        $.activityIndicator.hide();
                        alert(e.error);
                        return false;
                    },
                    timeout: 1e4
                });
                xhr.open("DELETE", url);
                xhr.send();
                contactModifiedRefreshCommunity();
            }
        });
        dialog.show();
    }
    function cancelContact() {
        "view" == Alloy.Globals.mode ? $.contact.close() : "new" == Alloy.Globals.mode ? $.contact.close() : "edit" == Alloy.Globals.mode && enterViewMode(Alloy.Globals.contactId);
    }
    function hideAllTextFields() {
        $.contactEditMode.hide();
    }
    function showAllTextFields() {
        $.contactEditMode.show();
    }
    function hideAllLabels() {
        $.contactTopSectionViewMode.hide();
        $.contactBottomSectionViewMode.hide();
    }
    function showAllLabels() {
        $.contactTopSectionViewMode.show();
        $.contactBottomSectionViewMode.show();
    }
    function contactModifiedRefreshCommunity() {
        var communityId = Alloy.Globals.communityId;
        var defaultRoutingIdId = Alloy.Globals.defaultRoutingIdId;
        var primaryContactId = Alloy.Globals.primaryContactId;
        var args = {
            communityId: communityId,
            defaultRoutingIdId: defaultRoutingIdId,
            primaryContactId: primaryContactId
        };
        var communityDetail = Alloy.createController("communityDetail", args).getView();
        $.contact.close();
        communityDetail.open();
    }
    function sendEmailToContact() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.toRecipients = [ $.lblContactEmail.text ];
        emailDialog.subject = L("notification_email_dialog_subject");
        emailDialog.messageBody = L("notification_email_dialog_body");
        emailDialog.open();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "contact";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.contact = Ti.UI.createWindow({
        id: "contact",
        backgroundColor: "white",
        title: "Axway B2Bi"
    });
    $.__views.contact && $.addTopLevelView($.__views.contact);
    $.__views.contactTopSectionViewMode = Ti.UI.createView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 0,
            height: 125,
            backgroundColor: "#F1F1D4"
        });
        Alloy.deepExtend(true, o, {
            id: "contactTopSectionViewMode"
        });
        return o;
    }());
    $.__views.contact.add($.__views.contactTopSectionViewMode);
    $.__views.ivPrimaryContact = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 40,
            left: 15,
            width: 50,
            height: 50
        });
        Alloy.deepExtend(true, o, {
            id: "ivPrimaryContact",
            image: "/images/default-icon.png"
        });
        return o;
    }());
    $.__views.contactTopSectionViewMode.add($.__views.ivPrimaryContact);
    $.__views.lblContactName = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 40,
            center: "50%",
            font: {
                fontWeight: "bold",
                fontSize: 28,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblContactName"
        });
        return o;
    }());
    $.__views.contactTopSectionViewMode.add($.__views.lblContactName);
    $.__views.lblContactTitle = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 75,
            center: "50%",
            font: {
                fontSize: 22,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblContactTitle"
        });
        return o;
    }());
    $.__views.contactTopSectionViewMode.add($.__views.lblContactTitle);
    $.__views.contactBottomSectionViewMode = Ti.UI.createView({
        id: "contactBottomSectionViewMode"
    });
    $.__views.contact.add($.__views.contactBottomSectionViewMode);
    $.__views.lblContactPhoneLabel = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 150,
            left: 20,
            color: "gray",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "phone",
            id: "lblContactPhoneLabel"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.lblContactPhoneLabel);
    $.__views.lblContactPhone = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 175,
            left: 60,
            color: "blue",
            font: {
                fontSize: 18,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblContactPhone"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.lblContactPhone);
    $.__views.lblContactEmailLabel = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 220,
            left: 20,
            color: "gray",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "email",
            id: "lblContactEmailLabel"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.lblContactEmailLabel);
    $.__views.lblContactEmail = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 245,
            left: 60,
            color: "blue",
            font: {
                fontSize: 18,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblContactEmail"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.lblContactEmail);
    $.__views.ivEmail = Ti.UI.createImageView(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 235,
            right: 10,
            width: 30,
            height: 30
        });
        Alloy.deepExtend(true, o, {
            id: "ivEmail",
            image: "/images/email.png"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.ivEmail);
    sendEmailToContact ? $.addListener($.__views.ivEmail, "click", sendEmailToContact) : __defers["$.__views.ivEmail!click!sendEmailToContact"] = true;
    $.__views.lblContactNotesLabel = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 290,
            left: 20,
            color: "gray",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "notes",
            id: "lblContactNotesLabel"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.lblContactNotesLabel);
    $.__views.lblContactNotes = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 315,
            left: 60,
            width: 300,
            height: 200,
            verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "lblContactNotes"
        });
        return o;
    }());
    $.__views.contactBottomSectionViewMode.add($.__views.lblContactNotes);
    $.__views.contactEditMode = Ti.UI.createView({
        id: "contactEditMode"
    });
    $.__views.contact.add($.__views.contactEditMode);
    $.__views.lblRequired = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 60,
            left: 30,
            color: "red",
            font: {
                fontWeight: "bold",
                fontSize: 22,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "*",
            id: "lblRequired"
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.lblRequired);
    $.__views.tfContactName = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 50,
            left: 60,
            width: 300,
            height: 50,
            hintTextColor: "gray",
            autocorrect: false,
            autocapitalization: true,
            borderRadius: "5",
            borderColor: "black",
            font: {
                fontWeight: "bold",
                fontSize: 16,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "tfContactName",
            hintText: L("contact_name_hint")
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.tfContactName);
    $.__views.tfContactTitle = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 115,
            left: 60,
            width: 300,
            height: 40,
            autocorrect: true,
            autocapitalization: true,
            hintTextColor: "gray",
            borderRadius: "5",
            borderColor: "black",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "tfContactTitle",
            hintText: L("contact_title_hint")
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.tfContactTitle);
    $.__views.tfContactPhone = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 180,
            left: 60,
            width: 300,
            height: 40,
            autocorrect: false,
            autocapitalization: false,
            hintTextColor: "gray",
            borderRadius: "5",
            borderColor: "black",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "tfContactPhone",
            hintText: L("contact_phone_hint")
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.tfContactPhone);
    $.__views.lblNecessary = Ti.UI.createLabel(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 255,
            left: 30,
            color: "orange",
            font: {
                fontWeight: "bold",
                fontSize: 22,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            text: "*",
            id: "lblNecessary"
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.lblNecessary);
    $.__views.tfContactEmail = Ti.UI.createTextField(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 245,
            left: 60,
            width: 300,
            height: 40,
            autocorrect: false,
            autocapitalization: false,
            hintTextColor: "gray",
            borderRadius: "5",
            borderColor: "black",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "tfContactEmail",
            hintText: L("contact_email_hint")
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.tfContactEmail);
    $.__views.taContactNotes = Ti.UI.createTextArea(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 310,
            left: 60,
            width: 300,
            height: 200,
            verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
            autocorrect: true,
            autocapitalization: true,
            hintTextColor: "gray",
            color: "black",
            borderRadius: "5",
            borderColor: "black",
            font: {
                fontSize: 14,
                fontFamily: "OpenSans-Regular"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "taContactNotes",
            hintText: L("contact_notes_hint")
        });
        return o;
    }());
    $.__views.contactEditMode.add($.__views.taContactNotes);
    $.__views.swcPrimaryContactYN = Ti.UI.createSwitch(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: 50,
            right: 100,
            color: "black",
            tintColor: "gray",
            font: {
                fontSize: "14"
            }
        });
        Alloy.deepExtend(true, o, {
            value: false,
            id: "swcPrimaryContactYN",
            visible: false
        });
        return o;
    }());
    $.__views.contact.add($.__views.swcPrimaryContactYN);
    $.__views.btnEdit = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "90%",
            right: "30%",
            width: 90,
            color: "white",
            backgroundColor: "#407CA0",
            borderRadius: "5",
            font: {
                fontSize: "16"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "btnEdit"
        });
        return o;
    }());
    $.__views.contact.add($.__views.btnEdit);
    updateContact ? $.addListener($.__views.btnEdit, "click", updateContact) : __defers["$.__views.btnEdit!click!updateContact"] = true;
    $.__views.btnSave = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "90%",
            right: "30%",
            width: 90,
            color: "white",
            backgroundColor: "#407CA0",
            borderRadius: "5",
            font: {
                fontSize: "16"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "btnSave"
        });
        return o;
    }());
    $.__views.contact.add($.__views.btnSave);
    saveContact ? $.addListener($.__views.btnSave, "click", saveContact) : __defers["$.__views.btnSave!click!saveContact"] = true;
    $.__views.btnDelete = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "90%",
            left: "5%",
            width: 90,
            color: "white",
            backgroundColor: "#407CA0",
            borderRadius: "5",
            font: {
                fontSize: "16"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "btnDelete"
        });
        return o;
    }());
    $.__views.contact.add($.__views.btnDelete);
    deleteContact ? $.addListener($.__views.btnDelete, "click", deleteContact) : __defers["$.__views.btnDelete!click!deleteContact"] = true;
    $.__views.btnCancel = Ti.UI.createButton(function() {
        var o = {};
        Alloy.isHandheld && Alloy.deepExtend(true, o, {
            top: "90%",
            right: "5%",
            width: 90,
            color: "white",
            backgroundColor: "#407CA0",
            borderRadius: "5",
            font: {
                fontSize: "16"
            }
        });
        Alloy.deepExtend(true, o, {
            id: "btnCancel"
        });
        return o;
    }());
    $.__views.contact.add($.__views.btnCancel);
    cancelContact ? $.addListener($.__views.btnCancel, "click", cancelContact) : __defers["$.__views.btnCancel!click!cancelContact"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: -50,
        width: "50",
        height: "50",
        indicatorColor: "black",
        id: "activityIndicator"
    });
    $.__views.contact.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var mode = args.mode;
    var contactId = args.contactId;
    var communityId = args.communityId;
    Alloy.Globals.mode = mode;
    Alloy.Globals.contactId = contactId;
    Alloy.Globals.communityId = communityId;
    $.ivEmail.hide();
    $.ivPrimaryContact.hide();
    $.swcPrimaryContactYN.title = L("contact_make_primary_contact");
    $.btnDelete.title = L("contact_delete_button");
    $.btnSave.title = L("contact_save_button");
    $.btnEdit.title = L("contact_edit_button");
    switch (mode) {
      case "new":
        enterNewMode();
        break;

      case "edit":
        enterEditMode();
        break;

      case "view":
        enterViewMode(contactId);
        break;

      default:
        enterViewMode();
    }
    __defers["$.__views.ivEmail!click!sendEmailToContact"] && $.addListener($.__views.ivEmail, "click", sendEmailToContact);
    __defers["$.__views.btnEdit!click!updateContact"] && $.addListener($.__views.btnEdit, "click", updateContact);
    __defers["$.__views.btnSave!click!saveContact"] && $.addListener($.__views.btnSave, "click", saveContact);
    __defers["$.__views.btnDelete!click!deleteContact"] && $.addListener($.__views.btnDelete, "click", deleteContact);
    __defers["$.__views.btnCancel!click!cancelContact"] && $.addListener($.__views.btnCancel, "click", cancelContact);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;