
sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageView",
    "sap/m/MessageItem",
    'sap/m/Popover',
    "sap/m/MessageBox",
    "sap/ndc/BarcodeScanner"
 
], function (Controller, JSONModel, Device, MessageToast, Filter, FilterOperator, Fragment, DateFormat, MessageView, MessageItem, Popover, MessageBox,BarcodeScanner) {
    "use strict";

    return Controller.extend("com.app.yard.controller.Main", {

        onInit: function () {
            // var oM = new JSONModel({
            //  messages: []  // Array to hold chat messages
            //   });
            //   this.getView().byId("page9").setModel(oM);
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);

            const oLocalModel = new JSONModel({

                vehicalDetails: {
                    Vehicalno: "",
                    Drivername: "",
                    Phone: 0,
                    Vehicletype: "",
                    Processtype: "",
                    Assigneddate: "",
                    Unassigneddate: "",
                    PLOT_NO: ""
                },
                plotNo: {
                    Reserved: false,
                    Available: false
                },

            });
            var oModel = new JSONModel(sap.ui.require.toUrl("com/app/yard/model/data.json"));
            this.getView().setModel(oModel);
            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("pageContainer").setModel(oModelV2);
            this.getView().byId("idToolHeader").setModel(oModelV2);
            this.getView().byId("page2").setModel(oLocalModel, "localModel");


            var today = new Date();

            // Calculate tomorrow based on today
            var tomorrow = new Date(today);
            tomorrow.setDate(today.getDate());

            // Set the minimum date for the date picker
            var oDateTimePicker = this.getView().byId("idEstimatedTime");
            oDateTimePicker.setMinDate(tomorrow);
            // Set display format to show only date
            oDateTimePicker.setDisplayFormat("yyyy-MM-dd");

            var oDateTimePicker1 = this.getView().byId("idEstimatedTimeVe");
            oDateTimePicker1.setMinDate(tomorrow);
            
            // Set display format to show only date
            oDateTimePicker1.setDisplayFormat("yyyy-MM-dd");
            this.loadDataFromModel(oModelV2);
            // Device.media.attachHandler(this._handleMediaChange, this);
            // this._handleMediaChange();
            // if (!oModelV2) {
            //  // ModelV2 is not loaded yet, set up event listener for model events
            //  oView.attachEventOnce("modelContextChange", function () {
            //      oModelV2 = oView.getModel("ModelV2");
            //      if (oModelV2) {
            //          this.loadDataFromModel(oModelV2);
            //      } else {
            //          console.error("ModelV2 not found after modelContextChange event.");
            //          // Handle error scenario
            //      }
            //  }, this);
            // } else {
            //  // ModelV2 is already Available
            //  this.loadDataFromModel(oModelV2);
            // }

        },
        onUserDetailsLoad: function (oEvent) {
            var oView = this.getView()
            const { id } = oEvent.getParameter("arguments");
            this.ID = id;
            //var oModel = this.getView().getModel("ModelV2");
            // Accessing navigation array from oModel
            var navigationArray = this.getView().getModel().getProperty("/navigation");
            // Log the navigation array to console for verification
            console.log("Navigation Array:", navigationArray);
            this.getView().byId("idHeading").setText(`Welcome ${this.ID}`);
            var isSecurity = false;
            if (this.ID === "Security") {
                isSecurity = true;
                this.getView().byId("flexBoxPage8").setVisible(!isSecurity);
                this.getView().byId("idPage8").setVisible(isSecurity);
                //this.getView().byId("idSecurityNotify").setVisible(isSecurity)
                this.getView().byId("flexBoxPageVendor").setVisible(!isSecurity)
                oView.byId("vendor1").setVisible(false)
                oView.byId("vendor2").setVisible(false)
                oView.byId("vendor3").setVisible(false)
                oView.byId("vendor4").setVisible(false)
                oView.byId("vendor5").setVisible(false)
                oView.byId("vendor6").setVisible(false)
                oView.byId("vendor7").setVisible(false)

            }
            else if (this.ID === "Vendor") {
                oView.byId("flexBoxPage8").setVisible(false)
                oView.byId("idPage8").setVisible(false)
                oView.byId("flexBoxPageVendor").setVisible(true)
                oView.byId("idpage1").setVisible(false)
                oView.byId("idpage2").setVisible(false)
                oView.byId("idAllSlots").setVisible(false)
                oView.byId("AllocatedSlotsTable").setVisible(false)
                oView.byId("idAllSlots1").setVisible(false)
                oView.byId("reservedSlotsTable").setVisible(false)
                oView.byId("HistoryTable").setVisible(false)
                oView.byId("idpage9").setVisible(false)
                // oView.byId("flexBoxPage8").setVisible(false)
                oView.byId("btnallslots").setVisible(false)
                oView.byId("btnemptyslots").setVisible(false)
                oView.byId("btnreservedslots").setVisible(false)
                oView.byId("btnallocatedslots").setVisible(false)
            }

            else {
                this.getView().byId("flexBoxPage8").setVisible(!isSecurity);
                this.getView().byId("idPage8").setVisible(isSecurity);
                //this.getView().byId("idNotification").setVisible(isSecurity)
                this.getView().byId("flexBoxPageVendor").setVisible(isSecurity)
                oView.byId("vendor1").setVisible(false)
                oView.byId("vendor2").setVisible(false)
                oView.byId("vendor3").setVisible(false)
                oView.byId("vendor4").setVisible(false)
                oView.byId("vendor5").setVisible(false)
                oView.byId("vendor6").setVisible(false)
                oView.byId("vendor7").setVisible(false)
            }
            // oObjectPage.bindElement(`${id}`);
        },
        // onVehicleNumberSubmit: function (oEvent) {
        //  var sVehicleNo = oEvent.getParameter("value");

        //  // Access your model to check if the vehicle number exists in VehicalDeatils
        //  var oModel = this.getView().byId("pageContainer").getModel("ModelV2");
        //  var oLocalModel = this.getView().byId("page2").getModel("localModel");

        //  // Retrieve all vehicle details from ModelV2 (assuming VehicalDeatils is a collection)
        //  oModel.read("/VehicalDeatils", {
        //      filters: [
        //          new Filter("vehicalNo", FilterOperator.EQ, sVehicleNo)
        //      ],
        //      success: function (oData) {
        //          var aVehicles = oData.results;
        //          if (aVehicles.length > 0) {
        //              // Assuming there's only one record with unique vehicalNo
        //              var oVehicle = aVehicles[0];
        //              // Set other fields based on the found vehicle
        //              oLocalModel.setProperty("/vehicalDetails/vehicalNo", oVehicle.vehicalNo);
        //              oLocalModel.setProperty("/vehicalDetails/driverName", oVehicle.driverName);
        //              oLocalModel.setProperty("/vehicalDetails/phone", oVehicle.phone);
        //              oLocalModel.setProperty("/vehicalDetails/vehicalType", oVehicle.vehicalType);
        //              oLocalModel.setProperty("/vehicalDetails/assignedDate", oVehicle.assignedDate);
        //              this.getView().byId("productInput").setValue(oVehicle.plotNo_plot_NO)
        //              // Set other fields as needed
        //          } else {
        //              // Handle case where vehicle number was not found
        //              sap.m.MessageToast.show("Vehicle number not found.");
        //              // Optionally clear other fields
        //              oLocalModel.setProperty("/vehicalDetails/vehicalNo", "");
        //              oLocalModel.setProperty("/vehicalDetails/driverName", "");
        //              oLocalModel.setProperty("/vehicalDetails/phone", "");
        //              oLocalModel.setProperty("/vehicalDetails/vehicalType", "");
        //              oLocalModel.setProperty("/vehicalDetails/assignedDate", "");
        //              // Clear other fields as needed
        //          }
        //      }.bind(this),
        //      error: function (oError) {
        //          sap.m.MessageToast.show("Error fetching vehicle details: " + oError.message);
        //      }
        //  });
        // },
        onVehicleNumberSubmit:async function (oEvent) {
            var that = this
            const oView = this.getView()
            var oLocalModel = this.getView().byId("page2").getModel("localModel");
            var sVehicleNo = this.getView().byId("idVehicalNo").getValue();
            var oModel = this.getView().byId("pageContainer").getModel();
            //  var oLocalModel = this.getView().byId("page2").getModel("localModel");
            // Check if vehicle number exists in Reservation
            // oModel.read("/Reservation('" + sVehicleNo + "')", {
            //     success: function (oData) {
            //         this.updateFormFields(oData); // Function to update form fields
            //     }.bind(this),
            //     error: function () {
            //         // If vehicle number not found in Reservation, fetch from VehicalDeatils

            //         // oModel.read("/VehicalDeatils('" + sVehicleNo + "')", {
            //         //  success: function(oData) {
            //         //      this.updateFormFields(oData); // Function to update form fields
            //         //  }.bind(this),
            //         //  error: function() {
            //         //      sap.m.MessageToast.show("Vehicle number not found."); // Handle vehicle not found
            //         //  }
            //         // });
           await oModel.read("/ZEWM_VEHICLE_NSet", {
                filters: [
                    new Filter("Vehicalno", FilterOperator.EQ, sVehicleNo)
                ],
                success: function (oData) {
                    var aVehicles = oData.results;

                    function checkVehicle(v) {
                        return v.Vehicalno === sVehicleNo;
                    }

                    var oVehicle1 = aVehicles.filter(checkVehicle);

                    if (oVehicle1.length > 0) {
                        var oVehicle = oVehicle1[0];
                        // Set fields based on the found vehicle
                        oLocalModel.setProperty("/vehicalDetails/Vehicalno", oVehicle.Vehicalno);
                        oLocalModel.setProperty("/vehicalDetails/Drivername", oVehicle.Drivername);
                        oLocalModel.setProperty("/vehicalDetails/Phone", oVehicle.Phone);
                        oLocalModel.setProperty("/vehicalDetails/Vehicletype", oVehicle.Vehicletype);
                        oLocalModel.setProperty("/vehicalDetails/Assigneddate", oVehicle.Assigneddate);
                        oView.byId("idAlotVehicle").setVisible(true);
                        oView.byId("idAlotProcess").setVisible(true);
                        oView.byId("idVehicleType").setVisible(false);
                        oView.byId("idProcessType").setVisible(false);
                        oView.byId("idAlotVehicle").setText(oVehicle.Vehicletype);
                        oView.byId("idAlotProcess").setText(oVehicle.Processtype);
                        oView.byId("parkingLotSelect").setVisible(false);
                        oView.byId("parkingLotSelectText").setVisible(true);
                        oView.byId("parkingLotSelectText").setText(oVehicle.PLOT_NO);
                    } else {
                        // If no vehicle found, try to fetch from the reservation service
                        oModel.read("/ZEWM_RESERVATION_NSet", {
                            success: function (oData) {
                                var aReservations = oData.results;

                                // Use the same checkVehicle function to filter reservations
                                var oVehicle1 = aReservations.filter(checkVehicle);

                                if (oVehicle1.length > 0) {
                                    var oVehicle = oVehicle1[0];
                                    // Set fields based on the found vehicle
                                    oLocalModel.setProperty("/vehicalDetails/Vehicalno", oVehicle.Vehicalno);
                                    oLocalModel.setProperty("/vehicalDetails/Drivername", oVehicle.Drivername);
                                    oLocalModel.setProperty("/vehicalDetails/Phone", oVehicle.Phone);
                                    oLocalModel.setProperty("/vehicalDetails/Vehicletype", oVehicle.Vehicletype);
                                    oLocalModel.setProperty("/vehicalDetails/Assigneddate", oVehicle.Assigneddate);
                                    oView.byId("idAlotVehicle").setVisible(true);
                                    oView.byId("idAlotProcess").setVisible(true);
                                    oView.byId("idVehicleType").setVisible(false);
                                    oView.byId("idProcessType").setVisible(false);
                                    oView.byId("idAlotVehicle").setText(oVehicle.Vehicletype);
                                    oView.byId("idAlotProcess").setText(oVehicle.Processtype);
                                    oView.byId("parkingLotSelect").setVisible(false);
                                    oView.byId("parkingLotSelectText").setVisible(true);
                                    oView.byId("parkingLotSelectText").setText(oVehicle.PlotNo);
                                } else {
                                    // Vehicle number not found in both sources
                                    sap.m.MessageToast.show("Vehicle number not found.");
                                    // Optionally clear other fields
                                    oLocalModel.setProperty("/vehicalDetails/Vehicalno", "");
                                    oLocalModel.setProperty("/vehicalDetails/Drivername", "");
                                    oLocalModel.setProperty("/vehicalDetails/Phone", "");
                                    oLocalModel.setProperty("/vehicalDetails/Vehicletype", "");
                                    oLocalModel.setProperty("/vehicalDetails/Assigneddate", "");
                                    oView.byId("idAlotVehicle").setVisible(false);
                                    oView.byId("idAlotProcess").setVisible(false);
                                    oView.byId("parkingLotSelect").setVisible(true);
                                    oView.byId("parkingLotSelectText").setVisible(false);
                                }
                            }.bind(this),
                            error: function (oError) {
                                sap.m.MessageToast.show("Error fetching reservation details: " + oError.message);
                            }
                        });
                    }
                }.bind(this),
                error: function (oError) {
                    sap.m.MessageToast.show("Error fetching vehicle details: " + oError.message);
                }
            });

        },


        updateFormFields: function (oData) {
            var oLocalModel = this.getView().byId("page2").getModel("localModel");
            // Assuming local model for form binding

            // Update form fields based on retrieved data
            if (oData.vehicalNo) {
                oLocalModel.setProperty("/vehicalDetails/vehicalNo", oData.vehicalNo);
                oLocalModel.setProperty("/vehicalDetails/driverName", oData.driverName);
                oLocalModel.setProperty("/vehicalDetails/phone", oData.phone);
                //oLocalModel.setProperty("/vehicalDetails/vehicalType", oData.vehicalType);
                oLocalModel.setProperty("/vehicalDetails/assignedDate", oData.assignedDate);
                this.getView().byId("idAlotVehicle").setVisible(true);
                this.getView().byId("idAlotProcess").setVisible(true);
                this.getView().byId("idVehicleType").setVisible(false);
                this.getView().byId("idProcessType").setVisible(false);
                this.getView().byId("idAlotVehicle").setText(oData.vehicleType);
                this.getView().byId("idAlotProcess").setText(oData.processType);
                // Set plot number in productInput field if it exists in the data
                if (oData.plotNo_plot_NO) {
                    this.getView().byId("productInput").setValue(oData.plotNo_plot_NO);
                }
            } else {
                sap.m.MessageToast.show("Vehicle details not found."); // Handle case where data is not found
                // Optionally clear other fields
                oLocalModel.setProperty("/vehicalDetails/vehicalNo", "");
                oLocalModel.setProperty("/vehicalDetails/driverName", "");
                oLocalModel.setProperty("/vehicalDetails/phone", "");
                oLocalModel.setProperty("/vehicalDetails/vehicalType", "");
                oLocalModel.setProperty("/vehicalDetails/assignedDate", "");
                this.getView().byId("productInput").setValue(""); // Clear product input field if needed
            }
        },

        onAssignPress: async function () {
            var oView = this.getView();
            if (oView.byId("idProcessType").getVisible() === true) {
                var oSelect = oView.byId("idProcessType");
                // Get the selected key
                // var sSelectedKey = oSelect.getSelectedKey();
                // console.log("Selected Key: " + sSelectedKey);
                // Alternatively, get the selected item and its text
                var oSelectedItem = oSelect.getSelectedItem();
                var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                console.log("Selected Text: " + sSelectedText);
                var oSelectVehicalType = oView.byId("idVehicleType")
                var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
                var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
            }
            else {
                var sSelectedTextVT = oView.byId("idAlotVehicle").getText();
                var sSelectedText = oView.byId("idAlotProcess").getText();
            }
            // Get the Select control

            console.log("Selected Text: " + sSelectedTextVT);
            var oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd HH:mm:ss" // Define your desired pattern here
            });

            var currentDate = new Date(); // Current system date and time
            var formattedDateTime = oDateFormat.format(currentDate);

            const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/");
            oPayload.plotNo.Available = false;
            oPayload.vehicalDetails.Vehicletype = sSelectedTextVT;
            oPayload.vehicalDetails.Processtype = sSelectedText;
            const { Drivername, Phone, Vehicalno, Vehicletype, Processtype } = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
            const oModel = this.getView().byId("pageContainer").getModel(); // Assuming "ModelV2" is your ODataModel
            //const plotNo = this.byId("parkingLotSelect").getSelectedKey();;
            if (this.byId("parkingLotSelect").getVisible() === true) {
                var plotNo = this.getView().byId("parkingLotSelect").getSelectedKey();
            }
            else {
                var plotNo = this.getView().byId("parkingLotSelectText").getText();
            }
            oPayload.vehicalDetails.PLOT_NO = plotNo
            oPayload.vehicalDetails.Assigneddate = formattedDateTime;
            // var vehicalNoRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;
            // if (!(vehicalNoRegex.test(vehicalNo))) {
            //     MessageToast.show("Enter correct vehicle Number")
            //     this.getView().byId("idMessageStrip1").setType("Error")
            //     this.getView().byId("idMessageStrip1").setText("Enter correct vehicle Number")
            //     this.getView().byId("idMessageStrip1").setVisible(true)
            //     return
            // }
            if (!(Drivername && Phone && Vehicalno && plotNo)) {
                MessageToast.show("Enter all details")
                return
            }

            var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
            if (!(phoneRegex.test(Phone))) {
                MessageToast.show("Enter correct Number")
                this.getView().byId("idMessageStrip1").setType("Error")
                this.getView().byId("idMessageStrip1").setText("Enter correct  Number")
                this.getView().byId("idMessageStrip1").setVisible(true)
                return
            }

            var oVehicleExist = await this.checkVehicleNo(oModel, oPayload.vehicalDetails.Vehicalno, oPayload.vehicalDetails.Reserved)

            if (oVehicleExist) {
                this.getView().byId("idMessageStrip1").setType("Warning")
                this.getView().byId("idMessageStrip1").setText("Vehicle already exsist")
                this.getView().byId("idMessageStrip1").setVisible(true)
                MessageToast.show("Vehicle already exsist")
                this.onClearPress();
                return
            };
            // var oPlotExist = await this.checkVehicleNo(oModel, plotNo)
            // if (oPlotExist) {
            //     this.getView().byId("idMessageStrip1").setType("Warning")
            //     this.getView().byId("idMessageStrip1").setText("Plot already Assigned")
            //     this.getView().byId("idMessageStrip1").setVisible(true)
            //     MessageToast.show("Plot already Assigned")
            //     return
            // };
            // const plotAvailability = await this.checkPlotAvailability(oModel, plotNo);
            // if (!plotAvailability) {
            //     sap.m.MessageToast.show("Plot not Available for assignment.");
            //     return;
            // }
            try {
                // Assuming createData method sends a POST request
                var oVehicleExist1 = await this.checkVehicleNo1(oModel, oPayload.vehicalDetails.Vehicalno, oPayload.vehicalDetails.Reserved)
                if (oVehicleExist1) {
                    await this.deleteData(oModel, "/ZEWM_RESERVATION_NSet", Vehicalno);

                };

                await this.createData(oModel, oPayload.vehicalDetails, "/ZEWM_VEHICLE_NSet");


                //await this.createData(oModel, oPayload.vehicalDetails, "/History");
                MessageToast.show(`${Vehicalno} allocated to ${plotNo}`)
                this.getView().byId("idMessageStrip1").setType("Success")
                this.getView().byId("idMessageStrip1").setText(`${Vehicalno} allocated to ${plotNo}`)
                this.getView().byId("idMessageStrip1").setVisible(true)

                // setTimeout( [this.getView().byId("idMessageStrip1").setVisible(true)], 3000);
                // // setTimeout(function(){
                // //   [this.getView().byId("idMessageStrip1").setText(`${vehicalNo} allocated to ${plotNo}`),this.getView().byId("idMessageStrip1").setVisible(true)]
                // //   },3000);

                const updateparkinglot = {
                    PlotNo: plotNo,
                    Reserved: false,
                    Vehicletype: Vehicletype,
                    Processtype: Processtype,
                    Available: false
                }
                //await this.updateData(oModel, "/ZEWM_PR_PARKINGLOT_NSet", plotNo, updateparkinglot);
                 oModel.update("/ZEWM_PR_PARKINGLOT_NSet('"+plotNo+"')", updateparkinglot, {
                    success: function () {

                    }.bind(this),
                    error: function (oError) {
                        sap.m.MessageBox.error("Failed " + oError.message);
                    }.bind(this)
                });
               
                var text = Vehicalno + " allocated to" + plotNo;
                var utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);
            } catch (error) {
                console.error("Error:", error);
            }
            this.onPrintPress();
            this.onClearPress();
            // var sMessage = `Hello, ${driverName} your vehicle with vehicle number:${vehicalNo}  is allocated to slot number:${plotNo}`
            // this.onSms(phone, sMessage);
            oView.byId("idAlotVehicle").setVisible(false);
            oView.byId("idAlotProcess").setVisible(false);
            oView.byId("idVehicleType").setVisible(true);
            oView.byId("idProcessType").setVisible(true);
            oView.byId("parkingLotSelect").setVisible(true);
            oView.byId("parkingLotSelectText").setVisible(false);
            oModel.refresh()

        },
        checkVehicleNo: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/ZEWM_VEHICLE_NSet", {
                    filters: [
                        new Filter("Vehicalno", FilterOperator.EQ, sVehicalNo),


                    ],
                    success: function (oData) {
                        console.log(oData.results)
                        var oVehicle1 = oData.results.filter(checkVehicle)
                        function checkVehicle(v) {
                            console.log(v)
                            return v.Vehicalno === sVehicalNo;
                        }
                        console.log(oVehicle1)
                        resolve(oVehicle1.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkVehicleNo1: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/ZEWM_RESERVATION_NSet", {
                    filters: [
                        new Filter("Vehicalno", FilterOperator.EQ, sVehicalNo),
                        new Filter("Status", FilterOperator.EQ, true)


                    ],
                    success: function (oData) {
                        console.log(oData.results)
                        var oVehicle1 = oData.results.filter(checkVehicle)
                        function checkVehicle(v) {
                            console.log(v)
                            return v.Vehicalno === sVehicalNo;
                        }
                        console.log(oVehicle1)
                        resolve(oVehicle1.length > 0);

                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkVehicleNo2: async function (oModel, sVehicalNo, oPayload, oPlot) {
            return new Promise((resolve, reject) => {
                // oModel.read("/ZEWM_RESERVATION_NSet", {
                //     filters: [
                //         new Filter("vehicalNo", FilterOperator.EQ, sVehicalNo),
                //         new Filter("status", FilterOperator.EQ, false)


                //     ],
                //     success: function (oData) {

                oModel.update("/ZEWM_RESERVATION_NSet('" + sVehicalNo + "')", oPayload.reserve, {
                    success: function () {

                    }.bind(this),
                    error: function (oError) {
                        sap.m.MessageBox.error("Failed to update book: " + oError.message);
                    }.bind(this)
                });
                // oModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + oPlot + "')", oPayload.plotNo, {
                //     success: function () {

                //     }.bind(this),
                //     error: function (oError) {
                //         sap.m.MessageBox.error("Failed to update book: " + oError.message);
                //     }.bind(this)
                // });
                //resolve(oData.results.length > 0);
                //     },
                //     error: function () {
                //         reject(
                //             "An error occurred while checking username existence."
                //         );
                //     }
                // })
            })
        },
        checkStatus: async function (oModel, sVehicalNo, oPayload, oPlot) {

            return new Promise((resolve, reject) => {
                oModel.read("/ZEWM_RESERVATION_NSet", {
                    filters: [
                        new Filter("Vehicalno", FilterOperator.EQ, sVehicalNo),
                        new Filter("Status", FilterOperator.EQ, false),
                    ],
                    success: function (oData) {
                        console.log(oData.results)
                        var oVehicle1 = oData.results.filter(checkVehicle)
                        function checkVehicle(v) {
                            console.log(v)
                            return v.Vehicalno === sVehicalNo && v.Status === false;
                        }
                        console.log(oVehicle1)
                        resolve(oVehicle1.length > 0);

                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkPlot: async function (oModel, plotNo) {
            return new Promise((resolve, reject) => {
                oModel.read("/VehicalDeatils", {
                    filters: [
                        new Filter("plotNo_plot_NO", FilterOperator.EQ, plotNo),
                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkPlotAvailability: async function (oModel, plotNo) {
            return new Promise((resolve, reject) => {
                oModel.read("/PlotNOs('" + plotNo + "')", {
                    success: function (oData) {
                        resolve(oData.Available);
                    },
                    error: function (oError) {
                        reject("Error checking plot availability: " + oError.message);
                    }
                });
            });
        },
        checkPlotEmpty: async function (oModel, sVehicalNo) {
            return new Promise((resolve, reject) => {
                oModel.read("/VehicalDeatils", {
                    filters: [
                        new Filter("Vehicalno", FilterOperator.EQ, sVehicalNo),

                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },

        onValueHelpRequest: function (oEvent) {
            var oView = this.getView();

            // Get the Select control
            var oSelect = oView.byId("idProcessType");

            // Get the selected key
            // var sSelectedKey = oSelect.getSelectedKey();
            // console.log("Selected Key: " + sSelectedKey);

            // Alternatively, get the selected item and its text
            var oSelectedItem = oSelect.getSelectedItem();
            var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
            console.log("Selected Text: " + sSelectedText);
            var oSelectVehicalType = oView.byId("idVehicleType")
            var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
            var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
            console.log("Selected Text: " + sSelectedTextVT);
            // var processType=this.getView().byId("inwardOutward").getValue()
            // console.log(processType);
            var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();

            console.log(sInputValue)

            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.app.yard.fragments.ValueHelpDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pValueHelpDialog.then(function (oDialog) {
                // Access the binding context of the fragment and set the model
                oDialog.setModel(this.getView().getModel());
                // Create a filter for the binding

                oDialog.getBinding("items").filter([new Filter("Vehicletype", FilterOperator.EQ, sSelectedTextVT), new Filter("Processtype", FilterOperator.EQ, sSelectedText)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open(sInputValue);
            }.bind(this));
        },
        onValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("PlotNo", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpClose: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectedItem) {
                return;
            }

            this.byId("productInput").setValue(oSelectedItem.getTitle());
        },
        // onUnAssignPress:async function(){
        //  var oDateFormat = DateFormat.getDateTimeInstance({
        //      pattern: "yyyy-MM-dd HH:mm:ss" // Define your desired pattern here
        //  });

        //  var currentDate = new Date(); // Current system date and time
        //  var formattedDateTime = oDateFormat.format(currentDate);
        //  console.log(typeof(formattedDateTime));
        //  const oVehicalNo = this.getView().byId("idVehicalNo").getValue();
        //  const oPayload = new JSONModel( {
        //      unassignedDate: formattedDateTime
        //  });
        //  const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
        //  try {await this.updateData(oModel, oVehicalNo, oPayload, "/History");
        //      await this.deleteData(oModel, "/VehicalDeatils",oVehicalNo );

        //  } catch (error) {
        //      console.error("Error:", error);
        //  }
        // },
        onUnAssignPress: async function () {
            var oView = this.getView();
            const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/");
            const { Drivername, Phone, Vehicalno, Vehicletype, Processtype, Assigneddate } = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
            oPayload.plotNo.Available = true
            oPayload.vehicalDetails.Vehicletype = oView.byId("idAlotVehicle").getText();
            oPayload.vehicalDetails.Processtype = oView.byId("idAlotProcess").getText();

            const plotNo = this.byId("parkingLotSelectText").getText();
            oPayload.vehicalDetails.PLOT_NO = plotNo
            if (!(Drivername && Phone && Vehicalno && plotNo)) {
                MessageToast.show("Enter all details")
                return
            }

            const oDateFormat = DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd HH:mm:ss"
            });
            const currentDate = new Date();
            const formattedDateTime = oDateFormat.format(currentDate);
            oPayload.vehicalDetails.Unassigneddate = formattedDateTime

            const oVehicalNo = this.getView().byId("idVehicalNo").getValue();
            const oModel = this.getView().byId("pageContainer").getModel();
            //var oVehicleExist = await this.checkVehicleNo(oModel, oPayload.vehicalDetails.vehicalNo, oPayload.vehicalDetails.reserved)

            // if (!oVehicleExist) {
            //     MessageToast.show("Vehicle was not yet Allocated")
            //     return
            // };
            var oFilter = new Filter("Vehicalno", FilterOperator.EQ, oVehicalNo);
            var oHistoryId = await this.generateUUID()

            try {
                const oHistory = {
                    HistoryId: oHistoryId,
                    Vehicalno: Vehicalno,
                    Drivername: Drivername,
                    Phone: Phone,
                    Vehicletype: Vehicletype,
                    Assigneddate: Assigneddate,
                    Unassigneddate: oPayload.vehicalDetails.Unassigneddate,
                    Processtype: Processtype,
                    PlotNo: plotNo
                }
                await this.createData(oModel, oHistory, "/ZEWM_HISTORY_NSet");
                // oModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + plotNo + "')", oPayload.plotNo, {
                //     success: function () {
                //     }.bind(this),
                //     error: function (oError) {

                //         sap.m.MessageBox.error(`${vehicalNo} is not yet assigned.`);
                //     }.bind(this)
                // });
                await this.deleteData(oModel, "/ZEWM_VEHICLE_NSet", oVehicalNo);
                MessageToast.show(`${Vehicalno} is leaving from plot  ${plotNo}`);
                this.getView().byId("idMessageStrip1").setType("Success")
                this.getView().byId("idMessageStrip1").setText(`${Vehicalno} is leaving from plot  ${plotNo}`)
                this.getView().byId("idMessageStrip1").setVisible(true)
                // Find the corresponding history record to update
                // const aHistoryRecords = await oModel.read("/History", {
                //  filters: [
                //      new Filter("vehicalNo", FilterOperator.EQ, oVehicalNo)
                //  ]
                // });
                // if (aHistoryRecords.length > 0) {
                //  const oHistoryRecord = aHistoryRecords[0];
                //  oHistoryRecord.unassignedDate = formattedDateTime;

                //  // Update the record in the backend
                //  await oModel.update(`/History('${oHistoryRecord.ID}')`, oHistoryRecord);
                //  await this.deleteData(oModel, "/VehicalDeatils",oVehicalNo );
                //  MessageToast.show("Unassign operation successful");
                // } else {
                //  MessageToast.show("No history record found for the vehicle");
                // }
                var text = oVehicalNo + " is leaving from plot No" + plotNo;
                var utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);
            } catch (error) {
                console.error("Error updating history record:", error);
                MessageToast.show("Not in Allocated Slots");
            }

            // var sMessage = `Hello, ${driverName} your vehicle with vehicle number:${vehicalNo}  is un assigned for slot number:${plotNo}`
            //this.onSms(phone, sMessage);
            oView.byId("idAlotVehicle").setVisible(false);
            oView.byId("idAlotProcess").setVisible(false);
            oView.byId("idVehicleType").setVisible(true);
            oView.byId("idProcessType").setVisible(true);
            oView.byId("parkingLotSelectText").setVisible(false);
            oView.byId("parkingLotSelect").setVisible(true);
            this.onClearPress();
            oModel.refresh()
        },
        generateUUID: function () {
            debugger
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        registerBtn: async function () {
            const oModel = this.getView().byId("pageContainer").getModel()
            if (this.ID === "Supervisor") {
                var oView = this.getView();
                console.log(this.getView().byId("idProcessTypeRes").getVisible())
                if (oView.byId("idProcessTypeRes").getVisible()) {
                    // Get the Select control
                    var oSelect = oView.byId("idProcessTypeRes");

                    // Get the selected key
                    // var sSelectedKey = oSelect.getSelectedKey();
                    // console.log("Selected Key: " + sSelectedKey);

                    // Alternatively, get the selected item and its text
                    var oSelectedItem = oSelect.getSelectedItem();
                    var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                    console.log("Selected Text: " + sSelectedText);
                    var oSelectVehicalType = oView.byId("idVehicleTypeRes")
                    var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
                    var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
                }
                else {
                    var sSelectedText = oView.byId("idProcessTypeResInput").getText()
                    var sSelectedTextVT = oView.byId("idVehicleTypeResInput").getText()
                }



                //const oModel = this.getView().byId("pageContainer").getModel();
                var oView = this.getView();
                var oVehicalNo = oView.byId("idVehicalNo1").getValue();
                var oDriverName = oView.byId("idDriverName").getValue();
                var oPhone = oView.byId("idPhone").getValue();
                //var oVehicaltype=oView.byId("").getValue();
                var oPlot = this.byId("idslot1").getSelectedKey();
                //var oPlot=oView.byId("idSlot").getText();
                var oestimatedTime = oView.byId("idEstimatedTime").getValue();
                if (!(oVehicalNo && oDriverName && oPhone && oPlot && oestimatedTime)) {
                    MessageToast.show("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setType("Warning")
                    this.getView().byId("idMessageStrip8").setText("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }

                var vehicalNoRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;
                if (!(vehicalNoRegex.test(oVehicalNo))) {
                    MessageToast.show("please enter valid Vehical Number")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Please enter valid Vehicle Number")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                if (!(phoneRegex.test(oPhone))) {
                    MessageToast.show("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                console.log(typeof (oestimatedTime))
                const oLocalModel1 = new JSONModel({
                    reserve: {
                        Vehicalno: oVehicalNo,
                        Drivername: oDriverName,
                        Phone: oPhone,
                        Estimatedtime: oestimatedTime,
                        Notify: "",
                        Notifysuper: "",
                        Status: true,
                        Vehicletype: sSelectedTextVT,
                        Processtype: sSelectedText,
                        PlotNo: oPlot
                    },
                    plotNo: {
                        Reserved: true
                    }
                });
                this.getView().byId("page8").setModel(oLocalModel1, "localModel");
                const oPayload = this.getView().byId("page8").getModel("localModel").getProperty("/");
                oPayload.reserve.Notify = `The Plot ${oPlot} is Pre-booked by ${oDriverName} for the vehicle ${oVehicalNo} for the estimated Date and Time: ${oestimatedTime}`
                var oVehicleExist = await this.checkVehicleNo(oModel, oPayload.reserve.Vehicalno)

                if (oVehicleExist) {
                    MessageToast.show("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                };
                // var oPlotExist = await this.checkVehicleNo(oModel, oPlot)
                // if (oPlotExist) {
                //     MessageToast.show("Plot already Assigned")
                //     this.getView().byId("idMessageStrip8").setType("Error")
                //     this.getView().byId("idMessageStrip8").setText("Plot already Assigned")
                //     this.getView().byId("idMessageStrip8").setVisible(true)
                //     return
                // };

                var oVehicleExist2 = await this.checkStatus(oModel, oPayload.reserve.Vehicalno, oPayload, oPlot)
                if (oVehicleExist2) {
                    await this.checkVehicleNo2(oModel, oPayload.reserve.Vehicalno, oPayload, oPlot)
                    this.getView().byId("idMessageStrip8").setType("Information")
                    this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    var sMessage = `Hello, ${oDriverName} your vehicle with vehicle number:${oVehicalNo} is successfully reserved to slot number:${oPlot}, Please try to come before estimated time:${oestimatedTime}`
                    this.getView().byId("idVehicleTypeRes").setVisible(true);
                    this.getView().byId("idProcessTypeRes").setVisible(true);
                    this.getView().byId("idVehicleTypeResInput").setVisible(false);
                    this.getView().byId("idProcessTypeResInput").setVisible(false);
                    this.clear();
                    this.onSms(oPhone, sMessage);
                    return
                }
                var oVehicleExist1 = await this.checkVehicleNo1(oModel, oPayload.reserve.Vehicalno)

                if (oVehicleExist1) {
                    MessageToast.show("Vehicle already Reserved")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already Reserved")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    this.clear()
                    return

                };
                try {
                    // Assuming createData method sends a POST request

                    await this.createData(oModel, oPayload.reserve, "/ZEWM_RESERVATION_NSet");
                    // oModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + oPlot + "')", oPayload.plotNo, {
                    //     success: function () {

                    //     }.bind(this),
                    //     error: function (oError) {
                    //         sap.m.MessageBox.error("Failed to update book: " + oError.message);
                    //     }.bind(this)
                    // });
                    //await this.updateData(oModel, "/ZEWM_PR_PARKINGLOT_NSet", oPlot, oPayload.plotNo)
                    MessageToast.show(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setType("Information")
                    this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setVisible(true)




                } catch (error) {
                    console.error("Error:", error);
                }
                var sMessage = `Hello, ${oDriverName} your vehicle with vehicle number:${oVehicalNo} is successfully reserved to slot number:${oPlot}, Please try to come before estimated time:${oestimatedTime}`
                this.getView().byId("idVehicleTypeRes").setVisible(true);
                this.getView().byId("idProcessTypeRes").setVisible(true);
                this.getView().byId("idVehicleTypeResInput").setVisible(false);
                this.getView().byId("idProcessTypeResInput").setVisible(false);
                this.clear();
                this.onSms(oPhone, sMessage);

                

                // oPayload.vehicalDetails.reserved = true;
                // oPayload.vehicalDetails.estimatedTime = this.getView().byId("idEstimatedTime").getValue();
                // const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
                // await this.createData(oModel, oPayload.vehicalDetails, "/VehicalDeatils");
            }
            else {

                var oView = this.getView();


                // Get the Select control
                var oSelect = oView.byId("idProcessTypeResVendor");

                // Get the selected key
                // var sSelectedKey = oSelect.getSelectedKey();
                // console.log("Selected Key: " + sSelectedKey);

                // Alternatively, get the selected item and its text
                var oSelectedItem = oSelect.getSelectedItem();
                var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                console.log("Selected Text: " + sSelectedText);
                var oSelectVehicalType = oView.byId("idVehicleTypeResVendor")
                var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
                var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
                var oVehicalNo = oView.byId("idVehicalNoVe").getValue();
                var oDriverName = oView.byId("idDriverNameVe").getValue();
                var oPhone = oView.byId("idPhoneVe").getValue();
                //var oVehicaltype=oView.byId("").getValue();
                //var oPlot = this.selectedPlotNo;
                //var oPlot=oView.byId("idSlot").getText();
                var oestimatedTime = oView.byId("idEstimatedTimeVe").getValue();
                if (!(oVehicalNo && oDriverName && oPhone && oestimatedTime)) {
                    MessageToast.show("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setType("Warning")
                    this.getView().byId("idMessageStrip8").setText("Please enter all Details")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }

                var vehicalNoRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;
                if (!(vehicalNoRegex.test(oVehicalNo))) {
                    MessageToast.show("please enter valid Vehical Number")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Please enter valid Vehicle Number")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                var phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                if (!(phoneRegex.test(oPhone))) {
                    // MessageToast.show("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("please enter valid PhoneNumber")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    return
                }
                // var OreservationId=this.generateUUID();
                console.log(typeof (oestimatedTime))
                const oLocalModel1 = {


                    Vehicalno: oVehicalNo,
                    Drivername: oDriverName,
                    Phone: oPhone,
                    Estimatedtime: oestimatedTime,
                    Notifysuper: "",
                    Status: false,
                    Vehicletype: sSelectedTextVT,
                    Processtype: sSelectedText,



                };
                //this.getView().setModel(oLocalModel1, "localModel");

                //const oPayload = this.getView().getModel("localModel").getProperty("/");
                oLocalModel1.Notifysuper = `Hey! I am ${oDriverName}, requesting a slot for vehical number: ${oVehicalNo} for the estimated Date and Time: ${oestimatedTime}`
                var oVehicleExist = await this.checkVehicleNo(oModel, oLocalModel1.Vehicalno)

                if (oVehicleExist) {
                    MessageToast.show("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already exsist")
                    this.getView().byId("idMessageStrip8").setVisible(true)
                    this.clearVe();
                    return
                };
                // var oPlotExist = await this.checkVehicleNo(oModel, oPlot)
                // if (oPlotExist) {
                //  // MessageToast.show("Plot already Assigned")
                //  this.getView().byId("idMessageStrip8").setType("Error")
                //  this.getView().byId("idMessageStrip8").setText("Plot already Assigned")
                //  this.getView().byId("idMessageStrip8").setVisible(true)
                //  return
                // };
                var oVehicleExist1 = await this.checkVehicleNo1Ve(oModel, oLocalModel1.Vehicalno)

                if (oVehicleExist1) {
                    MessageToast.show("Vehicle already reserved")
                    this.getView().byId("idMessageStrip8").setType("Error")
                    this.getView().byId("idMessageStrip8").setText("Vehicle already reserved")
                    this.getView().byId("idMessageStrip8").setVisible(true);
                    this.clearVe()
                    return

                };
                try {
                    // Assuming createData method sends a POST request

                    await this.createData(oModel, oLocalModel1, "/ZEWM_RESERVATION_NSet");
                    // oModel.create("/ZEWM_RESERVATION_NSet", oLocalModel1, {
                    //     refreshAfterChange: true,
                    //     success: function(oSuccessData){
                    //         resolve(oSuccessData);
                    //     },
                    //     error: function(oErrorData){
                    //         reject(oErrorData)
                    //     }
                    // })
                    // oModel.update("/PlotNOs('" + oPlot + "')", oPayload.plotNo, {
                    //  success: function () {

                    //  }.bind(this),
                    //  error: function (oError) {
                    //      sap.m.MessageBox.error("Failed to update book: " + oError.message);
                    //  }.bind(this)
                    // });
                    MessageToast.show(`${oVehicalNo} requested to assign a Slot with ${oPlot}`)
                    this.getView().byId("idMessageStrip8").setType("Information")
                    this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} requested to assign a Slot`)
                    this.getView().byId("idMessageStrip8").setVisible(true)




                } catch (error) {
                    console.error("Error:", error);
                }

                this.clearVe();

                // oPayload.vehicalDetails.reserved = true;
                // oPayload.vehicalDetails.estimatedTime = this.getView().byId("idEstimatedTime").getValue();
                // const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
                // await this.createData(oModel, oPayload.vehicalDetails, "/VehicalDeatils");
                var sMessage = `Dear ${oDriverName},We inform you that your vehicle with license plate number ${oVehicalNo} is requested for parking slot number for estimated time:${oestimatedTime}. After conforming your requst you will get SMS with the slot number.`
                this.onSms(oPhone, sMessage);
            }
            this.onModel();

        },
        unRegister: async function () {
            const oLocalModel1 = new JSONModel({
                plotNo: {
                    Reserved: false
                }
            });
            this.getView().byId("page8").setModel(oLocalModel1, "localModel");

            const oPayload = this.getView().byId("page8").getModel("localModel").getProperty("/");
            console.log(this.selectedPlotNo)
            if (this.ID === "Supervisor") {
                var oVehicalNo = this.getView().byId("idVehicalNo1").getValue();
                var oDriverName = this.getView().byId("idDriverName").getValue();
                var oPhoneNumber = this.getView().byId("idPhone").getValue();
                var oestimatedTime = this.getView().byId("idEstimatedTime").getValue();
            }
            else {
                var oVehicalNo = this.getView().byId("idVehicalNoVe").getValue();
                var oDriverName = this.getView().byId("idDriverNameVe").getValue();
                var oPhoneNumber = this.getView().byId("idPhoneVe").getValue();
                var oestimatedTime = this.getView().byId("idEstimatedTimeVe").getValue();
            }


            // var oVehicalNo=this.getView().byId("idVehicalNo1").getValue();

            if (!(oVehicalNo && oDriverName && oPhoneNumber && oestimatedTime)) {
                this.getView().byId("idMessageStrip8").setType("Warning")
                this.getView().byId("idMessageStrip8").setText("Enter all the Details")
                this.getView().byId("idMessageStrip8").setVisible(true)
                return
            }


            const oModel = this.getView().byId("pageContainer").getModel();
            if (this.ID === "Supervisor") {
                // await oModel.update("/PlotNOs('" + this.selectedPlotNo + "')", oPayload.plotNo, {
                //     success: function () {

                //     }.bind(this),
                //     error: function (oError) {
                //         sap.m.MessageBox.error("Failed to update book: " + oError.message);
                //     }.bind(this)
                // });
            }
            await this.deleteData(oModel, "/ZEWM_RESERVATION_NSet", oVehicalNo);
            this.getView().byId("idMessageStrip8").setType("Information")
            this.getView().byId("idMessageStrip8").setText(`${oVehicalNo} is unregistered for the requested ${this.selectedPlotNo}`)
            this.getView().byId("idMessageStrip8").setVisible(true)
            var sMessage = `Dear ${oDriverName},We regret to inform you that your vehicle with license plate number ${oVehicalNo} is unreserved for parking slot number ${this.selectedPlotNo}. Unfortunately, you did not arrive at the estimated time of ${oestimatedTime}.`
            this.clear();
            this.clearVe();
            this.onSms(oPhoneNumber, sMessage);
            this.getView().byId("idVehicleTypeRes").setVisible(true);
            this.getView().byId("idProcessTypeRes").setVisible(true);
            this.getView().byId("idVehicleTypeResInput").setVisible(false);
            this.getView().byId("idProcessTypeResInput").setVisible(false);
            this.getView().byId("idslot1").setVisible(true)
            //this.getView().byId("idslot1").refresh(true)
            this.getView().byId("idSlotResInput").setVisible(false)
            this.onModel();
        },
        clearVe: async function () {
            var oView = this.getView();
            oView.byId("idVehicalNoVe").setValue();
            oView.byId("idDriverNameVe").setValue();
            oView.byId("idPhoneVe").setValue();
            oView.byId("idEstimatedTimeVe").setValue();
            //oView.byId("idSlot").setValue();

        },
        checkVehicleNoVe: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/ZEWM_VEHICLE_NSet", {
                    filters: [
                        new Filter("Vehicalno", FilterOperator.EQ, sVehicalNo),


                    ],
                    success: function (oData) {
                        resolve(oData.results.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        checkVehicleNo1Ve: async function (oModel, sVehicalNo, sResrved) {
            return new Promise((resolve, reject) => {
                oModel.read("/ZEWM_RESERVATION_NSet", {
                    filters: [
                        new Filter("Vehicalno", FilterOperator.EQ, sVehicalNo),


                    ],
                    success: function (oData) {
                        console.log(oData.results)
                        var oVehicle1 = oData.results.filter(checkVehicle)
                        function checkVehicle(v) {
                            console.log(v)
                            return v.Vehicalno === sVehicalNo;
                        }
                        console.log(oVehicle1)
                        resolve(oVehicle1.length > 0);
                    },
                    error: function () {
                        reject(
                            "An error occurred while checking username existence."
                        );
                    }
                })
            })
        },
        onVehicleNumberSubmit1: function (oEvent) {
            var that = this;
            const oView = this.getView();
            if (this.ID === "Supervisor") {
                var sVehicleNo = oView.byId("idVehicalNo1").getValue();
            }
            else {
                var sVehicleNo = oView.byId("idVehicalNoVe").getValue();
            }

            const oModel = this.getView().byId("pageContainer").getModel();
            oModel.read("/ZEWM_RESERVATION_NSet('" + sVehicleNo + "')", {
                success: function (oData) {
                    if (oData.Vehicalno) {
                        console.log(oData.PlotNo)
                        if (this.ID === "Supervisor") {
                            oView.byId("idVehicleTypeResInput").setVisible(true);
                            oView.byId("idProcessTypeResInput").setVisible(true);
                            oView.byId("idVehicleTypeRes").setVisible(false);
                            oView.byId("idProcessTypeRes").setVisible(false);
                            oView.byId("idProcessTypeResInput").setText(oData.Processtype)
                            oView.byId("idVehicleTypeResInput").setText(oData.Vehicletype)
                            oView.byId("idDriverName").setValue(oData.Drivername);
                            oView.byId("idPhone").setValue(oData.Phone);
                            oView.byId("idEstimatedTime").setValue(oData.Estimatedtime);

                            if ((oData.PlotNo)) {
                                oView.byId("idSlotResInput").setVisible(true);
                                oView.byId("idslot1").setVisible(false);
                                oView.byId("idSlotResInput").setText(oData.PlotNo);
                            } else {
                                oView.byId("idslot1").setVisible(true);
                                oView.byId("idSlotResInput").setVisible(false);
                            }

                            // Check if the options exist in the Select

                            //that._filterPlotNumbers1(oData.Processtype, oData.Vehicletype);
                            // this.selectedPlotNo = oData.plotNo_plot_NO
                            // oView.getProperty("text").setText(this.selectedPlotNo)
                        }
                        else {
                            oView.byId("idDriverNameVe").setValue(oData.Drivername);
                            oView.byId("idPhoneVe").setValue(oData.Phone);
                            oView.byId("idEstimatedTimeVe").setValue(oData.Estimatedtime);
                            this.selectedPlotNo = oData.Vehicletype

                        }



                    } else {
                        sap.m.MessageToast.show("Vehicle details not found."); // Handle case where data is not found
                        // Optionally clear other fields
                        oView.byId("idDriverName").setValue("");
                        oView.byId("idPhone").setValue("");
                        oView.byId("idEstimatedTime").setValue(); // Clear product input field if needed
                    }
                }.bind(this),
                error: function () {

                    sap.m.MessageToast.show("Vehicle details not found."); // Handle case where data is not found
                    // Optionally clear other fields
                    oView.byId("idVehicalNo1").setValue("");
                    oView.byId("idDriverName").setValue("");
                    oView.byId("idPhone").setValue("");
                    oView.byId("idEstimatedTime").setValue(); // Clear product input field if needed

                }
            });
           
        },

        onPlotSelectChange: function (oEvent) {
            var selectedItem = oEvent.getParameter("selectedItem");
            if (selectedItem) {
                var selectedPlotNo = selectedItem.getProperty("text");
                console.log("Selected plot number:", selectedPlotNo);
                // Store selected plot number in a variable accessible in registerBtn function
                this.selectedPlotNo = selectedPlotNo;

            }
        },

        loadDataFromModel: function (oModelV2) {
            var oView = this.getView().byId("page1");
            var oPieModel = new JSONModel({
                PlotCounts: []
            });

            oView.setModel(oPieModel, "PieModel");

            oModelV2.read("/ZEWM_PR_PARKINGLOT_NSet", {
                success: function (oData, oResponse) {
                    var aPlotNOs = oData.results;
                    var oCounts = {
                        Available: 0,
                        "Not Available": 0,
                        Reserved: 0
                    };

                    aPlotNOs.forEach(function (plot) {
                        if (plot.Available && !plot.Reserved) {
                            oCounts.Available++;
                        }
                        else if (plot.Reserved) {
                            oCounts.Reserved++;
                        }
                        else {
                            oCounts["Not Available"]++;
                        }
                    });

                    var aData = [];
                    for (var key in oCounts) {
                        if (oCounts.hasOwnProperty(key)) {
                            aData.push({
                                status: key,
                                count: oCounts[key]
                            });
                        }
                    }

                    oPieModel.setData({
                        PlotCounts: aData
                    });
                },
                error: function (oError) {
                    console.error("Error reading PlotNOs:", oError);
                    // Handle error scenario
                }
            });
        },


        onItemSelect: function (oEvent) {

            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
        },
        statusTextFormatter: function (bStatus) {
            return bStatus ? "Empty" : "Not Empty"; // Modify as per your requirement
        },

        _handleMediaChange: function () {
            var rangeName = Device.media.getCurrentRange("StdExt").name;

            switch (rangeName) {
                // Shell Desktop
                case "LargeDesktop":
                    this.byId("productName").setVisible(true);
                    this.byId("secondTitle").setVisible(true);
                    this.byId("searchField").setVisible(true);
                    this.byId("spacer").setVisible(true);
                    this.byId("searchButton").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Large Desktop");
                    break;

                // Tablet - Landscape
                case "Desktop":
                    this.byId("productName").setVisible(true);
                    this.byId("secondTitle").setVisible(false);
                    this.byId("searchField").setVisible(true);
                    this.byId("spacer").setVisible(true);
                    this.byId("searchButton").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Desktop");
                    break;

                // Tablet - Portrait
                case "Tablet":
                    this.byId("productName").setVisible(true);
                    this.byId("secondTitle").setVisible(true);
                    this.byId("searchButton").setVisible(true);
                    this.byId("searchField").setVisible(false);
                    this.byId("spacer").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Tablet");
                    break;

                case "Phone":
                    this.byId("searchButton").setVisible(true);
                    this.byId("searchField").setVisible(false);
                    this.byId("spacer").setVisible(false);
                    this.byId("productName").setVisible(false);
                    this.byId("secondTitle").setVisible(false);
                    MessageToast.show("Screen width is corresponding to Phone");
                    break;
                default:
                    break;
            }
        },
        onExit: function () {
            Device.media.detachHandler(this._handleMediaChange, this);
        },
        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();

            this._setToggleButtonTooltip(bSideExpanded);

            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        _setToggleButtonTooltip: function (bLarge) {
            var oToggleButton = this.byId('sideNavigationToggleButton');
            if (bLarge) {
                oToggleButton.setTooltip('Large Size Navigation');
            } else {
                oToggleButton.setTooltip('Small Size Navigation');
            }
        },
        onClearPress: function () {
            var oView = this.getView();
            oView.byId("idVehicalNo").setValue();
            oView.byId("drivername").setValue();
            oView.byId("phonenumber").setValue();
            //oView.byId("vehicletype").setValue();
            //oView.byId("productInput").setValue();
        },


        onReserveAssign: async function () {
            var obj = this.byId("reservedSlotsTable").getSelectedItem().getBindingContext().getObject();
            console.log(obj)
        },

        clear: async function () {
            var oView = this.getView();
            oView.byId("idVehicalNo1").setValue();
            oView.byId("idDriverName").setValue();
            oView.byId("idPhone").setValue();
            oView.byId("idEstimatedTime").setValue();
            oView.byId("idProcessTypeRes").setVisible(true)
            oView.byId("idProcessTypeResInput").setVisible(false)
            oView.byId("idVehicleTypeRes").setVisible(true)
            oView.byId("idVehicleTypeResInput").setVisible(false)
            oView.byId("idslot1").setVisible(true)
            oView.byId("idSlotResInput").setVisible(false)
            //oView.byId("idSlot").setValue();

        },
        onChange: function () {
            var sProcessType = this.getView().byId("vehicletype").getValue();
            var oSelectDialog = this.byId("selectDialog");

            // Define a filter based on the process type
            var oFilter = new sap.ui.model.Filter("inBoundOroutBound", sap.ui.model.FilterOperator.EQ, sProcessType);

            // Apply the filter to the items binding of the SelectDialog
            oSelectDialog.getBinding("items").filter([oFilter]);
        },

       
        // Filters in all slots page
 
        onSearchAllocatedSlots: async function (oEvent) {
            var sQuery = oEvent.getSource().getValue().trim();
            var oList = this.byId("AllocatedSlotsTable");
            var oBinding = oList.getBinding("items");
            var oModel = this.getOwnerComponent().getModel();
            var sPath= "/ZEWM_VEHICLE_NSet";
           
            // If no search query, fetch all data and reset the table
            if (sQuery === "") {
                try {
                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });
       
                    // Create a new JSON model with all the data
                    var oAllDataModel = new sap.ui.model.json.JSONModel(aAllData);
       
                    // Bind the all data model to the list
                    oList.setModel(oAllDataModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });
       
                    // Reapply XML filters if they exist
                    var aFilters = oList.getBinding("items").aFilters || [];
                    if (aFilters.length > 0) {
                        oBinding.filter(aFilters);
                    }
       
                } catch (error) {
                    console.error("Error fetching all data:", error);
                }
                return;
            }
       
            // If there is a search query, perform the manual filtering
            try {
                var aContexts = oBinding.getContexts();
                var aItems = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
       
                // Filter the data based on the query
                var aFilteredItems = aItems.filter(function (oItem) {
                    return oItem.PLOT_NO && oItem.PLOT_NO.includes(sQuery) ||
                           oItem.Vehicalno && oItem.Vehicalno.includes(sQuery) ||
                           oItem.Vehicletype && oItem.Drivername.includes(sQuery) ||
                           oItem.Processtype && oItem.Processtype.includes(sQuery)||
                           oItem.Phone && oItem.Phone.includes(sQuery)||
                           oItem.Drivername && oItem.Drivername.includes(sQuery);
                });
       
                // Create a new JSON model with the filtered data
                var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredItems);
       
                // Bind the filtered model to the list
                oList.setModel(oFilteredModel);
                oList.bindItems({
                    path: "/",
                    template: oList.getBindingInfo("items").template
                });
       
            } catch (error) {
                console.error("Error filtering data:", error);
            }
   new Filter("Processtype", FilterOperator.Contains, sQuery)
 
           
        },
 
        onSearchReserved: async function (oEvent) {
           
            var sQuery = oEvent.getSource().getValue().trim();
            var oList = this.byId("reservedSlotsTable");
            var oBinding = oList.getBinding("items");
            var oModel = this.getOwnerComponent().getModel();
            var sPath= "/ZEWM_RESERVATION_NSet";
           
            // If no search query, fetch all data and reset the table
            if (sQuery === "") {
                try {
                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });
       
                    // Create a new JSON model with all the data
                    var oAllDataModel = new sap.ui.model.json.JSONModel(aAllData);
       
                    // Bind the all data model to the list
                    oList.setModel(oAllDataModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });
       
                    // Reapply XML filters if they exist
                    var aFilters = oList.getBinding("items").aFilters || [];
                    if (aFilters.length > 0) {
                        oBinding.filter(aFilters);
                    }
       
                } catch (error) {
                    console.error("Error fetching all data:", error);
                }
                return;
            }
       
            // If there is a search query, perform the manual filtering
            try {
                var aContexts = oBinding.getContexts();
                var aItems = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
       
                // Filter the data based on the query
                var aFilteredItems = aItems.filter(function (oItem) {
                    return oItem.PlotNo && oItem.PlotNo.includes(sQuery) ||
                           oItem.Vehicalno && oItem.Vehicalno.includes(sQuery) ||
                           oItem.Vehicletype && oItem.Drivername.includes(sQuery) ||
                           oItem.Processtype && oItem.Processtype.includes(sQuery)||
                           oItem.Phone && oItem.Phone.includes(sQuery)||
                           oItem.Drivername && oItem.Drivername.includes(sQuery);
                });
       
                // Create a new JSON model with the filtered data
                var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredItems);
       
                // Bind the filtered model to the list
                oList.setModel(oFilteredModel);
                oList.bindItems({
                    path: "/",
                    template: oList.getBindingInfo("items").template
                });
       
            } catch (error) {
                console.error("Error filtering data:", error);
            }
        },
        onSearchHistory:async function (oEvent) {
            var sQuery = oEvent.getSource().getValue().trim();
            var oList = this.byId("HistoryTable");
            var oBinding = oList.getBinding("items");
            var oModel = this.getOwnerComponent().getModel();
            var sPath= "/ZEWM_HISTORY_NSet";
           
            // If no search query, fetch all data and reset the table
            if (sQuery === "") {
                try {
                    // Fetch the data from the OData service
                    var aAllData = await new Promise((resolve, reject) => {
                        oModel.read(sPath, {
                            success: function (oData) {
                                resolve(oData.results);
                            },
                            error: function (oError) {
                                console.error("Failed to fetch all data:", oError);
                                reject(oError);
                            }
                        });
                    });
       
                    // Create a new JSON model with all the data
                    var oAllDataModel = new sap.ui.model.json.JSONModel(aAllData);
       
                    // Bind the all data model to the list
                    oList.setModel(oAllDataModel);
                    oList.bindItems({
                        path: "/",
                        template: oList.getBindingInfo("items").template
                    });
       
                    // Reapply XML filters if they exist
                    var aFilters = oList.getBinding("items").aFilters || [];
                    if (aFilters.length > 0) {
                        oBinding.filter(aFilters);
                    }
       
                } catch (error) {
                    console.error("Error fetching all data:", error);
                }
                return;
            }
       
            // If there is a search query, perform the manual filtering
            try {
                var aContexts = oBinding.getContexts();
                var aItems = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
       
                // Filter the data based on the query
                var aFilteredItems = aItems.filter(function (oItem) {
                    return oItem.PlotNo && oItem.PlotNo.includes(sQuery) ||
                           oItem.Vehicalno && oItem.Vehicalno.includes(sQuery) ||
                           oItem.Vehicletype && oItem.Vehicletype.includes(sQuery) ||
                           oItem.Processtype && oItem.Processtype.includes(sQuery)||
                           oItem.Phone && oItem.Phone.includes(sQuery)||
                           oItem.Drivername && oItem.Drivername.includes(sQuery);
                });
       
                // Create a new JSON model with the filtered data
                var oFilteredModel = new sap.ui.model.json.JSONModel(aFilteredItems);
       
                // Bind the filtered model to the list
                oList.setModel(oFilteredModel);
                oList.bindItems({
                    path: "/",
                    template: oList.getBindingInfo("items").template
                });
       
            } catch (error) {
                console.error("Error filtering data:", error);
            }
        },
 

        onButPress: function () {

            if (this.getView().byId("idShowFilter").getText() === "ShowFilter") {
                this.getView().byId("idonSearch").setVisible(true)
                this.getView().byId("idShowFilter").setText("HideFilter")
            }
            else {
                this.getView().byId("idonSearch").setVisible(false)
                this.getView().byId("idShowFilter").setText("ShowFilter")
            }
        },
        onButPress1: function () {

            if (this.getView().byId("idShowFilter1").getText() === "ShowFilter") {
                this.getView().byId("idSearchField1").setVisible(true)
                this.getView().byId("idShowFilter1").setText("HideFilter")
            }
            else {
                this.getView().byId("idSearchField1").setVisible(false)
                this.getView().byId("idShowFilter1").setText("ShowFilter")
            }
        },
        onButPress2: function () {

            if (this.getView().byId("idShowFilter2").getText() === "ShowFilter") {
                this.getView().byId("idSearchField2").setVisible(true)
                this.getView().byId("idShowFilter2").setText("HideFilter")
            }
            else {
                this.getView().byId("idSearchField2").setVisible(false)
                this.getView().byId("idShowFilter2").setText("ShowFilter")
            }
        },
        onNotificationPress: async function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover) {
                this._pPopover = this.loadFragment("Notification").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
            // if (!this.oNotification) {
            //  this.oNotification = await this.loadFragment("Notification")
            // }
            // this.oNotification.open();
            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("idNotificationDialog").setModel(oModelV2);
            if (this.ID === "Security") {
                this.getView().byId("idSecurityNotify").setVisible(true)
            }
            else {
                this.getView().byId("idSupervisorNotify").setVisible(true)
            }
        },
        onCloseNotification: function () {
            var oPopover = this.byId("idNotificationDialog");
            oPopover.close();
        },
        onShowResume: function (oEvent) {
            var oCtx = this.getView().getBindingContext();

            this.getRouter().navTo("RouteHome", {
                // employeeId : oCtx.getProperty("EmployeeID")
            });
        },
        // onPrintPress: async function(){
        //  if (!this.oPrint) {
        //      this.oPrint = await this.loadFragment("Print")
        //  }
        //  this.oPrint.open();
        // },
        // onPrintPress: function() {
        //  // Retrieve input field values
        //  var vehicleNo = this.getView().byId("idVehicalNo").getValue();
        //  var driverName = this.getView().byId("drivername").getValue();
        //  var phoneNumber = this.getView().byId("phonenumber").getValue();
        //  var slotNo = this.getView().byId("productInput").getValue();

        //  // Check if jsPDF is Available
        //  if (typeof jsPDF !== 'undefined') {
        //      // Create a new jsPDF instance
        //      var doc = new jsPDF();

        //      // Set document properties
        //      doc.setProperties({
        //          title: 'Vehicle Details',
        //          subject: 'Details of the assigned vehicle',
        //          author: 'Your Name',
        //          keywords: 'vehicle, details, pdf'
        //      });

        //      // Define content for the PDF
        //      var content = `
        //          Vehicle No: ${vehicleNo}
        //          Driver Name: ${driverName}
        //          Phone Number: ${phoneNumber}
        //          Slot No: ${slotNo}
        //      `;

        //      // Add content to PDF
        //      doc.setFontSize(12);
        //      doc.text(content, 20, 20);

        //      // Optionally add more content or styling here
        //      // Save the PDF
        //      var fileName = "vehicle_details.pdf";
        //      doc.save(fileName);
        //  } else {
        //      // Handle case where jsPDF is not Available
        //      alert('Error: jsPDF library is not loaded.');
        //  }
        // }
        onPrintPress1: function () {
            // Optionally, prepare any additional content you want to print
            var printableContent = this.getView().byId("formId").$(); // Replace "formId" with your form's ID or element

            // Use JavaScript to initiate the print dialog
            window.print();
        },

        // onPrintPress: function () {
        //  const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
        //  var oView = this.getView();
        //  if (oView.byId("idProcessType").getVisible() === true) {
        //      var oSelect = oView.byId("idProcessType");

        //      // Get the selected key
        //      // var sSelectedKey = oSelect.getSelectedKey();
        //      // console.log("Selected Key: " + sSelectedKey);

        //      // Alternatively, get the selected item and its text
        //      var oSelectedItem = oSelect.getSelectedItem();
        //      var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
        //      console.log("Selected Text: " + sSelectedText);
        //      var oSelectVehicalType = oView.byId("idVehicleType")
        //      var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
        //      var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
        //  }
        //  else {
        //      var sSelectedTextVT = oView.byId("idAlotVehicle").getText();
        //      var sSelectedText = oView.byId("idAlotProcess").getText();
        //  }
        //  // Retrieve input field values
        //  var vehicleNo = this.getView().byId("idVehicalNo").getValue();
        //  var driverName = this.getView().byId("drivername").getValue();
        //  var phoneNumber = this.getView().byId("phonenumber").getValue();
        //  var slotNo = this.getView().byId("productInput").getValue();




        //  var content = `
        //      <html>
        //      <head>

        //          <h1 style="text-align:center">Parking Lot Allotment Slip </h1>
        //          <style>
        //              /* Define your print styles here */
        //              body {
        //                  font-family: Arial, sans-serif;
        //                  margin: 20px;

        //              }
        //              .form-container {
        //                  border: 1px solid #ccc;
        //                  padding: 20px;
        //                  margin-bottom: 20px;
        //              }
        //              .label {
        //                  font-weight: bold;
        //              }
        //          </style>
        //      </head>
        //      <body>
        //          <div  class="form-container">

        //              <p><span class="label">Vehicle Number :</span> ${vehicleNo}</p>
        //              <p><span class="label">Driver Name    :</span> ${driverName}</p>
        //              <p><span class="label">Phone Number   :</span> ${phoneNumber}</p>
        //              <p><span class="label">Slot Number    :</span> ${slotNo}</p>
        //              <p><span class="label">Process Type   :</span> ${sSelectedText}</p>
        //              <p><span class="label">Vehicle Type   :</span> ${sSelectedTextVT}</p>
        //          </div>
        //      </body>
        //      </html>
        //  `;

        //  // Open a new window with the printable content
        //  var printWindow = window.open();
        //  printWindow.document.open();
        //  printWindow.document.write(content);
        //  printWindow.document.close();

        //  // Initiate print dialog
        //  printWindow.print();
        //  printWindow.close();
        // },
        onPrintPress: function () {
            // Fetch values from the view
            //    const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
            var oView = this.getView();
            if (oView.byId("idProcessType").getVisible() === true) {
                var oSelect = oView.byId("idProcessType");

                // Get the selected key
                // var sSelectedKey = oSelect.getSelectedKey();
                // console.log("Selected Key: " + sSelectedKey);

                // Alternatively, get the selected item and its text
                var oSelectedItem = oSelect.getSelectedItem();
                var sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;
                console.log("Selected Text: " + sSelectedText);
                var oSelectVehicalType = oView.byId("idVehicleType")
                var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
                var sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
            }
            else {
                var sSelectedTextVT = oView.byId("idAlotVehicle").getText();
                var sSelectedText = oView.byId("idAlotProcess").getText();
            }
            var vehicleNo = this.getView().byId("idVehicalNo").getValue();
            var driverName = this.getView().byId("drivername").getValue();
            var phoneNumber = this.getView().byId("phonenumber").getValue();
            if (this.byId("parkingLotSelect").getVisible() === true) {
                var slotNo = this.getView().byId("parkingLotSelect").getSelectedKey();
            }
            else {
                var slotNo = this.getView().byId("parkingLotSelectText").getText();
            }

            // Create a new window for printing
            var printWindow = window.open('', '', 'height=600,width=800');

            // Write HTML content to the print window
            printWindow.document.write('<html><head><title>Print Receipt</title>');
            printWindow.document.write('<style>');
            printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
            printWindow.document.write('.details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
            printWindow.document.write('.details-table th, .details-table td { border: 1px solid #000; padding: 8px; text-align: left; }');
            printWindow.document.write('.details-table th { background-color: #f2f2f2; }');
            printWindow.document.write('.qr-code { text-align: center; margin-top: 20px; }');
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<div class="print-container">');
            printWindow.document.write('<h1>Parking-Slot Assigned Details Slip:</h1>');
            printWindow.document.write('</div>');
            printWindow.document.write('<table class="details-table">');
            printWindow.document.write('<tr><th>Property</th><th>Details</th><th>QR Code</th></tr>');
            printWindow.document.write('<tr><td>Vehicle Number</td><td>' + vehicleNo + '</td><td rowspan="6"><div id="qrcode"></div></td></tr>');
            printWindow.document.write('<tr><td>Parking Slot Number</td><td>' + slotNo + '</td></tr>');
            printWindow.document.write('<tr><td>Driver Name</td><td>' + driverName + '</td></tr>');
            printWindow.document.write('<tr><td>Driver Phone Number</td><td>' + phoneNumber + '</td></tr>');
            printWindow.document.write('<tr><td>Delivery Type</td><td>' + sSelectedText + '</td></tr>');
            printWindow.document.write('<tr><td>Vehicle Type</td><td>' + sSelectedTextVT + '</td></tr>');
            printWindow.document.write('</table>');

            // Close document and initiate QR code generation
            printWindow.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>');
            printWindow.document.write('<script>');
            printWindow.document.write('setTimeout(function() {');
            printWindow.document.write('new QRCode(document.getElementById("qrcode"), {');
            printWindow.document.write('text: "Vehicle Number: ' + vehicleNo + '\\nDriver Name: ' + driverName + '\\nSlot Number: ' + slotNo + '",');
            printWindow.document.write('width: 100,');
            printWindow.document.write('height: 100');
            printWindow.document.write('});');
            printWindow.document.write('}, 1000);'); // Adjust the timeout for QR code rendering
            printWindow.document.write('</script>');

            // Close document
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();

            // Wait for QR code to be fully rendered before printing
            setTimeout(function () {
                printWindow.print();
            }, 1500); // Timeout to ensure the QR code is rendered before printing
        },


        // onPrintPress: function () {
        //  const oPayload = this.getView().byId("page2").getModel("localModel").getProperty("/").vehicalDetails;
        //  var oView = this.getView();
        //  var sSelectedText, sSelectedTextVT;

        //  if (oView.byId("idProcessType").getVisible() === true) {
        //      var oSelect = oView.byId("idProcessType");
        //      var oSelectedItem = oSelect.getSelectedItem();
        //      sSelectedText = oSelectedItem ? oSelectedItem.getText() : null;

        //      var oSelectVehicalType = oView.byId("idVehicleType");
        //      var oSelectedItemVT = oSelectVehicalType.getSelectedItem();
        //      sSelectedTextVT = oSelectedItemVT ? oSelectedItemVT.getText() : null;
        //  } else {
        //      sSelectedTextVT = oView.byId("idAlotVehicle").getText();
        //      sSelectedText = oView.byId("idAlotProcess").getText();
        //  }

        //  // Retrieve input field values
        //  var vehicleNo = this.getView().byId("idVehicalNo").getValue();
        //  var driverName = this.getView().byId("drivername").getValue();
        //  var phoneNumber = this.getView().byId("phonenumber").getValue();
        //  var slotNo = this.getView().byId("productInput").getValue();

        //  var printWindow = window.open('', '', 'height=500,width=800');
        //     printWindow.document.write('<html><head><title>Parking Lot Allocation</title>');
        //     printWindow.document.write('<style>body{font-family: Arial, sans-serif;} table{width: 100%; border-collapse: collapse;} td, th{border: 1px solid #ddd; padding: 8px;} th{padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #4CAF50; color: white;}</style>');
        //     printWindow.document.write('</head><body>');
        //     printWindow.document.write('<h2>Parking Lot Allocation</h2>');
        //     printWindow.document.write('<table><tr><th>Field</th><th>Value</th></tr>');
        //     printWindow.document.write('<tr><td>Vehicle Number</td><td>' + vehicleNo + '</td></tr>');
        //     printWindow.document.write('<tr><td>Driver Name</td><td>' + driverName + '</td></tr>');
        //     printWindow.document.write('<tr><td>Phone</td><td>' + phoneNumber + '</td></tr>');
        //     printWindow.document.write('<tr><td>Vehicle Type</td><td>' + sSelectedTextVT + '</td></tr>');
        //  printWindow.document.write('<tr><td>Vehicle Type</td><td>' + sSelectedText + '</td></tr>');
        //     printWindow.document.write('<tr><td>Plot Number</td><td>' + slotNo + '</td></tr>');
        //     // printWindow.document.write('<tr><td>Assigned Date</td><td>' + vehicalDeatils.assignedDate + '</td></tr>');

        //     // Generate barcode
        //     debugger
        //     const barcodeValue = `${vehicalDeatils.vehicalNo}`;
        //     const canvas = document.createElement('canvas');
        //     JsBarcode(canvas, barcodeValue, {
        //         format: "CODE128",
        //         lineColor: "#0aa",
        //         width: 4,
        //         height: 40,
        //         displayValue: true
        //     });
        //     const barcodeImage = canvas.toDataURL("image/png");

        //     // Add barcode to print
        //     printWindow.document.write('<tr><td>Barcode</td><td><img src="' + barcodeImage + '" alt="Barcode"></td></tr>');
        //     printWindow.document.write('</table>');
        //     printWindow.document.write('</body></html>');
        //     printWindow.document.close();
        //     printWindow.print();
        // },

        onPrint: function () {
            var oTable = this.byId("HistoryTable");
            var aItems = oTable.getItems();

            if (aItems.length === 0) {
                MessageToast.show("No data Available to export.");
                return;
            }

            var aData = [];

            // Push column headers as the first row
            var aHeaders = [
                "Slot Number",
                "Vehicle Number",
                "Driver Name",
                "Driver Ph.no",
                "Process Type",
                "Vehicle Type",
                "Vehicle In Time",
                "Vehicle Out Time"
            ];
            aData.push(aHeaders);

            // Iterate through table items and collect data
            aItems.forEach(function (oItem) {
                var oCells = oItem.getCells();
                var rowData = [];
                oCells.forEach(function (oCell) {
                    rowData.push(oCell.getText());
                });
                aData.push(rowData);
            });

            // Prepare Excel workbook
            var oSheet = XLSX.utils.aoa_to_sheet(aData);
            var oWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(oWorkbook, oSheet, "History");
            // Generate and download the Excel file
            XLSX.writeFile(oWorkbook, "history.xlsx");
        },
        // onPost: function (oEvent) {
        //  var sValue = oEvent.getParameter("value");
        //  MessageToast.show("Posted new feed entry: " + sValue);
        //  return;
        // },
        // onPost: async function () {
        //  const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
        //  var oM = new JSONModel({
        //      user: "",
        //      message: "",

        //  });
        //  this.getView().byId("page9").setModel(oM, "oM");
        //  var oPayload = this.getView().byId("page9").getModel("oM").getProperty("/");
        //  if (this.ID === "Security") {
        //      var oIn = this.getView().byId("messageInput").getValue();
        //      oPayload.user = this.ID,
        //          oPayload.message = oIn,


        //      await this.createData(oModel, oPayload, "/Message");
        //  }
        //  else{
        //      var oIn = this.getView().byId("messageInput").getValue();
        //      oPayload.user = this.ID,
        //          oPayload.message = oIn,


        //      await this.createData(oModel, oPayload, "/Message");
        //  }
        // },
        onPost: async function () {
            const oModel = this.getView().byId("pageContainer").getModel("ModelV2");
            const oMessageInput = this.getView().byId("messageInput");

            // Get current user input
            const user = this.ID; // Ensure this.ID correctly retrieves the user ID
            const message = oMessageInput.getValue();

            // Prepare payload for new message
            const oPayload = {
                user: user,
                message: message,

            };

            try {
                // Create new message in backend (assuming createData function does this)
                await this.createData(oModel, oPayload, "/Message");

                // Clear input field after posting
                oMessageInput.setValue("");

                // Scroll to the bottom of the list

            } catch (error) {
                console.error("Error posting message:", error);
            }
        },


        // onEdit: function (oEvent) {
        //  // var oButton = oEvent.getSource();
        //  // var oText = oButton.getText();
        //  // var Table = oButton.getParent();
        //  // var oModel = this.getView().getModel();


        //  // if (oText === 'Edit') {
        //  //  oButton.setText("Submit");
        //  //  var ocell1 = oButton.getParent().getCells()[0].setEditable(true);
        //  //  //var ocell2 = oButton.getParent().getCells()[6].setEditable(true);
        //  // } else {
        //  //  oButton.setText("Edit");
        //  //  var ocell1 = oButton.getParent().getCells()[0].setEditable(false);
        //  //  //var ocell2 = oButton.getParent().getCells()[6].setEditable(false);
        //  //  var value1 = oButton.getParent().getCells()[0].getValue();
        //  //  var value2 = oButton.getParent().getCells()[6].getValue();
        //  //  var id = oButton.getParent().getCells()[0].getText();

        //  //  oModel.update("/Products(" + id + ")", { Rating: value1, Price: value2 }, {
        //  //      success: function (oData) {
        //  //          sap.m.MessageBox.success("Succesfully Updated");
        //  //          oModel.refresh(true);
        //  //      },
        //  //      error: function (oError) {
        //  //          sap.m.MessageBox.error("Error while Updating data");

        //  //      }

        //  //  })
        //  // }
        //  // var oModel = this.getView().getModel();
        //  // var oComboBox = this.byId("parkingLotSelectComboBox");

        //  // // Define filter to show only Available parking lots
        //  // var aFilters = [
        //  //  new sap.ui.model.Filter("Available", sap.ui.model.FilterOperator.EQ, true)
        //  // ];

        //  // // Apply filter to the ComboBox binding
        //  // oComboBox.getBinding("items").filter(aFilters);
        //  var oTable = this.byId("AllocatedSlotsTable");
        //  var aSelectedItems = oTable.getSelectedItems();

        //  if (aSelectedItems.length === 0) {
        //      sap.m.MessageToast.show("Please select an item to edit.");
        //      return;
        //  }

        //  aSelectedItems.forEach(function (oItem) {
        //      var aCells = oItem.getCells();
        //      aCells.forEach(function (oCell) {
        //          var aVBoxItems = oCell.getItems();
        //          aVBoxItems[0].setVisible(false); // Hide Text
        //          aVBoxItems[1].setVisible(true)
        //          // Show Input
        //      });
        //  });
        //  this.byId("editButton").setVisible(false);
        //  this.byId("saveButton").setVisible(true);
        //  this.byId("cancelButton").setVisible(true);

        // },
        // onEdit: function () {
        //     var oTable = this.byId("AllocatedSlotsTable");
        //     var aSelectedItems = oTable.getSelectedItems();

        //     if (aSelectedItems.length === 0) {
        //         MessageToast.show("Please select an item to edit.");
        //         return;
        //     }

        //     // Retrieve the selected item
        //     var oSelectedItem = aSelectedItems[0]; // Assuming only one item can be edited at a time
        //     var oContext = oSelectedItem.getBindingContext().getObject();
        //     aSelectedItems.forEach(function (oItem) {
        //         var aCells = oItem.getCells();
        //         aCells.forEach(function (oCell) {
        //             var aVBoxItems = oCell.getItems();
        //             if (aVBoxItems.length > 1) {
        //                 aVBoxItems[0].setVisible(false); // Hide Text
        //                 aVBoxItems[1].setVisible(true);  // Show Input
        //             }
        //         });
        //     });

        //     // Update button visibility
        //     this.byId("editButton").setVisible(false);
        //     this.byId("saveButton").setVisible(true);
        //     this.byId("cancelButton").setVisible(true);
        // },
        // onEdit: function (oEvent) {
        //     const oView = this.getView();
        //     const oTable = this.byId("AllocatedSlotsTable");
        //     // const aSelectedItems = oTable.getSelectedItems();
        //     var oSel = oTable.getSelectedItem();

        //     if (oSel) {
        //         const oContext = oSel.getBindingContext().getObject();
        //         var oButton = oEvent.getSource();
        //         var sButtonText = oButton.getText();
        //         if (sButtonText === "Edit") {
        //             oButton.setText("Submit");
        //             oButton.setText("Submit");
        //             this.byId("ijhhjs").setVisible(true);
        //             const oObject = oSel.getBindingContext().getObject(),
        //             oSlot = oObject.Slotno;
        //         oSel.getCells()[0].getItems()[0].setVisible(false);
        //         oSel.getCells()[0].getItems()[1].setVisible(true);
        //         oSel.getCells()[0].getItems()[1].setEditable(true);
        //     } else {
        //         oButton.setText("Edit");
        //         if (oButton.getText() === 'Edit')
        //             this.byId("ijhhjs").setVisible(false);
        //         var oSel = this.byId("AllocatedSlotsTable").getSelectedItem();
        //         if (!oSel) {
        //             sap.m.MessageBox.error("Please Select atleast one Value!!");
        //         }
        //         const oObject = oSel.getBindingContext().getObject(),
        //         oSlot = oObject.Slotno;
        //     oSel.getCells()[0].getItems()[0].setVisible(true);
        //     oSel.getCells()[0].getItems()[1].setVisible(false);
        //     oSel.getCells()[0].getItems()[1].setEditable(false);
        //     var otemp = oSel.getBindingContext().getObject().Vehicalno
        //     // Getting model
        //     var oval = oSel.getCells()[0].getItems()[0].getText();
        //     var oc = oSel.getCells()[0].getItems()[1].getSelectedKey();
        //         const oDataModel = this.getOwnerComponent().getModel();
        //         oDataModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + otemp + "')",{PLOT_NO:oc}, {
        //             success: function () {
        //                 // Update old Parkinglot to empty (parkingType: true -> false)
        //                 const updatedParkingLot = {
        //                     Available: true // Assuming true represents empty parking
        //                 };
        //                 oDataModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + oval + "')",{Available:true}, {
        //                     success: function () {
        //                          sap.m.MessageToast.show("updated!!");
        //                         oDataModel.update("/ZEWM_PR_PARKINGLOT_NSet('" +oc + "')", {Available:false}, {
        //                             success: function () {
        //                                 // Refresh table binding or do other necessary actions
        //                                 oTable.getBinding("items").refresh();
        //                                 sap.m.MessageBox.success("Slot updated successfully");
        //                             },
        //                             error: function (oError) {
        //                                 sap.m.MessageBox.error("Failed to update new slot: " + oError.message);
        //                             }
        //                         });
        //                     },
        //                     error: function (oError) {
        //                         sap.m.MessageBox.error("Failed to update old slot: " + oError.message);
        //                     }
        //                 });
        //             },
        //             error: function (oError) {
        //                 sap.m.MessageBox.error("Failed to update VDetails: " + oError.message);
        //             }
        //         });
        //     }

        // }
        // },
        // onCancel: function () {
        //     var oTable = this.byId("AllocatedSlotsTable");
        //     var aSelectedItems = oTable.getSelectedItems();

        //     aSelectedItems.forEach(function (oItem) {
        //         var aCells = oItem.getCells();
        //         aCells.forEach(function (oCell) {
        //             var aVBoxItems = oCell.getItems();
        //             aVBoxItems[0].setVisible(true); // Show Text
        //             aVBoxItems[1].setVisible(false); // Hide Input
        //         });
        //     });

        //     this.byId("editButton").setVisible(true);
        //     this.byId("saveButton").setVisible(false);
        //     this.byId("cancelButton").setVisible(false);
        // },
        // onEdit: function (oEvent) {
        //     const oView = this.getView();
        //     const oTable = this.byId("AllocatedSlotsTable");
        //     // const aSelectedItems = oTable.getSelectedItems();
        //     var oSel = oTable.getSelectedItem();

        //     if (oSel) {
        //         const oContext = oSel.getBindingContext().getObject();
        //         var oButton = oEvent.getSource();
        //         var sButtonText = oButton.getText();
        //         if (sButtonText === "Edit") {
        //             oButton.setText("Submit");
        //             oButton.setText("Submit");
        //             this.byId("cancelButton").setVisible(true);
        //             const oObject = oSel.getBindingContext().getObject(),
        //                 oSlot = oObject.Slotno;
        //             oSel.getCells()[0].getItems()[0].setVisible(false);
        //             oSel.getCells()[0].getItems()[1].setVisible(true);
        //             oSel.getCells()[0].getItems()[1].setEditable(true);
        //             console.log(oSelect)
        //             //this.onDeliveryChangeEdit(oSelect)
        //         } else {
        //             oButton.setText("Edit");
        //             if (oButton.getText() === 'Edit')
        //                 this.byId("cancelButton").setVisible(false);
        //             var oSel = this.byId("AllocatedSlotsTable").getSelectedItem();
        //             if (!oSel) {
        //                 MessageBox.error("Please Select atleast one Value!!");
        //             }
        //             const oObject = oSel.getBindingContext().getObject(),
        //                 oSlot = oObject.Slotno;
        //             oSel.getCells()[0].getItems()[0].setVisible(true);
        //             oSel.getCells()[0].getItems()[1].setVisible(false);
        //             oSel.getCells()[0].getItems()[1].setEditable(false);
        //             var otemp = oSel.getBindingContext().getObject().Vehicalno
        //             // Getting model
        //             var oval = oSel.getCells()[0].getItems()[0].getText();
        //             var oc = oSel.getCells()[0].getItems()[1].getSelectedKey();
        //             const oDataModel = this.getOwnerComponent().getModel();
        //             oDataModel.update("/ZEWM_VEHICLE_NSet('" + otemp + "')", { PLOT_NO: oc }, {
        //                 success: function () {
        //                     oDataModel.refresh(true)
        //                     oDataModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + oval + "')", { Available: true }, {
        //                         success: function () {
        //                             MessageToast.show("updated!!");
        //                             oDataModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + oc + "')", { Available: false }, {
        //                                 success: function () {
        //                                     // Refresh table binding or do other necessary actions
        //                                     oTable.getBinding("items").refresh();
        //                                     MessageBox.success("Slot updated successfully");
        //                                 },
        //                                 error: function (oError) {
        //                                     MessageBox.error("Failed to update new slot: " + oError.message);
        //                                 }
        //                             });
        //                         },
        //                         error: function (oError) {
        //                             MessageBox.error("Failed to update old slot: " + oError.message);
        //                         }
        //                     });
        //                 },
        //                 error: function (oError) {
        //                     MessageBox.error("Failed to update VDetails: " + oError.message);
        //                 },


        //             });
        //         }

        //     }
        // },
        
        /**For closing Edit options */
        // onCancel: function (oEvent) {
        //     this.byId("editButton").setText("Edit");
        //     var oSel = this.byId("AllocatedSlotsTable").getSelectedItem();
        //     const oObject = oSel.getBindingContext().getObject();
        //     oObject.PLOT_NO;
        //     this.byId("cancelButton").setVisible(false);


        //     oSel.getCells()[0].getItems()[0].setVisible(true);
        //     oSel.getCells()[0].getItems()[1].setVisible(false);
        //     oSel.getCells()[0].getItems()[1].setEditable(false);

        // },
                /*** Redefine the code */
                onEdit: function (oEvent) {
                    const oView = this.getView();
                    const oTable = this.byId("AllocatedSlotsTable");
                    const oSel = oTable.getSelectedItem();
         
                    if (!oSel) {
                        sap.m.MessageBox.error("Please select at least one item.");
                        return;
                    }
         
                    const oContext = oSel.getBindingContext();
                    const oObject = oContext.getObject();
                    const sSlotNo = oObject.Slotno;
                    const sServiceType = oObject.Processtype;
                    const aCells = oSel.getCells();
                    const oComboBox = aCells[0].getItems().find(item => item instanceof sap.m.ComboBox); // Assuming ComboBox is in the first VBox
                    const oInput = aCells[0].getItems().find(item => item instanceof sap.m.Input); // Assuming Input is in the first VBox
                    const oModel = this.getOwnerComponent().getModel();
                    const oButton = oEvent.getSource();
                    const sButtonText = oButton.getText();
         
                    if (sButtonText === "Edit") {
                        // Switch to submit mode
                        oButton.setText("Submit");
                        this.byId("cancelButton").setVisible(true);
         
                        // Filter the ComboBox items based on the service type
                        this._filterAvailableSlotsByServiceType(oComboBox, sServiceType);
         
                        // Toggle visibility of controls in the selected row
                        aCells.forEach(function (oCell) {
                            const aItems = oCell.getItems() || [];
                            aItems.forEach(function (oItem) {
                                if (oItem instanceof sap.m.Text) {
                                    oItem.setVisible(true); // Hide text items
                                } else if (oItem instanceof sap.m.Input) {
                                    oItem.setVisible(false); // Hide Input items
                                } else if (oItem instanceof sap.m.ComboBox) {
                                    oItem.setVisible(true); // Show ComboBox
                                }
                            });
                        });
                    } else {
                        // Switch back to edit mode
                        oButton.setText("Edit");
                        this.byId("cancelButton").setVisible(false);
         
                        // Toggle visibility of controls in the selected row
                        aCells.forEach(function (oCell) {
                            const aItems = oCell.getItems() || [];
                            aItems.forEach(function (oItem) {
                                if (oItem instanceof sap.m.Text) {
                                    oItem.setVisible(true); // Show text items
                                } else if (oItem instanceof sap.m.ComboBox) {
                                    oItem.setVisible(false); // Hide ComboBox
                                } else if (oItem instanceof sap.m.Input) {
                                    oItem.setVisible(true); // Show Input field
                                }
                            });
                        });
         
                        // Get values to update
                        const sOldSlotValue = oInput.getValue(); // Get value from Input
                        const sNewSlotKey = oComboBox.getSelectedKey(); // Get selected key from ComboBox
                        const sVehicleNo = oObject.Vehicalno; // Get Vehicle Number
                        if (!sNewSlotKey) {
                            sap.m.MessageBox.error("Slot values should be filled!")
                        } else {
                            // Update the Reserved Slots
                            oModel.update("/ZEWM_VEHICLE_NSet('" + sVehicleNo + "')", { PLOT_NO: sNewSlotKey }, {
                                success: function () {
                                    oModel.refresh(true);
         
                                    oModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + sOldSlotValue + "')", { Available: true }, {
                                        success: function () {
                                            sap.m.MessageToast.show("Successfully updated the old slot status");
         
                                            oModel.update("/ZEWM_PR_PARKINGLOT_NSet('" + sNewSlotKey + "')", { Available: false }, {
                                                success: function () {
                                                    // Refresh table binding or do other necessary actions
                                                    oTable.getBinding("items").refresh();
                                                    sap.m.MessageBox.success("Slot updated successfully");
                                                },
                                                error: function (oError) {
                                                    sap.m.MessageBox.error("Failed to update new slot: " + oError.message);
                                                }
                                            });
                                        },
                                        error: function (oError) {
                                            sap.m.MessageBox.error("Failed to update old slot: " + oError.message);
                                        }
                                    });
                                },
                                error: function (oError) {
                                    sap.m.MessageBox.error("Failed to update vehicle details: " + oError.message);
                                }
                            });
                        }
                    }
                },
         
                // Filter ComboBox items based on the service type
                _filterAvailableSlotsByServiceType: function (oComboBox, sServiceType) {
                    const oModel = this.getView().getModel();
                    const aFilters = [
                        new sap.ui.model.Filter("Available", sap.ui.model.FilterOperator.EQ, true),
                        new sap.ui.model.Filter("Processtype", sap.ui.model.FilterOperator.EQ, sServiceType)
                    ];
         
                    oComboBox.bindAggregation("items", {
                        path: "/ZEWM_PR_PARKINGLOT_NSet",
                        template: new sap.ui.core.Item({
                            key: "{PlotNo}",
                            text: "{PlotNo}"
                        }),
                        filters: aFilters
                    });
                },
         
                // Filter ComboBox items based on the service type
                _filterAvailableSlotsByServiceType: function (oComboBox, sServiceType) {
                    const oModel = this.getView().getModel();
                    const aFilters = [
                        new sap.ui.model.Filter("Available", sap.ui.model.FilterOperator.EQ, true),
                        new sap.ui.model.Filter("Processtype", sap.ui.model.FilterOperator.EQ, sServiceType)
                    ];
         
                    oComboBox.bindAggregation("items", {
                        path: "/ZEWM_PR_PARKINGLOT_NSet",
                        template: new sap.ui.core.Item({
                            key: "{PlotNo}",
                            text: "{PlotNo}"
                        }),
                        filters: aFilters
                    });
                },
         
                /**For closing Edit options */
                onCancel: function (oEvent) {
                    // Reset the button text to "Edit"
                    this.byId("editButton").setText("Edit");
         
                    // Hide the cancel button
                    this.byId("cancelButton").setVisible(false);
         
                    // Get the selected item from the table
                    var oSel = this.byId("AllocatedSlotsTable").getSelectedItem();
         
                    if (!oSel) {
                        sap.m.MessageToast.show("Please select a slot to cancel.");
                        return;
                    }
         
                    // Get the binding context and object
                    const oObject = oSel.getBindingContext().getObject();
         
                    // Assume the first cell contains the VBox with Input and ComboBox
                    var aCells = oSel.getCells();
                    var oVBox = aCells[0]; // Adjust index if needed
                    var aItems = oVBox.getItems();
         
                    if (aItems.length < 2) {
                        console.error("Expected at least 2 items (Input and ComboBox) in the first VBox.");
                        return;
                    }
         
                    // Get the Input and ComboBox controls
                    var oInput = aItems[0]; // Assuming Input is at index 0
                    var oComboBox = aItems[1]; // Assuming ComboBox is at index 1
         
                    // Set visibility for controls
                    oInput.setVisible(true); // Show Input field
                    oComboBox.setVisible(false); // Hide ComboBox
         
                    // Set ComboBox to non-editable
                    oComboBox.setEditable(false);
         
                    // Optional: Clear or reset ComboBox selection
                    oComboBox.setSelectedKey("");
         
                    // Optional: Restore or reset other controls if needed
                    // Example: Reset other cells or controls if necessary
                },
         
        _generateBarcode: function (barcodeValue) {
            var oHtmlControl = this.byId("barcodeContainer");
            if (oHtmlControl) {
                oHtmlControl.setContent('<svg id="barcode" ></svg>');
                setTimeout(function () {
                    JsBarcode("#barcode", barcodeValue, {
                        displayValue: false // Hide the value
                    });
                }, 0);
            } else {
                console.error("HTML control not found or not initialized.");
            }
        },
        onSave: function () {
            const oView = this.getView();
            const oTable = this.byId("AllocatedSlotsTable");
            const aSelectedItems = oTable.getSelectedItems();
            const oSelected = oTable.getSelectedItem();

            if (oSelected) {
                const oContext = oSelected.getBindingContext().getObject();
                const sVehicle = oContext.vehicalNo;

                const sDriverMobile = oContext.phone;
                const sDriverName = oContext.driverName;
                var sOldSlotNumber = oContext.plotNo_plot_NO;
                var sAssign = oContext.assignedDate;

                // Assuming the user selects a new slot number from somewhere
                const oSelect = oSelected.getCells()[0].getItems()[1]; // Assuming the Select is the second item in the first cell
                const sSlotNumber = oSelect.getSelectedKey(); // Get selected slot number

                // Create a record in history (assuming this is what you want to do)
                const oNewUpdate = {
                    vehicalNo: sVehicle,
                    driverName: sDriverName,
                    phone: sDriverMobile,
                    assignedDate: sAssign,
                    plotNo: {
                        plot_NO: sSlotNumber
                    }
                };

                // Update VDetails record
                const oDataModel = this.getOwnerComponent().getModel("ModelV2");
                oDataModel.update("/VehicalDeatils('" + sVehicle + "')", oNewUpdate, {
                    success: function () {
                        // Update old Parkinglot to empty (parkingType: true -> false)
                        const updatedParkingLot = {
                            Available: true // Assuming true represents empty parking
                        };
                        oDataModel.update("/PlotNOs('" + sOldSlotNumber + "')", updatedParkingLot, {
                            success: function () {
                                // Update new Parkinglot to occupied (parkingType: false -> true)
                                const updatedNewParkingLot = {
                                    Available: false // Assuming false represents occupied parking
                                };
                                oDataModel.update("/PlotNOs('" + sSlotNumber + "')", updatedNewParkingLot, {
                                    success: function () {
                                        // Refresh table binding or do other necessary actions
                                        oTable.getBinding("items").refresh();
                                        sap.m.MessageBox.success("Slot updated successfully");
                                    },
                                    error: function (oError) {
                                        sap.m.MessageBox.error("Failed to update new slot: " + oError.message);
                                    }
                                });
                            },
                            error: function (oError) {
                                sap.m.MessageBox.error("Failed to update old slot: " + oError.message);
                            }
                        });
                    },
                    error: function (oError) {
                        sap.m.MessageBox.error("Failed to update VDetails: " + oError.message);
                    }
                });
            }

            // Additional UI updates or actions after saving
            aSelectedItems.forEach(function (oItem) {
                var aCells = oItem.getCells();
                aCells.forEach(function (oCell) {
                    var aVBoxItems = oCell.getItems();
                    aVBoxItems[0].setVisible(true); // Hide Text
                    aVBoxItems[1].setVisible(false); // Show Input
                });
            });
            this.byId("editButton").setVisible(true);
            this.byId("saveButton").setVisible(false);
            this.byId("cancelButton").setVisible(false);
        },


        onAvatarPressed: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover1) {
                this._pPopover1 = this.loadFragment("UserDetails").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover1.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
            this.detaild();

        },
        detaild: function () {
            if (this.ID === "Security") {
                this.getView().byId("userTitle").setText(`${this.ID}`);
                this.getView().byId("email").setText("Security@security.com")
                this.getView().byId("phone").setText("9888776608")
                this.getView().byId("userRole").setText("Role:Security")
            }
            else if (this.ID === "Vendor") {
                this.getView().byId("userTitle").setText("Ramu");
                this.getView().byId("email").setText("ramu@vendor.com")
                this.getView().byId("phone").setText("9987655534")
                this.getView().byId("userRole").setText(`Role: ${this.ID}`)
            }
            else {
                this.getView().byId("userTitle").setText(`${this.ID}`);
                this.getView().byId("email").setText("Supervisor@supervisor.com")
                this.getView().byId("phone").setText("9876655403")
                this.getView().byId("userRole").setText("Role:Supervisor")
            }
        },


        onCloseUserDetails: function () {
            var oPopover = this.byId("idUserDetailsDialog");
            oPopover.close();

        },
        // onVehicleTypeChange: function() {
        //  this._filterPlotNumbers();

        // },

        onProcessTypeChange: function () {
            this._filterPlotNumbers();
        },

        _filterPlotNumbers: function () {
            var oVehicleTypeSelect = this.byId("idVehicleTypeRes");
            var oProcessTypeSelect = this.byId("idProcessTypeRes");
            var sVehicleType = oVehicleTypeSelect.getSelectedItem().getText();
            var sProcessType = oProcessTypeSelect.getSelectedItem().getText();
            if (!(sVehicleType && sProcessType)) {
                return
            }

            var oPlotSelect = this.byId("idslot1");
            var oBinding = oPlotSelect.getBinding("items");

            var aFilters = [];
            if (sVehicleType) {
                aFilters.push(new sap.ui.model.Filter("vehicleType", sap.ui.model.FilterOperator.EQ, sVehicleType));
            }
            if (sProcessType) {
                aFilters.push(new sap.ui.model.Filter("processType", sap.ui.model.FilterOperator.EQ, sProcessType));
            }

            oBinding.filter(aFilters);
        },
        _filterPlotNumbers1: function (oProcessType, oVehicaltype) {

            var sVehicleType = oVehicaltype
            var sProcessType = oProcessType
            if (!(sVehicleType && sProcessType)) {
                return
            }

            var oPlotSelect = this.byId("idslot1");
            var oBinding = oPlotSelect.getBinding("items");

            var aFilters = [];
            if (sVehicleType) {
                aFilters.push(new sap.ui.model.Filter("Vehicletype", sap.ui.model.FilterOperator.EQ, sVehicleType));
            }
            if (sProcessType) {
                aFilters.push(new sap.ui.model.Filter("processtype", sap.ui.model.FilterOperator.EQ, sProcessType));
            }

            oBinding.filter(aFilters);
        },
        onModel: async function () {
            var oModel = this.getOwnerComponent().getModel();
            var supervisorCount = 0;
            var securityCount = 0;
            var AvailableCount = 0;
            var assignedCount = 0;
            var reservedCount = 0;
            var that = this;
            await oModel.read("/ZEWM_RESERVATION_NSet", {
                success: function (oData) {
                    var t = oData.results;
                    for (let i = 0; i < t.length; i++) {
                        if (t[i].Notify) {
                            securityCount++;
                        }
                        else if (t[i].Notifysuper) {
                            supervisorCount++;
                        }
                        const element = t[i].Notify;
                        console.log(securityCount);

                    }

                    console.log(t);
                    if (that.ID === "Supervisor") {
                        that.byId("idNotificationBadge").setValue(supervisorCount);
                    }
                    else if (that.ID === "Security") {
                        that.byId("idNotificationBadge").setValue(securityCount);
                    }



                },
                error: function () {
                }

            })

            await oModel.read("/ZEWM_PR_PARKINGLOT_NSet", {
                success: function (oData) {
                    var array = oData.results
                    var allSlotCount = array.length;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].Available === true && array[i].Reserved === false) {
                            AvailableCount++
                        }
                        else if (array[i].Available === false && array[i].Reserved ===false ) {
                            assignedCount++
                        }

                        else {
                            reservedCount++
                        }
                    }
                    that.byId("idbadge4").setValue(allSlotCount);
                    that.byId("idbadge3").setValue(AvailableCount);
                    that.byId("idbadge1").setValue(assignedCount);
                    that.byId("idbadge2").setValue(reservedCount);


                },
                error: function () {
                }
            })


            oModel.refresh()
        },
        onBeforeRendering: function () {
            this.onModel();

        },
        onAfterRendering: function () {
            this.onModel();
        },
        onAllSlots: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover2) {
                this._pPopover2 = this.loadFragment("allslots").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover2.then(function (oPopover) {
                oPopover.openBy(oButton);
            });

            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("idallslotsDialog").setModel(oModelV2);
        },
        onAllocatedSlots: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover3) {
                this._pPopover3 = this.loadFragment("AllocatedSlots").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover3.then(function (oPopover) {
                oPopover.openBy(oButton);
            });

            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("idallocatedSlots").setModel(oModelV2);
        },
        onReservedSlots: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover4) {
                this._pPopover4 = this.loadFragment("ReservedSlots").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover4.then(function (oPopover) {
                oPopover.openBy(oButton);
            });

            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("idReservedSlotsPopover").setModel(oModelV2);
        },
        onEmptySlots: function (oEvent) {
            var oButton = oEvent.getSource(),
                oView = this.getView();

            // create popover
            if (!this._pPopover5) {
                this._pPopover5 = this.loadFragment("EmptySlots").then(function (oPopover) {
                    oView.addDependent(oPopover);
                    oPopover.bindElement("");
                    return oPopover;
                });
            }
            this._pPopover5.then(function (oPopover) {
                oPopover.openBy(oButton);
            });

            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("idEmptySlotsPopover").setModel(oModelV2);
        },

        onClose1: function () {
            var oPopover = this.byId("idallocatedSlots");
            oPopover.close();

        },

        onClose3: function () {
            var oPopover = this.byId("idEmptySlotsPopover");
            oPopover.close();

        },
        onClose2: function () {
            var oPopover = this.byId("idallslotsDialog");
            oPopover.close();

        },
        onClose4: function () {
            var oPopover = this.byId("idReservedSlotsPopover");
            oPopover.close();

        },

        onScanner: function (oEvent) {
            BarcodeScanner.scan(
                function (mResult) {
                    if (mResult && mResult.text) {
                        var scannedText = mResult.text;
                        sap.m.MessageBox.show("We got barcode: " + scannedText);
                        // Assuming you have an input field with ID "idMat" to display the scanned text
                        this.getView().byId("idMat").setValue(scannedText);
                    } else {
                        sap.m.MessageBox.error("Barcode scan failed or no result.");
                    }
                }.bind(this), // Bind 'this' context to access the view
                function (oError) {
                    sap.m.MessageBox.error("Barcode scanning failed: " + oError);
                }
            );
        },
        onVehicleTypeChange: function (oEvent) {
            this._updateParkingLotSelect();
        },

        onProcessTypeChange: function (oEvent) {
            this._updateParkingLotSelect();
        },

        _updateParkingLotSelect: function () {
            var oVehicleTypeSelect = this.byId("idVehicleType");
            var oProcessTypeSelect = this.byId("idProcessType");
            var oParkingLotSelect = this.byId("parkingLotSelect");

            // Get selected values
            var sVehicleType = oVehicleTypeSelect.getSelectedItem() ? oVehicleTypeSelect.getSelectedItem().getText() : "";
            var sProcessType = oProcessTypeSelect.getSelectedItem() ? oProcessTypeSelect.getSelectedItem().getText() : "";

            // Create filters
            var aFilters = [];
            if (sVehicleType) {
                aFilters.push(new Filter("Vehicletype", FilterOperator.EQ, sVehicleType));
            }
            if (sProcessType) {
                aFilters.push(new Filter("Processtype", FilterOperator.EQ, sProcessType));
            }

            // Apply filters to the binding of the parking lot select control
            var oBinding = oParkingLotSelect.getBinding("items");
            oBinding.filter(aFilters);
        },
        onDeliveryChange: function (oEvent) {
            debugger
            var oSelect = this.byId("idProcessType");
            var oSelectedItem = oSelect.getSelectedItem();
            var sSelectedKey = oSelectedItem ? oSelectedItem.getText() : null;
            // var t = this.byId('idProcessType');
            // var sSelectedKey = oEvent.getSource().getSelectedKey();
            console.log("Selected Delivery Type:", sSelectedKey);

            // Create filters based on the selected delivery type
            var aFilters = [];
            if (sSelectedKey) {
                aFilters.push(new Filter('Processtype', FilterOperator.EQ, sSelectedKey));
            }

            // Add the status filter to the filters array
            aFilters.push(new Filter('Available', FilterOperator.EQ, true));
            aFilters.push(new Filter('Reserved', FilterOperator.EQ, false));

            // Get the parking slot select control
            var oParkingLotSelect = this.byId("parkingLotSelect");
            if (!oParkingLotSelect) {
                console.error("Parking Lot Select control not found.");
                return;
            }

            // Get the binding of the parking slot select control
            var oBinding = oParkingLotSelect.getBinding("items");
            if (!oBinding) {
                console.error("Binding not found for Parking Lot Select.");
                return;
            }

            // Apply the filters to the binding
            oBinding.filter(aFilters);

            // Optional: Log the filtered items in the Select for debugging
            oBinding.getContexts().forEach(function (context) {
                console.log("Filtered Item:", context.getObject());
            });
        },
        onDeliveryChangeSuper: function (oEvent) {
            debugger
            if(this.byId("idProcessTypeRes").getVisible()===true){
                var oSelect = this.byId("idProcessTypeRes");
                var oSelectedItem = oSelect.getSelectedItem();
                var sSelectedKey = oSelectedItem ? oSelectedItem.getText() : null;
            }
            else{
                var sSelectedKey =this.byId("idProcessTypeResInput").getText();
            }
            // var t = this.byId('idProcessType');
            // var sSelectedKey = oEvent.getSource().getSelectedKey();
            console.log("Selected Delivery Type:", sSelectedKey);

            // Create filters based on the selected delivery type
            var aFilters = [];
            if (sSelectedKey) {
                aFilters.push(new Filter('Processtype', FilterOperator.EQ, sSelectedKey));
            }

            // Add the status filter to the filters array
            aFilters.push(new Filter('Available', FilterOperator.EQ, true));
            aFilters.push(new Filter('Reserved', FilterOperator.EQ, false));

            // Get the parking slot select control
            var oParkingLotSelect = this.byId("idslot1");
            if (!oParkingLotSelect) {
                console.error("Parking Lot Select control not found.");
                return;
            }

            // Get the binding of the parking slot select control
            var oBinding = oParkingLotSelect.getBinding("items");
            if (!oBinding) {
                console.error("Binding not found for Parking Lot Select.");
                return;
            }

            // Apply the filters to the binding
            oBinding.filter(aFilters);

            // Optional: Log the filtered items in the Select for debugging
            oBinding.getContexts().forEach(function (context) {
                console.log("Filtered Item:", context.getObject());
            });
        },
        onDeliveryChangeEdit: function (sSelectedKey) {
            debugger
            // var oSelect = this.byId("idProcessType");
            // var oSelectedItem = oSelect.getSelectedItem();
            // var sSelectedKey = oSelectedItem ? oSelectedItem.getText() : null;
            // // var t = this.byId('idProcessType');
            // // var sSelectedKey = oEvent.getSource().getSelectedKey();
            // console.log("Selected Delivery Type:", sSelectedKey);

            // Create filters based on the selected delivery type
            var aFilters = [];
            if (sSelectedKey) {
                aFilters.push(new Filter('Processtype', FilterOperator.EQ, sSelectedKey));
            }

            // Add the status filter to the filters array
            aFilters.push(new Filter('Available', FilterOperator.EQ, true));
            aFilters.push(new Filter('Reserved', FilterOperator.EQ, false));

            // Get the parking slot select control
            var oParkingLotSelect = this.byId("parkingLotSelectComboBox");
            if (!oParkingLotSelect) {
                console.error("Parking Lot Select control not found.");
                return;
            }

            // Get the binding of the parking slot select control
            var oBinding = oParkingLotSelect.getBinding("items");
            if (!oBinding) {
                console.error("Binding not found for Parking Lot Select.");
                return;
            }

            // Apply the filters to the binding
            oBinding.filter(aFilters);

            // Optional: Log the filtered items in the Select for debugging
            oBinding.getContexts().forEach(function (context) {
                console.log("Filtered Item:", context.getObject());
            });
        },
          //  Scanning the Barcode
          onScanner: function (oEvent) {
            BarcodeScanner.scan(
                function (mResult) {
                    if (mResult && mResult.text) {
                        var scannedText = mResult.text;
                        sap.m.MessageBox.show("We got barcode: " + scannedText);
                        // Assuming you have an input field with ID "idMat" to display the scanned text
                        this.getView().byId("idVehicalNo").setValue(scannedText);
                         this.onVehicleNumberSubmit();
                        var otable = this.getView().byId("AllocatedSlotsTable").getBinding("items");
                        otable.refresh(true);
 
                    } else {
                        sap.m.MessageBox.error("Barcode scan failed or no result.");
                    }
                }.bind(this), // Bind 'this' context to access the view
                function (oError) {
                    sap.m.MessageBox.error("Barcode scanning failed: " + oError);
                }
            );
        },
    });
});
