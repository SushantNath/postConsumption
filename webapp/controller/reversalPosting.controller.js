sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/TablePersoController",
			'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',
		'sap/m/MessageBox'
], function (Controller,TablePersoController,Export,ExportTypeCSV,MessageBox) {
	"use strict";

	return Controller.extend("sap.com.postconsumption.postConsumption.controller.reversalPosting", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.com.postconsumption.postConsumption.view.reversalPosting
		 */
		onInit: function () {
			
				// Create a persistence key
 var oPersId = {container: "mycontainer-2", item: "myitem-2"};

// // Get a personalization service provider from the shell (or create your own)
var oProvider2 = sap.ushell.Container.getService("Personalization").getPersonalizer(oPersId);

// Instantiate a controller connecting your table and the persistence service
this._oTPC = new TablePersoController({
    table: this.getView().byId("reversalPostingTable"),
    persoService: oProvider2
  // persoService: persoService
}).activate();

		},
		
			//Personalisation button click event
		_onPersoReversalPressed: function (oEvent) {
			this._oTPC.openDialog();
		//	this.oTablePersoController.openDialog();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.com.postconsumption.postConsumption.view.reversalPosting
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.com.postconsumption.postConsumption.view.reversalPosting
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.com.postconsumption.postConsumption.view.reversalPosting
		 */
		//	onExit: function() {
		//
		//	}

	});

});