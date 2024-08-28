sap.ui.define([
    "./BaseController",
    "sap/ui/core/Fragment",
	"sap/m/MessageToast"
],
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("com.app.yard.controller.Home", {
            _iCarouselTimeout: 0, // a pointer to the current timeout
            _iCarouselLoopTime: 8000, // loop to next picture after 8 seconds
            onInit: function () {
                // var oImgModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/img.json"));
                // this.getView().setModel(oImgModel, "img");
                this.startAutoScroll();
            },

            startAutoScroll: function () {
                var oCarousel = this.byId("carousel");
                var iIntervalDuration = 1000; // Interval duration in milliseconds (e.g., 5 seconds)
                var that = this;
                
                // Function to move to the next page
                function moveToNextPage() {
                    var iCurrentPage = oCarousel.getActivePage();
                    var iTotalPages = oCarousel.getPages().length;

                    if (iCurrentPage < iTotalPages - 1) {
                        oCarousel.next();
                    } else {
                        oCarousel.setActivePage(0);
                    }
                }

                // Set up interval for automatic scrolling
                this.intervalId = setInterval(moveToNextPage.bind(that), iIntervalDuration);
            },

            stopAutoScroll: function () {
                // Stop the automatic scrolling interval
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            },

            onExit: function () {
                // Clean up when the controller is destroyed
                this.stopAutoScroll();
            },
            onloginBtnClick: async function () {
                if (!this.oLoginDialog) {
                    this.oLoginDialog = await this.loadFragment("LoginDialog");
                }

                this.oLoginDialog.open();
            },
            oncancelbtn: function () {
                if (this.oLoginDialog.isOpen()) {
                    this.oLoginDialog.close();
                }
            },

            onCloseDialog: function () {
                if (this.oLoginDialog && this.oLoginDialog.isOpen()) {
                    this.oLoginDialog.close();
                }
            },
            
            onBtnClick: function () {
                var oU = this.getView().byId("user").getValue();
                var oP = this.getView().byId("pwd").getValue();
                if (oU === "Security" && oP === "Security@123") {
                    this.getRouter().navTo("RouteMain", { id: oU })
                }
                else if(oU==="Supervisor" && oP==="Supervisor@123"){
                    this.getRouter().navTo("RouteMain", { id: oU })
                }
                else if(oU==="Vendor" && oP==="Vendor@123"){
                    this.getRouter().navTo("RouteMain", { id: oU })
                }
                else {
                    MessageToast.show("Provide Correct details")
                }

            }
        });

    });