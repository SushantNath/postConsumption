sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
			"sap/m/TablePersoController",
			'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',
		'sap/m/MessageBox',
				"sap/com/postconsumption/postConsumption/utilities/Formatter"
], function (Controller,History,TablePersoController,Export,ExportTypeCSV,MessageBox,Formatter) {
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
    table: this.getView().byId("productsTable"),
    persoService: oProvider
  // persoService: persoService
}).activate();


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
				}
				
				]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
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