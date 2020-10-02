sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/TablePersoController",
			'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',
		'sap/m/MessageBox',
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
], function (Controller,TablePersoController,Export,ExportTypeCSV,MessageBox,Filter,FilterOperator) {
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
		},
		
				//Reversal table search
		
			onSearchReversal: function (oEvent) {
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