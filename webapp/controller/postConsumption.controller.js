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
], function (Controller,History,TablePersoController,Export,ExportTypeCSV,MessageBox,Filter,FilterOperator,MessageToast,JSONModel,Formatter) {
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
 var oPersId = {container: "mycontainer-1", item: "myitem-1"};

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
			
			 //var aIndices = oEvent.getSource().getSelectedIndices(),
    //         myData = this.getView().getModel().getProperty("/data"),
    //         that = this;
        
    //     $.each(myData,function(i, v){
    //         that.getView().getModel().setProperty("/data/" + v + "/isEnabled", false);
    //     });
    //     $.each(aIndices,function(i, v){
    //         that.getView().getModel().setProperty("/data/" + v + "/isEnabled", true);
    //     });
    
			
		// 	this.getView().byId("consumptionTable").getItems().forEach(function (item) {
		// 					//	if (item.getCells()[8].getText() === "Completely processed") {
		// 					if (item.getCells()[6].getText() !== "" || item.getCells()[7].getText() !== "") {
		// 						item.getCells()[27].setEnabled(true);
		// 					}
		// 				});
				
		// //	this.oTablePersoController.openDialog();
		// },
			
		//	this.oTablePersoController.openDialog();
		},
		
		//open manufacture details
		onManufacturePress: function (oEvent) {
			console.log("Inside manufacture link press");
		
		},
		
		
		
		//Read  Consumtion service
		
		getConsumption: function () {
		
				var oModel = this.getOwnerComponent().getModel();
					globalModel=oModel;
			var that = this;
			var oView = this.getView();
			sap.ui.core.BusyIndicator.show();
				oModel.read("/Invoices", {

				success: function (oData, Response) {

					var orderModel = new sap.ui.model.json.JSONModel();
					oView.setModel(orderModel, "shipToModel");
					oView.getModel("shipToModel").setProperty("/ShipToPartySet", oData.results);
					sap.ui.core.BusyIndicator.hide();
					// var immInvoiceModel = new sap.ui.model.json.JSONModel(oData);
					// 	that.getView().setModel(immInvoiceModel, "immInvoiceData");
					// 	immInvoiceModel.setProperty("/immInvoiceSet", oData.results);
	sap.ui.core.BusyIndicator.hide();
					console.log("Inside Success function", oData.results);
				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				}

			});
			
		},
		
		//Post consumption functionality
		onPostConsumption: function(oEvent) {
				var consTableLength = this.getView().byId("consumptionTable").getSelectedItems();
				
				
			
				
				var aSelectedItems = [];
				var selectedArray = [];
					if (consTableLength.length > 0) {
						
						
							var aItems = this.getView().byId('consumptionTable').getItems();
var aSelectedItems = [];
for (var i=0; i<aItems.length;i++) {
     if (aItems[i].getSelected()) {
          aSelectedItems.push(aItems[i]);
     }
}
						
					// 	consTableLength.forEach(function (oItem) {

					// 	var selectedValue = oItem.oBindingContexts.shipToModel.sPath;
					// 	var tableValue = oEvent.getSource().getModel().getProperty(selectedValue);
					// //	globalModel;
					// 	//	var serverMessage;
					
					// 	selectedArray.push(tableValue);


					// });
						
						
						console.log("Inside table length",aSelectedItems);
					}
					
					else{
							MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tableLengthMessage"));
						console.log("Outside table length");
					}
			
		},
		
		// on selection of consumption quantity radio button
		
		consQuanSel: function(oEvent) {
				this.getView().byId("consumptionQuantityId").setEnabled(true);
				var oTable = this.getView().byId("consumptionTable");
      var aItems = oTable.getItems();
      for (var i = 0; i < aItems.length; i++) {
         aItems[i].getCells()[27].setEditable(aItems[i].getSelected());
      }
	
		},
		
		
			// on selection of consumption quantity radio button
		
		remQuanSel: function(oEvent) {
				this.getView().byId("remainingQuantityId").setEnabled(true);
				var oTable = this.getView().byId("consumptionTable");
      var aItems = oTable.getItems();
      for (var i = 0; i < aItems.length; i++) {
         aItems[i].getCells()[28].setEditable(aItems[i].getSelected());
      }
      
  		
		},
		
// Export to excel

	_onDataExport : function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					separatorChar : ";"
				}),

				// Pass in the model created above
				models : this.getView().getModel(),

				// binding information for the rows aggregation
				rows : {
					path : "/Invoices"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("handlingUnit"),
					template : {
						content : "{Name}"
					}
				}, {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("prodConsumption"),
					template : {
						content : "{ShipName}"
					}
				}, {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockProd"),
					template : {
						content : "{SupplierName}"
					}
				}, {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("auom"),
					template : {
						content : {
							parts : ["Width", "Depth", "Height", "DimUnit"],
							formatter : function(width, depth, height, dimUnit) {
								return width + " x " + depth + " x " + height + " " + dimUnit;
							},
							state : "Warning"
						}
					// "{Width} x {Depth} x {Height} {DimUnit}"
					}
				}, {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("description"),
					template : {
						content : "{WeightMeasure} {WeightUnit}"
					}
				}, {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("batch"),
					template : {
						content : "{Price} {CurrencyCode}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("shelfLife"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("originCountry"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("handlingUnit"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("restrictedUse"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockType"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockTypeDesc"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("supplyAreaProd"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("storageBin"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("owner"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("valuation"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("valuationUnit"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("valuationMeasured"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("type"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("salesOrder"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("salesOrderItem"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("baseUnitMeasure"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("operationActivity"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ownerRole"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("partyEntitled"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockIdentification"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("stockProdSupply"),
					template : {
						content : "{ShipName}"
					}
				},
				 {
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("storageType"),
					template : {
						content : "{ShipName}"
					}
				},
				{
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("quantityConsume"),
					template : {
						content : "{ShipName}"
					}
				},
				{
					name : this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("quantityPSA"),
					template : {
						content : "{ShipName}"
					}
				}
				
				]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
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
				
					var oFilter = new Filter([handlingUnitFilter,prodConsumptionFilter,stockProdSupFilter,auomFilter,descriptionFilter,
				batchFilter,shelfLifeFilter,countryOriginFilter,restrictedUseFilter,stockTypeFilter,stockTypeDescFilter,
				prodSupAreaFilter,storageBinFilter,ownerFilter,valuationQuanFilter,valuationUnitFilter,valuationMeasFilter,
				typeFilter,salesOrderFilter,salesOrdItemFilter,baseUOMFilter,operatioActFilter,ownerRoleFilter,partyEntitledFilter,
				stockIdenFilter,stockProdBUOMFilter,storageTypeFilter,quantityConsumeFilter,quanPSAFilter]);
				
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