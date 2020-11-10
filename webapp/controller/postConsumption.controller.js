var messageArray = [];

var globalModel;
var manufOrderNavigate;
var operationNavigate;
var handlingunitNavigate;
var productNavigate;
var prodSupplyNavigate;
var quanProdNavigate;
var uomNavigate;

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/TablePersoController",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	'sap/m/MessageBox',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageToast',
	'sap/m/MessageBox',
	'sap/ui/model/json/JSONModel',
	"sap/com/postconsumption/postConsumption/utilities/Formatter"
], function (Controller, History, TablePersoController, Export, ExportTypeCSV, MessageBox, Filter, FilterOperator, MessageToast,
	JSONModel, Formatter) {
	"use strict";

	return Controller.extend("sap.com.postconsumption.postConsumption.controller.postConsumption", {
		formatter: Formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.com.postconsumption.postConsumption.view.postConsumption
		 */
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("postConsumption").attachMatched(this._onRouteMatched, this);

			// Create a persistence key
			var oPersId = {
				container: "mycontainer-1",
				item: "myitem-1"
			};

			// // Get a personalization service provider from the shell (or create your own)
			var oProvider = sap.ushell.Container.getService("Personalization").getPersonalizer(oPersId);

			// Instantiate a controller connecting your table and the persistence service
			this._oTPC = new TablePersoController({
				table: this.getView().byId("consumptionTable"),
				persoService: oProvider
					// persoService: persoService
			}).activate();

			//		this.getConsumption();

		},

		_onRouteMatched: function (oEvent) {

			//logic to get values from first screen using json model
			var manufacturingOrder = sap.ui.getCore().getModel("settingsDefaultModel").oData.manufacturingOrder;
			var handlingUnitvalue = sap.ui.getCore().getModel("settingsDefaultModel").oData.handlingUnitvalue;
			var uomValue = sap.ui.getCore().getModel("settingsDefaultModel").oData.uomValue;
			var operation = sap.ui.getCore().getModel("settingsDefaultModel").oData.operation;
			var product = sap.ui.getCore().getModel("settingsDefaultModel").oData.product;
			var prodSupArea = sap.ui.getCore().getModel("settingsDefaultModel").oData.prodSupArea;
			var quantityProduced = sap.ui.getCore().getModel("settingsDefaultModel").oData.quantityProduced;

			//function to call consumption service
				this.getConsumption();
			console.log("Passed values are", manufacturingOrder, handlingUnitvalue, uomValue, operation, product, prodSupArea, quantityProduced);

			//logic to clear values for cards on navigation

			var oView = this.getView();
			var clearValue = "";

			/*	oView.byId("handlingTextId").setText(clearValue);
				oView.byId("productConsumtionId").setText(clearValue);
				oView.byId("batchId").setText(clearValue);
				oView.byId("shelfLifeId").setText(clearValue);
				oView.byId("descriptionId").setText(clearValue);
				oView.byId("operationId").setText(clearValue);*/

			//Additional manufacturing order information

			oView.byId("addlFinishedProdId").setText(clearValue);
			oView.byId("addlDescriptionId").setText(clearValue);
			oView.byId("addlManufOrderId").setText(clearValue);
			/*oView.byId("addlRequirementStartId").setText(clearValue);
			oView.byId("addlReservationId").setText(clearValue);
			oView.byId("addlConsumedQuantityId").setText(clearValue);
			oView.byId("addlConsumedQuantityUnitId").setText(clearValue);
			oView.byId("addlConsumedProgressId").setPercentValue(0);
			oView.byId("addlConsumedProgressId").setDisplayValue(0);
			oView.byId("addlOperationActivityId").setText(clearValue);
			oView.byId("addlItemNoOfReservationId").setText(clearValue);
			oView.byId("addlrequiredQuantityBuomId").setText(clearValue);
			oView.byId("addlrequiredQuantityUnitId").setText(clearValue);*/
			this.globalQuanValue = "";
			this.consQuanRadio = "e";
			this.remQuanRadio = "ne";

			//	this.getView().byId("consumptionQuantityId").setSelected(true);
		},

		onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteSettings", true);
		},

		//Personalisation button click event
		_onPersoButtonPressed: function (oEvent) {
			this._oTPC.openDialog();
			//	this.oTablePersoController.openDialog();
		},

		// on select a particular comsumption - Not used

		onPressOrderNumber: function (oEvent) {

			//	var selectedvalue	= oEvent.getParameter("listItem").getBindingContext().getObject();
			var selectedValue = oEvent.getParameter("listItem").oBindingContexts.stockConsModel.sPath;
			var tableValue = oEvent.getSource().getModel("stockConsModel").getProperty(selectedValue);
			console.log("Inside press order number");
			//	this.getView().byId("restrictedUseId").setEnabled(true);
			// this.getView().byId("consumptionQuantityId").setEnabled(true);
			// this.getView().byId("remainingQuantityId").setEnabled(true);
			var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("consumptionModel");

			var manuOrder = tableValue.MfgOrder;
			var quanProd = tableValue.Lgnum;
			//var handlingUnit = "112345678000012066";
			var handlingUnit = tableValue.Huident;
			sap.ui.core.BusyIndicator.show();

			oModel.read("/HandlUnitStockSet(Lgnum='" + quanProd + "',Huident='" + handlingUnit + "',MfgOrder='" + manuOrder + "')", {

				success: function (oData, Response) {

					//	oView.byId("handlingTextId").setText(oData.Huident);
					/*	oView.byId("handlingTextId").setText(oData.Huident);
						oView.byId("productConsumtionId").setText(oData.Matnr);
						oView.byId("batchId").setText(oData.Charg);
						oView.byId("shelfLifeId").setText(oData.Vfdat);
						oView.byId("descriptionId").setText(oData.Maktx);
						oView.byId("operationId").setText(oData.Operation);*/

					//Additional manufacturing order information

					oView.byId("addlFinishedProdId").setText(oData.AdiMatnr);
					oView.byId("addlDescriptionId").setText(oData.CatTxt);
					oView.byId("addlManufOrderId").setText(oData.AdiMfgOrder);
					/*	oView.byId("addlRequirementStartId").setText(oData.AdiReqStartDate);
						oView.byId("addlReservationId").setText(oData.AdiRsnum);
						oView.byId("addlConsumedQuantityId").setText(oData.AdiReqQuanGi);
						oView.byId("addlConsumedQuantityUnitId").setText(oData.AdiReqUomGi);
						oView.byId("addlConsumedProgressId").setPercentValue(oData.AdiConsProg);
						oView.byId("addlConsumedProgressId").setDisplayValue(oData.AdiConsProg);
						oView.byId("addlOperationActivityId").setText(oData.AdiOperation);
						oView.byId("addlItemNoOfReservationId").setText(oData.AdiRspos);
						oView.byId("addlrequiredQuantityBuomId").setText(oData.AdiReqQuan);
						oView.byId("addlrequiredQuantityUnitId").setText(oData.AdiReqUom);*/

					sap.ui.core.BusyIndicator.hide();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				}

			});

			var oSelectedItem = oEvent.getParameter("listItem");
			var oTable = oEvent.getSource();
			var oIndex = oTable.indexOfItem(oSelectedItem);
			console.log("Selected index", oIndex);

			var oView = this.getView();
			var oTable = this.getView().byId("consumptionTable");
			var aItems = oTable.getSelectedItems();

			// if (oView.byId("consumptionQuantityId").getSelected() === true) {
			// 	oTable.getItems()[oIndex].getCells()[27].setEditable(true);
			// 	oTable.getItems()[oIndex].getCells()[28].setEditable(false);

			// } else {

			// 	oTable.getItems()[oIndex].getCells()[28].setEditable(true);
			// 	oTable.getItems()[oIndex].getCells()[27].setEditable(false);

			// }

		},

		// Not -used
		onselectChange: function (oEvent) {

			//	var selectedvalue	= oEvent.getParameter("listItem").getBindingContext().getObject();
			var selectedValue = oEvent.getParameter("listItem").oBindingContexts.stockConsModel.sPath;
			var tableValue = oEvent.getSource().getModel("stockConsModel").getProperty(selectedValue);
			console.log("Inside press order number");
			//	this.getView().byId("restrictedUseId").setEnabled(true);
			// this.getView().byId("consumptionQuantityId").setEnabled(true);
			// this.getView().byId("remainingQuantityId").setEnabled(true);
			var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("consumptionModel");

			var manuOrder = tableValue.MfgOrder;
			var quanProd = tableValue.Lgnum;
			//var handlingUnit = "112345678000012066";
			var handlingUnit = tableValue.Huident;
			sap.ui.core.BusyIndicator.show();

			oModel.read("/HandlUnitStockSet(Lgnum='" + quanProd + "',Huident='" + handlingUnit + "',MfgOrder='" + manuOrder + "')", {

				success: function (oData, Response) {

					//	oView.byId("handlingTextId").setText(oData.Huident);
					/*	oView.byId("handlingTextId").setText(oData.Huident);
						oView.byId("productConsumtionId").setText(oData.Matnr);
						oView.byId("batchId").setText(oData.Charg);
						oView.byId("shelfLifeId").setText(oData.Vfdat);
						oView.byId("descriptionId").setText(oData.Maktx);
						oView.byId("operationId").setText(oData.Operation);*/

					//Additional manufacturing order information

					oView.byId("addlFinishedProdId").setText(oData.AdiMatnr);
					oView.byId("addlDescriptionId").setText(oData.CatTxt);
					oView.byId("addlManufOrderId").setText(oData.AdiMfgOrder);
					/*	oView.byId("addlRequirementStartId").setText(oData.AdiReqStartDate);
						oView.byId("addlReservationId").setText(oData.AdiRsnum);
						oView.byId("addlConsumedQuantityId").setText(oData.AdiReqQuanGi);
						oView.byId("addlConsumedQuantityUnitId").setText(oData.AdiReqUomGi);
						oView.byId("addlConsumedProgressId").setPercentValue(oData.AdiConsProg);
						oView.byId("addlConsumedProgressId").setDisplayValue(oData.AdiConsProg);
						oView.byId("addlOperationActivityId").setText(oData.AdiOperation);
						oView.byId("addlItemNoOfReservationId").setText(oData.AdiRspos);
						oView.byId("addlrequiredQuantityBuomId").setText(oData.AdiReqQuan);
						oView.byId("addlrequiredQuantityUnitId").setText(oData.AdiReqUom);*/

					sap.ui.core.BusyIndicator.hide();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				}

			});

		},

		//open manufacture details - for manufature number hyperlink
		onManufacturePress: function (oEvent) {
			console.log("Inside manufacture link press");

			var urlValue = window.location.href;
			var urlHostname = window.location.hostname;
			var urlPort = window.location.port;

			var urlAppend = "https://" + urlHostname + ":" + urlPort + "/ui2/nwbc";
			//window.location();

			window.open(urlAppend);

		},

		//Read  Consumtion service

		getConsumption: function () {
			messageArray = [];
			var oModel = this.getOwnerComponent().getModel("consumptionModel");
			globalModel = oModel;
			var oManualEntryModel;
			var oTable = this.getView().byId("consumptionTable");
			//Read values to variables

			var manufacturingOrder = sap.ui.getCore().getModel("settingsDefaultModel").oData.manufacturingOrder;
			var handlingUnitvalue = sap.ui.getCore().getModel("settingsDefaultModel").oData.handlingUnitvalue;
			var uomValue = sap.ui.getCore().getModel("settingsDefaultModel").oData.uomValue;
			var operation = sap.ui.getCore().getModel("settingsDefaultModel").oData.operation;
			var product = sap.ui.getCore().getModel("settingsDefaultModel").oData.product;
			var prodSupArea = sap.ui.getCore().getModel("settingsDefaultModel").oData.prodSupArea;
			var quantityProduced = sap.ui.getCore().getModel("settingsDefaultModel").oData.quantityProduced;
			var warehouse = sap.ui.getCore().getModel("settingsDefaultModel").oData.warehouse;

			// var manuOrder = "1000443";
			// var operation = "0010";
			// var materNo = "3008040";
			// var prodSupArea = "PSA-P100 /4110";
			// var quanProd = "4A10";
			// var handlingUnit = "112345678000012066";

			var manuOrder = manufacturingOrder;
			var operation = operation;
			//var materNo = "3008040";
			var prodSupArea = prodSupArea;
			var quanProd = quantityProduced;
			var handlingUnit = handlingUnitvalue;
			var warehouse = warehouse;
			var uom = uomValue;
			//logic to handle blank quantity produced field
			// if (quanProd === "") {
			// 	quanProd = "0";

			// }
			var aFilterData = [];
			var manuOrderFilter = new sap.ui.model.Filter("MfgOrder", sap.ui.model.FilterOperator.EQ, manuOrder);
			var operationFilter = new sap.ui.model.Filter("Operation", sap.ui.model.FilterOperator.EQ, operation);
			var productFilter = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, product);
			var prodSupAreaFilter = new sap.ui.model.Filter("Psa", sap.ui.model.FilterOperator.EQ, prodSupArea);
			var quanProdFilter = new sap.ui.model.Filter("QtyTobeProduced", sap.ui.model.FilterOperator.EQ, quanProd);
			var handlingUnitFilter = new sap.ui.model.Filter("Huident", sap.ui.model.FilterOperator.EQ, handlingUnit);
			var uomFilter = new sap.ui.model.Filter("QtyProducedUOM", sap.ui.model.FilterOperator.EQ, uom);
			var wareHouseFilter = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ, warehouse);
			//Check if filter has a value and according send to to service
			var filters = [manuOrderFilter, operationFilter, handlingUnitFilter, quanProdFilter, uomFilter, prodSupAreaFilter, wareHouseFilter,
				productFilter
			];
			var useFilters = filters.filter(function (item) {
				return item.oValue1 !== null && item.oValue1 !== undefined && item.oValue1 !== '';
			});

			//	aFilterData.push(manuOrderFilter,operationFilter,materNoFilter,varquanProdFilter,handlingUnitFilter);
			//	aFilterData.push(manuOrderFilter,operationFilter,materNoFilter,prodSupAreaFilter,handlingUnitFilter,varquanProdFilter);

			var that = this;
			var oView = this.getView();
			var arrayValue = [];
			//	sap.ui.core.BusyIndicator.show();
			//	var oFilter3 = new sap.ui.model.Filter([manuOrderFilter,operationFilter,materNoFilter,prodSupAreaFilter,handlingUnitFilter,varquanProdFilter], true);

			//aFilterData.push(oFilter3);

			// aFilterData.push(new Filter({
			// 			filters: [

			// 			oFilter3	

			// 			],
			// 			and: true
			// 		}));

			var that = this;
			var oView = this.getView();
			var arrayValue = [];
			sap.ui.core.BusyIndicator.show();
			oModel.read("/StockForConsumptionSet", {

				success: function (oData, Response) {

					var orderModel = new sap.ui.model.json.JSONModel();
					oView.setModel(orderModel, "stockConsModel");
					oView.getModel("stockConsModel").setProperty("/stockConsSet", oData.results);
					//	oTable.selectAll();
					//logic to select consumption quantity to selected on navigation
					// that.getView().byId("consumptionQuantityId").setSelected(true);
					// that.consQuanSel();
var serverMessage = Response.headers["sap-message"];
				if(serverMessage === undefined) {
 messageArray.push("No");

					}

					else{

				//	var serverMessage = Response.headers["sap-message"];

					// 							var messageValue =	sap.ui.getCore().getMessageManager().getMessageModel().getData();

					// 							var messagevalue1 = messageValue[0].message;
					// console.log("Message from server", messageValue);
					// 								//var str = "Visit W3Schools!";

					// var res = messagevalue1.slice(10, 25);

					messageArray.push(JSON.parse(serverMessage).details); 
						
						
					}

					oTable.getItems().forEach(function (item) {

						if (item.getCells()[27].getValue() > 0) {
							item.addStyleClass("overdueRow");

						}
					});

					sap.ui.core.BusyIndicator.hide();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				},
				//	filters: [manuOrderFilter, varquanProdFilter,operationFilter,materNoFilter,handlingUnitFilter]
				//	filters: [manuOrderFilter, varquanProdFilter]
				filters: useFilters
					//	filters: [manuOrderFilter, operationFilter, handlingUnitFilter, quanProdFilter, uomFilter, prodSupAreaFilter, wareHouseFilter,productFilter]
					//	filters: [manuOrderFilter, operationFilter, handlingUnitFilter, quanProdFilter, uomFilter]
			});

			//logic to fetch the list of additional information

			var manuOrder = sap.ui.getCore().getModel("settingsDefaultModel").oData.manufacturingOrder;

			var quanProd = sap.ui.getCore().getModel("settingsDefaultModel").oData.warehouse;

			var oModel = this.getOwnerComponent().getModel("consumptionModel");

			oModel.read("/HandlUnitStockSet(Lgnum='" + quanProd + "',MfgOrder='" + manuOrder + "')", {

				success: function (oData, Response) {

					//Additional manufacturing order information

					oView.byId("addlFinishedProdId").setText(oData.AdiMatnr);
					oView.byId("addlDescriptionId").setText(oData.CatTxt);
					oView.byId("addlManufOrderId").setText(oData.AdiMfgOrder);
					
					//Display Quantity warning
					that._onserverMessageDisplay();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function for additional information");
				}

			});

		},

		//Quantity warning message popup

		_onserverMessageDisplay: function (oEvent) {

			if ( messageArray[0] === "No"){

				console.log("No action");
			}

			else{

			if (!this._oDialog) {
				//	this._oDialog = sap.ui.xmlfragment("com.bp.lubescustfinancial.fragments.OrderChangeHx", this);
				this._oDialog = sap.ui.xmlfragment("sap.com.postconsumption.postConsumption.fragments.serverMessage", this);
			}

			this.getView().addDependent(this._oDialog);
			this._oDialog.open();

			var messageArray2 = [];
			for (var m = 0; m < messageArray[0].length; m++) {

				messageArray2.push(messageArray[0][m]);

			}
			
				var messageModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(messageModel, "messageModel");
			this.getView().getModel("messageModel").setProperty("/messageSet", messageArray2);
			sap.ui.core.BusyIndicator.hide();
			}

		},

		handleClose: function (oEvent) {
			/* This function closes the dialog box */
			if (this._oDialog) {

				this._oDialog.close();
			}
		},

		//confirm post from user:
		confirmPost: function (oEvent) {

			var consTableLength = this.getView().byId("consumptionTable").getItems();
			var oModel = this.getView().getModel("consumptionModel");
			var aSelectedItems = [];
			var selectedArray = [];
			var that = this;
			if (consTableLength.length > 0) {

				var aItems = this.getView().byId('consumptionTable').getItems();
				var aSelectedItems = [];
				for (var i = 0; i < aItems.length; i++) {
					if (aItems[i].getSelected()) {
						aSelectedItems.push(aItems[i]);
					}
				}

				consTableLength.forEach(function (oItem) {

					var selectedValue = oItem.oBindingContexts.stockConsModel.sPath;
					var tableValue = oEvent.getSource().getModel("stockConsModel").getProperty(selectedValue);
					//	var serverMessage;
					if (oItem.getCells()[27].getValue() > 0) {
						selectedArray.push(tableValue);

					}

					//logic to give highlighted color to table rows having Invoice reversal and revenue invoice not blank value

				});

				var aCreateDocPayload = selectedArray;
				oModel.setDeferredGroups(["PostConsumptionBatch"]);
				oModel.setUseBatch(true);
				//	var aCreateDocPayload = selectedArray;
				var that = this;

				var that = this;
				MessageBox.show("Please Confirm to Post consumption", {
					icon: MessageBox.Icon.INFORMATION,
					title: "Dear User",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction == "YES") {

							sap.ui.core.BusyIndicator.show();

							//////////////////////

							var mParameter = {

								urlParameters: null,
								groupId: "PostConsumptionBatch",
								success: function (oData, oRet) {

									var serverMessage = oRet.headers["sap-message"];

									//	console.log("Message from server", serverMessage);
									console.log("Inside mparameter success");
									sap.ui.core.BusyIndicator.hide();
									//This success handler will only be called if batch support is enabled. 
									//If multiple batch groups are submitted the handlers will be called for every batch group.

								},
								error: function (oError) {
									console.log("Inside mparameter error");
									sap.ui.core.BusyIndicator.hide();

								}
							};

							var singleentry = {
								groupId: "PostConsumptionBatch",
								urlParameters: null,
								success: function (oData, oRet) {
									console.log("Inside singleentry success");
									//The success callback function for each record

									var serverMessage = oRet.headers["sap-message"];

									if (serverMessage === undefined) {
										console.log("Inside if block for message toast");

									} else {

										console.log("Inside else block for message toast");

									}
									//Message box for post consumption success
									MessageBox.show("Consumption posted sucessfully. YES button will navigate you to the previous screen", {
										icon: MessageBox.Icon.SUCCESS,
										title: "Dear User",
										actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
										onClose: function (oAction) {
											if (oAction == "YES") {

												that.onNavBack();
											}
										}.bind(this)
									});
									that.getConsumption();

								},
								error: function (oError) {
									console.log("Inside singleentry error");
									//Message box for post consumption success

									MessageBox.show("Error in posting consumption", {
										icon: MessageBox.Icon.ERROR,
										title: "Dear User",
										actions: [sap.m.MessageBox.Action.OK],

									});
									//The error callback function for each record
								}

							};

							for (var m = 0; m < aCreateDocPayload.length; m++) {
								//oModel.create("/DeliverySet", aCreateDocPayload[m], mParameters);

								singleentry.properties = aCreateDocPayload[m];
								singleentry.changeSetId = "changeset " + m;
								oModel.createEntry("/StockForConsumptionSet", singleentry);

							}
							oModel.submitChanges(mParameter);

							console.log("Inside table length", aSelectedItems);

							////////////////////

							console.log("Inside confirm Yes")
						}
					}.bind(this)
				});

			} else {
				MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tableLengthMessage"));
				console.log("Outside table length");
			}

		},

		//Post consumption functionality - Not used
		onPostConsumption: function (oEvent) {
			//	var consTableLength = this.getView().byId("consumptionTable").getSelectedItems();
			var consTableLength = this.getView().byId("consumptionTable").getItems();
			var oModel = this.getView().getModel("consumptionModel");
			var aSelectedItems = [];
			var selectedArray = [];
			var that = this;
			if (consTableLength.length > 0) {

				var aItems = this.getView().byId('consumptionTable').getItems();
				var aSelectedItems = [];
				for (var i = 0; i < aItems.length; i++) {
					if (aItems[i].getSelected()) {
						aSelectedItems.push(aItems[i]);
					}
				}

				sap.ui.core.BusyIndicator.show();

				consTableLength.forEach(function (oItem) {

					var selectedValue = oItem.oBindingContexts.stockConsModel.sPath;
					var tableValue = oEvent.getSource().getModel("stockConsModel").getProperty(selectedValue);
					//	var serverMessage;
					if (oItem.getCells()[27].getValue() > 0) {
						selectedArray.push(tableValue);

					}

					//logic to give highlighted color to table rows having Invoice reversal and revenue invoice not blank value

				});

				var aCreateDocPayload = selectedArray;
				oModel.setDeferredGroups(["PostConsumptionBatch"]);
				oModel.setUseBatch(true);
				//	var aCreateDocPayload = selectedArray;
				var that = this;

				//code to pass matid as blank to backend for post

				// 						for(var k=0;k<aCreateDocPayload.length;k++){
				// aCreateDocPayload[k].Matid="";

				// 						}

				// 				var PADDING = "00000000"

				// var string = "TEST"
				// var resultArray = []

				// for (var i = 0; i < string.length; i++) {
				//   var compact = string.charCodeAt(i).toString(2)
				//   var padded  = compact.substring(0, PADDING.length - compact.length) + compact

				//   resultArray.push(padded)
				// }

				// console.log(resultArray.join(" "))

				var mParameter = {

					urlParameters: null,
					groupId: "PostConsumptionBatch",
					success: function (oData, oRet) {

						var serverMessage = oRet.headers["sap-message"];

						//	console.log("Message from server", serverMessage);
						console.log("Inside mparameter success");
						sap.ui.core.BusyIndicator.hide();
						//This success handler will only be called if batch support is enabled. 
						//If multiple batch groups are submitted the handlers will be called for every batch group.

					},
					error: function (oError) {
						console.log("Inside mparameter error");
						sap.ui.core.BusyIndicator.hide();

					}
				};

				var singleentry = {
					groupId: "PostConsumptionBatch",
					urlParameters: null,
					success: function (oData, oRet) {
						console.log("Inside singleentry success");
						//The success callback function for each record

						var serverMessage = oRet.headers["sap-message"];

						if (serverMessage === undefined) {
							console.log("Inside if block for message toast");

						} else {

							console.log("Inside else block for message toast");

						}

						MessageToast.show("Consumption posted successfully");
						that.getConsumption();

					},
					error: function (oError) {
						console.log("Inside singleentry error");
						MessageToast.show("Error");
						//The error callback function for each record
					}

				};

				for (var m = 0; m < aCreateDocPayload.length; m++) {
					//oModel.create("/DeliverySet", aCreateDocPayload[m], mParameters);

					singleentry.properties = aCreateDocPayload[m];
					singleentry.changeSetId = "changeset " + m;
					oModel.createEntry("/StockForConsumptionSet", singleentry);

				}
				oModel.submitChanges(mParameter);

				console.log("Inside table length", aSelectedItems);
			} else {
				MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tableLengthMessage"));
				console.log("Outside table length");
			}

		},

		// on selection of consumption quantity radio button - Not used

		consQuanSel: function (oEvent) {
			/*		this.getView().byId("consumptionQuantityId").setEnabled(true);
					var oTable = this.getView().byId("consumptionTable");
					var aItems = oTable.getItems();
					for (var i = 0; i < aItems.length; i++) {
						aItems[i].getCells()[27].setEditable(aItems[i].getSelected());
						aItems[i].getCells()[28].setEditable(false);
					}*/

		},

		//livechange event for consumption quantity field
		onQuanConsChangeLive: function (oEvent) {
			var oTable = this.getView().byId("consumptionTable");
			this.globalQuanValue = "X";
			var rowIndex = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
			var consQuanValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[27].getValue();
			var prodSupAreavalue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[2].getText();
			var substractVal = parseFloat(prodSupAreavalue - consQuanValue);
			var iTempTotRemaining = substractVal.toFixed(3);

			var oRemainingValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[28];
			oRemainingValue.setValue(iTempTotRemaining);

			/*oTable.getItems().forEach(function (item) {

				if (item.getCells()[27].getValue() > 0) {
					item.addStyleClass("overdueRow");

				}
			}); */

			if (consQuanValue > 0) {
				this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].removeStyleClass("overdueRow");
				this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].addStyleClass("overdueRow");

			} else {
				this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].removeStyleClass("overdueRow");

			}

		},

		//livechange event for consumption quantity field
		onQuanRemChangeLive: function (oEvent) {
			var oTable = this.getView().byId("consumptionTable");
			var rowIndex = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
			var consRemValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[28].getValue();
			var prodSupAreavalue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[2].getText();
			var substractVal = parseFloat(prodSupAreavalue - consRemValue);
			var iTempTotRemaining = substractVal.toFixed(3);

			var oRemainingValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[27];
			oRemainingValue.setValue(iTempTotRemaining);

			oTable.getItems().forEach(function (item) {

				if (item.getCells()[27].getValue() > 0) {
					item.addStyleClass("overdueRow");

				}

			});

		},

		// on selection of consumption quantity radio button - not used

		remQuanSel: function (oEvent) {
			/*	this.getView().byId("remainingQuantityId").setEnabled(true);
				var oTable = this.getView().byId("consumptionTable");
				var aItems = oTable.getItems();
				for (var i = 0; i < aItems.length; i++) {
					aItems[i].getCells()[28].setEditable(aItems[i].getSelected());
					aItems[i].getCells()[27].setEditable(false);
				}*/

		},

		// on selection of restriced use checkbox - not used

		restUseSel: function (oEvent) {
			//	this.getView().byId("remainingQuantityId").setEnabled(true);
			var oTable = this.getView().byId("consumptionTable");
			var aItems = oTable.getItems();
			// for (var i = 0; i < aItems.length; i++) {
			// 	aItems[i].getCells()[8].setText(aItems[i].getSelected());
			// }

			console.log("Inside restricted use");

		},

		//Function to handle change in quantity - not used
		onQuanConsChange: function (oEvent) {

			console.log("Inside Quantity change");
			//logic to calculate difference between Quantity in PSA and quantity remaining
			// 			var selectionCheck = this.getView().byId("consumptionTable").getSelectedItem();
			// 			var consQuanValue = selectionCheck.mAggregations.cells[27].getValue();
			// 			var prodSupAreavalue = selectionCheck.mAggregations.cells[2].getText();
			// 			var substractVal = parseFloat(prodSupAreavalue - consQuanValue);
			// 			var sPath = oEvent.oSource.oPropagatedProperties.oBindingContexts.stockConsModel.sPath;
			//           var initialvalue =  oEvent.oSource.oPropagatedProperties.oBindingContexts.stockConsModel.oModel.getProperty(sPath).ConsQuanaRem;
			// 			//	var	iTempTotRemaining = Math.ceil(parseFloat(prodSupAreavalue - consQuanValue));
			// 			var iTempTotRemaining = substractVal.toFixed(3);
			// //initialvalue.setValue(iTempTotRemaining);
			// 			var selectedRow = selectionCheck.mAggregations.cells[28].setValue(iTempTotRemaining);
			this.globalQuanValue = "X";
			var rowIndex = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
			var consQuanValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[27].getValue();
			var prodSupAreavalue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[2].getText();
			var substractVal = parseFloat(prodSupAreavalue - consQuanValue);
			var iTempTotRemaining = substractVal.toFixed(3);

			var oRemainingValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[28];
			oRemainingValue.setValue(iTempTotRemaining);
		},

		//Function to handle change in Remaining Quantity - not used
		onQuanRemChange: function (oEvent) {

			// var rowIndex = oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
			// var consRemValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[28].getValue();
			// var prodSupAreavalue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[2].getText();
			// var substractVal = parseFloat(prodSupAreavalue - consRemValue);
			// var iTempTotRemaining = substractVal.toFixed(3);

			// var oRemainingValue = this.getView().byId("consumptionTable").getAggregation("items")[rowIndex].getAggregation("cells")[27];
			// oRemainingValue.setValue(iTempTotRemaining);
		},

		// Export to excel

		_onDataExport: function (oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),

				// Pass in the model created above
				models: this.getView().getModel("stockConsModel"),

				// binding information for the rows aggregation
				rows: {
					path: "/stockConsSet"
				},

				// column definitions with column name and binding info for the content

				columns: [{
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("handlingUnit"),
						template: {
							content: "{Huident}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("prodConsumption"),
						template: {
							content: "{Matnr}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockProd"),
						template: {
							content: "{Quan}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("auom"),
						template: {
							content: "{Altme}"

						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("description"),
						template: {
							content: "{Maktx}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("batch"),
						template: {
							content: "{Charg}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("shelfLife"),
						template: {
							content: "{Vfdat}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("originCountry"),
						template: {
							content: "{Coo}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("restrictedUse"),
						template: {
							content: "{Brestr}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockType"),
						template: {
							content: "{Cat}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockTypeDesc"),
						template: {
							content: "{CatTxt}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("supplyAreaProd"),
						template: {
							content: "{Psa}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("storageBin"),
						template: {
							content: "{Lgpla}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("owner"),
						template: {
							content: "{Owner}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("valuation"),
						template: {
							content: "{Cwquan}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("valuationUnit"),
						template: {
							content: "{Cwunit}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("valuationMeasured"),
						template: {
							content: "{Cwexact}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("type"),
						template: {
							content: "{StockDoccat}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("salesOrder"),
						template: {
							content: "{StockDocno}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("salesOrderItem"),
						template: {
							content: "{StockItmno}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("baseUnitMeasure"),
						template: {
							content: "{Unit}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("operationActivity"),
						template: {
							content: "{Operation}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ownerRole"),
						template: {
							content: "{OwnerRole}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("partyEntitled"),
						template: {
							content: "{Entitled}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockIdentification"),
						template: {
							content: "{Idplate}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockProdSupply"),
						template: {
							content: "{Quana}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("storageType"),
						template: {
							content: "{Lgtyp}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("quantityConsume"),
						template: {
							content: "{ConsQuana}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("quantityPSA"),
						template: {
							content: "{ConsQuanaRem}"
						}
					}

				]
			});

			// download exported file
			oExport.saveFile().catch(function (oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n");
			}).then(function () {
				oExport.destroy();
			});
		},

		//Consumption table search

		onSearchConsumption: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var handlingUnitFilter = new Filter("Huident", FilterOperator.EQ, sQuery);
				var prodConsumptionFilter = new Filter("Matnr", FilterOperator.EQ, sQuery);
				var stockProdSupFilter = new Filter("Quan", FilterOperator.EQ, sQuery);
				var auomFilter = new Filter("Altme", FilterOperator.EQ, sQuery);
				var descriptionFilter = new Filter("Maktx", FilterOperator.EQ, sQuery);

				var batchFilter = new Filter("Charg", FilterOperator.EQ, sQuery);
				var shelfLifeFilter = new Filter("Vfdat", FilterOperator.EQ, sQuery);
				var countryOriginFilter = new Filter("Coo", FilterOperator.EQ, sQuery);
				var restrictedUseFilter = new Filter("Brestr", FilterOperator.EQ, sQuery);
				var stockTypeFilter = new Filter("Cat", FilterOperator.EQ, sQuery);

				var stockTypeDescFilter = new Filter("CatTxt", FilterOperator.EQ, sQuery);
				var prodSupAreaFilter = new Filter("Psa", FilterOperator.EQ, sQuery);
				var storageBinFilter = new Filter("Lgpla", FilterOperator.EQ, sQuery);
				var ownerFilter = new Filter("Owner", FilterOperator.EQ, sQuery);
				var valuationQuanFilter = new Filter("Cwquan", FilterOperator.EQ, sQuery);

				var valuationUnitFilter = new Filter("Cwunit", FilterOperator.EQ, sQuery);
				var valuationMeasFilter = new Filter("Cwexact", FilterOperator.EQ, sQuery);
				var typeFilter = new Filter("StockDoccat", FilterOperator.EQ, sQuery);
				var salesOrderFilter = new Filter("StockItmno", FilterOperator.EQ, sQuery);
				var salesOrdItemFilter = new Filter("StockItmno", FilterOperator.EQ, sQuery);

				var baseUOMFilter = new Filter("Unit", FilterOperator.EQ, sQuery);
				var operatioActFilter = new Filter("Operation", FilterOperator.EQ, sQuery);
				var ownerRoleFilter = new Filter("OwnerRole", FilterOperator.EQ, sQuery);
				var partyEntitledFilter = new Filter("Entitled", FilterOperator.EQ, sQuery);
				var stockIdenFilter = new Filter("Idplate", FilterOperator.EQ, sQuery);

				var stockProdBUOMFilter = new Filter("Quana", FilterOperator.EQ, sQuery);
				var storageTypeFilter = new Filter("Lgtyp", FilterOperator.EQ, sQuery);
				var quantityConsumeFilter = new Filter("ConsQuana", FilterOperator.EQ, sQuery);
				var quanPSAFilter = new Filter("ConsQuanaRem", FilterOperator.EQ, sQuery);

				var oFilter = new Filter([handlingUnitFilter, prodConsumptionFilter, stockProdSupFilter, auomFilter, descriptionFilter,
					batchFilter, shelfLifeFilter, countryOriginFilter, restrictedUseFilter, stockTypeFilter, stockTypeDescFilter,
					prodSupAreaFilter, storageBinFilter, ownerFilter, valuationQuanFilter, valuationUnitFilter, valuationMeasFilter,
					typeFilter, salesOrderFilter, salesOrdItemFilter, baseUOMFilter, operatioActFilter, ownerRoleFilter, partyEntitledFilter,
					stockIdenFilter, stockProdBUOMFilter, storageTypeFilter, quantityConsumeFilter, quanPSAFilter
				]);

				// aFilters.push(handlingUnitFilter,prodConsumptionFilter,stockProdSupFilter,auomFilter,descriptionFilter,
				// batchFilter,shelfLifeFilter,countryOriginFilter,restrictedUseFilter,stockTypeFilter,stockTypeDescFilter,
				// prodSupAreaFilter,storageBinFilter,ownerFilter,valuationQuanFilter,valuationUnitFilter,valuationMeasFilter,
				// typeFilter,salesOrderFilter,salesOrdItemFilter,baseUOMFilter,operatioActFilter,ownerRoleFilter,partyEntitledFilter,
				// stockIdenFilter,stockProdBUOMFilter,storageTypeFilter,quantityConsumeFilter,quanPSAFilter);
			}

			// update list binding
			var oList = this.byId("consumptionTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(oFilter, "Application");
		},

		//logic to format shelf life expiration date
		formatterDateShelfLife: function (date) {
			if (date !== "" && date !== null && date !== undefined) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "dd.MM.yyyy",
					UTC: false
				});
				return oDateFormat.format(new Date(date));

			}
			return date;
		},

		//logic to make quantiyy field editable based on PSA - Not used
		onFormatQuantity: function (quantity) {
			// if (this.globalQuanValue === "X") {

			// 	return true;

			// 	this.globalQuanValue = "";

			// } else {

			// 	if (quantity > 0) {

			// 		return true;
			// 	} else {

			// 		return false;
			// 	}

			// }
		},

		//logic to set row selected based on quantity  - Not used

		onModelContextChange: function (oEvent) {
			// var sId = oEvent.getParameter("id");
			// var tbl = sap.ui.getCore().byId(sId);
			// var header = tbl.$().find('thead');
			// var selectAllCb = header.find('.sapMCb');
			// selectAllCb.remove();

			// tbl.getItems().forEach(function (r) {
			//     var obj = r.getBindingContext("dataModel").getObject();
			//     var oStatus = obj.checkDuplicate; 
			//     var cb = r.$().find('.sapMCb');
			//     var oCb = sap.ui.getCore().byId(cb.attr('id'));
			//     if (oStatus == "true") {
			//         oCb.setEnabled(true);
			//     } else {
			//         oCb.setEnabled(false);
			//     }
			// });
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.com.postconsumption.postConsumption.view.postConsumption
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.com.postconsumption.postConsumption.view.postConsumption
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.com.postconsumption.postConsumption.view.postConsumption
		 */
		//	onExit: function() {
		//
		//	}

	});

});