sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zkzilibraryproject.controller.Books", {
        onInit: function () {
        },

        onNavToDetail: function(oEvent){
            let oRouter = this.getOwnerComponent().getRouter();

            const path = oEvent.getSource().getBindingContext().getPath();

            oRouter.navTo("BookDetails", {
                path: encodeURIComponent(path)
            });
        },

        onCreatePressed: function () {
            let oRouter = this.getOwnerComponent().getRouter();


            oRouter.navTo("CreateBook");
        }
    });
});
