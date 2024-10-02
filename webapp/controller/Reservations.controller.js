sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/library",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Button"
],
function (Controller, Dialog, mobileLibrary, List, StandardListItem, Button) {
    "use strict";

    // shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = mobileLibrary.DialogType;

    return Controller.extend("zkzilibraryproject.controller.Reservations", {
        onInit: function () {
        },

        onDetailsDialog: function(oEvent) {
            var oReservation = oEvent.getSource().getBindingContext().getObject();
            
            if (!this.oFixedSizeDialog) {
                this.oFixedSizeDialog = new Dialog({
                    title: this.getView().getModel("i18n").getResourceBundle().getText("ReservationDetails"),
                    contentWidth: "550px",
                    contentHeight: "300px",
                    content: new List({
                        items: {
                            path: "/ReservationDetails", 
                            template: new StandardListItem({
                                title: "{propertyName}",
                                description: "{propertyValue}"
                            })
                        }
                    }),
                    endButton: new Button({
                        type: ButtonType.Emphasized,
                        text: "Close",
                        press: function () {
                            this.oFixedSizeDialog.close();
                        }.bind(this)
                    })
                });
        
                this.getView().addDependent(this.oFixedSizeDialog);
            }

            const startDate = new Date(oReservation.StartDate);            
            const endDate = new Date(oReservation.EndDate);

            const options = { day: '2-digit', month: 'long', year: 'numeric' };

            const formattedStartDate = startDate.toLocaleDateString('pl-PL', options);
            const formattedEndDate = endDate.toLocaleDateString('pl-PL', options);
        
            var oDialogModel = new sap.ui.model.json.JSONModel({
                ReservationDetails: [
                    { propertyName: "Reservation ID", propertyValue: oReservation.Reservationid },
                    { propertyName: "Status", propertyValue: oReservation.Status },
                    { propertyName: "Books", propertyValue: oReservation.Books },
                    { propertyName: "Start Date", propertyValue: formattedStartDate },
                    { propertyName: "End Date", propertyValue: formattedEndDate }                    
                ]
            });
            this.oFixedSizeDialog.setModel(oDialogModel);
        
            this.oFixedSizeDialog.open();
        },
        
    });
});
