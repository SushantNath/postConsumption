var globalModel;

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
	'sap/ui/model/json/JSONModel',
	"sap/com/postconsumption/postConsumption/utilities/Formatter"
], function (Controller, History, TablePersoController, Export, ExportTypeCSV, MessageBox, Filter, FilterOperator, MessageToast,
	JSONModel, Formatter) {
	"use strict";

	return Controller.extend("sap.com.postconsumption.postConsumption.controller.postConsumption", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.com.postconsumption.postConsumption.view.postConsumption
		 */
		onInit: function () {

			// 	//Get personalisation
			// 			this.oPersonalization = sap.ushell.Container.getService("Personalization");
			// 			if (this.oPersonalization) {
			// 				this.oConstants = this.oPersonalization.constants;
			// 			}

			// 	var oTableColmnPers = {};
			// 		oTableColmnPers = {
			// 					container: "lubesSelfOrders-Overview",
			// 					item: "selfOrder-item"
			// 				};

			// // Get a personalization service provider from the shell (or create your own)
			// 			var oTableColmnPersProvider = this.oPersonalization.getPersonalizer(oTableColmnPers);

			// 			//Initialise and Activate Table Column visibility Personalisation Controller
			// 			this._oTPC = new TablePersoController({
			// 				table: this.getView().byId("consumptionTable"),
			// 				componentName: "perso",
			// 				persoService: oTableColmnPersProvider
			// 			}).activate();

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

			this.getConsumption();

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

		// on selecta particular comsumption

		onPressOrderNumber: function (oEvent) {

			//	var selectedvalue	= oEvent.getParameter("listItem").getBindingContext().getObject();
			console.log("Inside press order number");
			this.getView().byId("restrictedUseId").setEnabled(true);
			this.getView().byId("consumptionQuantityId").setEnabled(true);
			this.getView().byId("remainingQuantityId").setEnabled(true);
            var oView= this.getView();
			var oModel = this.getOwnerComponent().getModel("consumptionModel");

			var manuOrder = "1000443";
			var quanProd = "4A10";
			var handlingUnit = "112345678000012066";
				sap.ui.core.BusyIndicator.show();
			
	oModel.read("/HandlUnitStockSet(Lgnum='"+ quanProd + "',Huident='" + handlingUnit + "',MfgOrder='" + manuOrder + "')", {


		success: function (oData, Response) {

			//	oView.byId("handlingTextId").setText(oData.Huident);
				oView.byId("handlingTextId").setText(oData.Huident);
				oView.byId("productConsumtionId").setText(oData.Matnr);
				oView.byId("batchId").setText(oData.Charg);
				oView.byId("shelfLifeId").setText(oData.Vfdat);
				oView.byId("descriptionId").setText(oData.Maktx);
				oView.byId("operationId").setText(oData.Operation);
				
			//Additional manufacturing order information
			
				oView.byId("addlFinishedProdId").setText(oData.AdiMatnr);
				oView.byId("addlDescriptionId").setText(oData.CatTxt);
				oView.byId("addlManufOrderId").setText(oData.AdiMfgOrder);
				oView.byId("addlRequirementStartId").setText(oData.AdiReqStartDate);
				oView.byId("addlReservationId").setText(oData.AdiRsnum);
				oView.byId("addlConsumedQuantityId").setText(oData.AdiReqUomGi);
				
				//	oView.byId("addlConsumedProgressId").setText(oData.Matnr);
				oView.byId("addlOperationActivityId").setText(oData.AdiOperation);
				oView.byId("addlItemNoOfReservationId").setText(oData.AdiRspos);
				oView.byId("addlrequiredQuantityBuomId").setText(oData.ReqUom);

					sap.ui.core.BusyIndicator.hide();

				
				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				}
					
			});
			


		},

		//open manufacture details
		onManufacturePress: function (oEvent) {
			console.log("Inside manufacture link press");

		},

		//Read  Consumtion service

		getConsumption: function () {

			var oModel = this.getOwnerComponent().getModel("consumptionModel");
			globalModel = oModel;
			var oManualEntryModel;

			//Read values tp variables
			var manuOrder = "1000443";
			var operation = "0010";
			var materNo = "3008040";
			var prodSupArea = "PSA-P100 /4110";
			var quanProd = "4A10";
			var handlingUnit = "112345678000012066";
			var aFilterData = [];
			var manuOrderFilter = new sap.ui.model.Filter("MfgOrder", sap.ui.model.FilterOperator.EQ, manuOrder);
			var operationFilter = new sap.ui.model.Filter("Operation", sap.ui.model.FilterOperator.EQ, operation);
			var materNoFilter = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, materNo);
			var prodSupAreaFilter = new sap.ui.model.Filter("Psa", sap.ui.model.FilterOperator.EQ, prodSupArea);
			var varquanProdFilter = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ, quanProd);
			var handlingUnitFilter = new sap.ui.model.Filter("Huident", sap.ui.model.FilterOperator.EQ, handlingUnit);

			//	aFilterData.push(manuOrderFilter,operationFilter,materNoFilter,varquanProdFilter,handlingUnitFilter);
			//	aFilterData.push(manuOrderFilter,operationFilter,materNoFilter,prodSupAreaFilter,handlingUnitFilter,varquanProdFilter);

			var that = this;
			var oView = this.getView();
			var arrayValue = [];
			sap.ui.core.BusyIndicator.show();
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

					// var orderModel = new sap.ui.model.json.JSONModel();
					// oView.setModel(orderModel, "stockConsModel");
					// oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);

					var orderModel = new sap.ui.model.json.JSONModel();
					oView.setModel(orderModel, "stockConsModel");
					oView.getModel("stockConsModel").setProperty("/stockConsSet", oData.results);

					sap.ui.core.BusyIndicator.hide();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				},
				filters: [handlingUnitFilter, manuOrderFilter, operationFilter, varquanProdFilter, materNoFilter]

			});

		},

		//Post consumption functionality
		onPostConsumption: function (oEvent) {
			var consTableLength = this.getView().byId("consumptionTable").getSelectedItems();

			var aSelectedItems = [];
			var selectedArray = [];
			if (consTableLength.length > 0) {

				var aItems = this.getView().byId('consumptionTable').getItems();
				var aSelectedItems = [];
				for (var i = 0; i < aItems.length; i++) {
					if (aItems[i].getSelected()) {
						aSelectedItems.push(aItems[i]);
					}
				}

				// 	consTableLength.forEach(function (oItem) {

				// 	var selectedValue = oItem.oBindingContexts.stockConsModel.sPath;
				// 	var tableValue = oEvent.getSource().getModel().getProperty(selectedValue);
				// //	globalModel;
				// 	//	var serverMessage;

				// 	selectedArray.push(tableValue);

				// });

				console.log("Inside table length", aSelectedItems);
			} else {
				MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tableLengthMessage"));
				console.log("Outside table length");
			}

		},

		// on selection of consumption quantity radio button

		consQuanSel: function (oEvent) {
			this.getView().byId("consumptionQuantityId").setEnabled(true);
			var oTable = this.getView().byId("consumptionTable");
			var aItems = oTable.getItems();
			for (var i = 0; i < aItems.length; i++) {
				aItems[i].getCells()[27].setEditable(aItems[i].getSelected());
			}

		},

		// on selection of consumption quantity radio button

		remQuanSel: function (oEvent) {
			this.getView().byId("remainingQuantityId").setEnabled(true);
			var oTable = this.getView().byId("consumptionTable");
			var aItems = oTable.getItems();
			for (var i = 0; i < aItems.length; i++) {
				aItems[i].getCells()[28].setEditable(aItems[i].getSelected());
			}

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
					},  {
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
							content: "{StockItmno}"
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
							content: "{Quan}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("storageType"),
						template: {
							content: "{Lgtyp}"
						}
					}
					// {
					// 	name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("quantityConsume"),
					// 	template: {
					// 		content: "{ShipName}"
					// 	}
					// }, {
					// 	name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("quantityPSA"),
					// 	template: {
					// 		content: "{ShipName}"
					// 	}
				//	}

				]
			});

			// download exported file
			oExport.saveFile().catch(function (oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
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
				var handlingUnitFilter = new Filter("ShipName", FilterOperator.Contains, sQuery);
				var prodConsumptionFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var stockProdSupFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var auomFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var descriptionFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);

				var batchFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var shelfLifeFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var countryOriginFilter = new Filter("ShipCountry", FilterOperator.Contains, sQuery);
				var restrictedUseFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var stockTypeFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);

				var stockTypeDescFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var prodSupAreaFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var storageBinFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var ownerFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var valuationQuanFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);

				var valuationUnitFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var valuationMeasFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var typeFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var salesOrderFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var salesOrdItemFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);

				var baseUOMFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var operatioActFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var ownerRoleFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var partyEntitledFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var stockIdenFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);

				var stockProdBUOMFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var storageTypeFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var quantityConsumeFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);
				var quanPSAFilter = new Filter("ShipCity", FilterOperator.Contains, sQuery);

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