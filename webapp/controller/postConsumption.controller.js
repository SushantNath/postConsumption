sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
			"sap/m/TablePersoController"
], function (Controller,History,TablePersoController) {
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