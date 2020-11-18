sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/TablePersoController",
			'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',
		'sap/m/MessageBox',
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		'sap/m/MessageToast'
], function (Controller,TablePersoController,Export,ExportTypeCSV,MessageBox,Filter,FilterOperator,MessageToast) {
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


	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("reversalPosting").attachMatched(this._onRouteMatched, this);


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
           this.getReversal();
			console.log("Passed values are", manufacturingOrder,handlingUnitvalue,uomValue,operation,product,prodSupArea,quantityProduced);
		},
		
			//Personalisation button click event
		_onPersoReversalPressed: function (oEvent) {
			this._oTPC.openDialog();
		//	this.oTablePersoController.openDialog();
		},
		
			onNavBack: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteSettings", true);
		},
		
			onManufacturePress: function (oEvent) {
			console.log("Inside manufacture link press");

		//	var urlValue = window.location.href;
			var urlHostname = window.location.hostname;
			var urlPort = window.location.port;

			var urlAppend = "https://" + urlHostname + ":" + urlPort + "/ui2/nwbc";
			//window.location();

			window.open(urlAppend);

		},
		
						getReversal: function () {

			var oModel = this.getOwnerComponent().getModel("consumptionModel");
			// globalModel = oModel;
			// var oManualEntryModel;

			//Read values to variables
			
			var manufacturingOrder = sap.ui.getCore().getModel("settingsDefaultModel").oData.manufacturingOrder;
			var handlingUnitvalue = sap.ui.getCore().getModel("settingsDefaultModel").oData.handlingUnitvalue;
			var uomValue = sap.ui.getCore().getModel("settingsDefaultModel").oData.uomValue;
			var operation = sap.ui.getCore().getModel("settingsDefaultModel").oData.operation;
			var product = sap.ui.getCore().getModel("settingsDefaultModel").oData.product;
			var prodSupArea = sap.ui.getCore().getModel("settingsDefaultModel").oData.prodSupArea;
			var quantityProduced = sap.ui.getCore().getModel("settingsDefaultModel").oData.quantityProduced;
			var warehouse = sap.ui.getCore().getModel("settingsDefaultModel").oData.warehouse;
			
			var manuOrder = manufacturingOrder;
			var operation = operation;
			//var materNo = "3008040";
			var prodSupArea = prodSupArea;
			var quanProd = quantityProduced;
			var handlingUnit = handlingUnitvalue;
			var warehouse = warehouse;
			var uom = uomValue;
			var aFilterData = [];
			var manuOrderFilter = new sap.ui.model.Filter("MfgOrder", sap.ui.model.FilterOperator.EQ, manuOrder);
			var operationFilter = new sap.ui.model.Filter("Operation", sap.ui.model.FilterOperator.EQ, operation);
		//	var materNoFilter = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, materNo);
			var prodSupAreaFilter = new sap.ui.model.Filter("Psa", sap.ui.model.FilterOperator.EQ, prodSupArea);
			var quanProdFilter = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ, quanProd);
			var handlingUnitFilter = new sap.ui.model.Filter("Huident", sap.ui.model.FilterOperator.EQ, handlingUnit);
            var uomFilter = new sap.ui.model.Filter("QtyProducedUOM", sap.ui.model.FilterOperator.EQ, uom);
            var wareHouseFilter = new sap.ui.model.Filter("Lgnum", sap.ui.model.FilterOperator.EQ, warehouse);
			//	aFilterData.push(manuOrderFilter,operationFilter,materNoFilter,varquanProdFilter,handlingUnitFilter);
			//	aFilterData.push(manuOrderFilter,operationFilter,materNoFilter,prodSupAreaFilter,handlingUnitFilter,varquanProdFilter);

	//Check if filter has a value and according send to to service
			var filters = [manuOrderFilter, operationFilter, handlingUnitFilter, quanProdFilter, uomFilter,prodSupAreaFilter,wareHouseFilter];
			var useFilters = filters.filter(function (item) {
				return item.oValue1 !== null && item.oValue1 !== undefined && item.oValue1 !== '';
			});

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
			oModel.read("/ReversalConsumptionSet", {

				success: function (oData, Response) {

					// var orderModel = new sap.ui.model.json.JSONModel();
					// oView.setModel(orderModel, "stockConsModel");
					// oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);

					var orderModel = new sap.ui.model.json.JSONModel();
					oView.setModel(orderModel, "reverseConsModel");
					oView.getModel("reverseConsModel").setProperty("/reverseConsSet", oData.results);
					oView.byId("reversalQuanId").setEnabled(false);
					oView.byId("reversalQuanId").setValue("");

					sap.ui.core.BusyIndicator.hide();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				},
				//	filters: [manuOrderFilter, varquanProdFilter,operationFilter,materNoFilter,handlingUnitFilter]
			//	filters: [manuOrderFilter, varquanProdFilter]
				//filters: [manuOrderFilter,operationFilter,handlingUnitFilter,varquanProdFilter]
                 filters: useFilters
			});

		},
		
		
		//Export to Excel
		
			_onDataExportReversal: function (oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),

				// Pass in the model created above
				models: this.getView().getModel("reverseConsModel"),

				// binding information for the rows aggregation
				rows: {
					path: "/reverseConsSet"
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
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("consumedQuantityRev"),
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
					},
					
				/*	{
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
					}, */
					
					{
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
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("warehousenumber"),
						template: {
							content: "{Lgnum}"
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
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("consumedQuantityRev"),
						template: {
							content: "{Quan}"
						}
					}, {
						name: this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("manufOrder"),
						template: {
							content: "{MfgOrder}"
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
		
		//On reversal post
		
				//Post consumption functionality
				onReversal: function (oEvent) {
	//	onPostReversal: function (oEvent) {

		var revQuantityValue = this.getView().byId("reversalQuanId").getValue();

           var that = this;
			var consTableLength = this.getView().byId("reversalPostingTable").getSelectedItems();
			var oModel = this.getView().getModel("consumptionModel");
			var aSelectedItems = [];
			var selectedArray = [];
			if (consTableLength.length > 0 && revQuantityValue !== "" ) {

				var aItems = this.getView().byId('reversalPostingTable').getItems();
				var aSelectedItems = [];
				for (var i = 0; i < aItems.length; i++) {
					if (aItems[i].getSelected()) {
						aSelectedItems.push(aItems[i]);
					}
				}



//	var revQuantityValue = this.getView().byId("reversalQuanId").getValue();

				consTableLength.forEach(function (oItem) {

					var selectedValue = oItem.oBindingContexts.reverseConsModel.sPath;
					var tableValue = oEvent.getSource().getModel("reverseConsModel").getProperty(selectedValue);
					//	var serverMessage;
tableValue.RevQuana=revQuantityValue;
					selectedArray.push(tableValue);

				
				});
				


				var revQuantityValue= this.getView().byId("reversalQuanId").getValue();
                selectedArray.RevQuana=revQuantityValue;
                var compareRevvalue=  parseInt(revQuantityValue);
                var compareQuanValue =parseInt(selectedArray[0].Quan);
               
                
                if(compareRevvalue > compareQuanValue){

MessageToast.show("Please enter the reversal quantity less than the quantity consumed");
that.getView().byId("reversalQuanId").setValueState(sap.ui.core.ValueState.Error);
sap.ui.core.BusyIndicator.hide();
return;

}
that.getView().byId("reversalQuanId").setValueState(sap.ui.core.ValueState.None);
                	sap.ui.core.BusyIndicator.show();
				var aCreateDocPayload = selectedArray;
				oModel.setDeferredGroups(["ReversalConsumptionBatch"]);
				oModel.setUseBatch(true);
				//	var aCreateDocPayload = selectedArray;
				var that = this;

				//code to pass matid as blank to backend for post

				// 						for(var k=0;k<aCreateDocPayload.length;k++){
				// aCreateDocPayload[k].Matid="";

				// 						}

				var mParameter = {

					urlParameters: null,
					groupId: "ReversalConsumptionBatch",
					success: function (oData, oRet) {

						var serverMessage = oRet.headers["sap-message"];

						//	console.log("Message from server", serverMessage);
						console.log("Inside mparameter success");
						sap.ui.core.BusyIndicator.hide();
						

					},
					error: function (oError) {
						console.log("Inside mparameter error");
						sap.ui.core.BusyIndicator.hide();

					}
				};

				var singleentry = {
					groupId: "ReversalConsumptionBatch",
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

						MessageToast.show("Reversal done successfully");
                       that.getReversal();
					},
					error: function (oError) {
						console.log("Inside singleentry error");
						MessageToast.show("Error");
					}

				};

				for (var m = 0; m < aCreateDocPayload.length; m++) {
					//oModel.create("/DeliverySet", aCreateDocPayload[m], mParameters);

					singleentry.properties = aCreateDocPayload[m];
					singleentry.changeSetId = "changeset " + m;
					oModel.createEntry("/ReversalConsumptionSet", singleentry);

				}
				oModel.submitChanges(mParameter);

				console.log("Inside table length", aSelectedItems);
			///////////////
			

			}


			 else {
				MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tableLengthMessageRev"));
				console.log("Outside table length");
			}

		},
		
		
		//On select a stock
			onPressStock: function (oEvent) {

			//	var selectedvalue	= oEvent.getParameter("listItem").getBindingContext().getObject();
			var selectedValue = oEvent.getParameter("listItem").oBindingContexts.reverseConsModel.sPath;
			var tableValue = oEvent.getSource().getModel("reverseConsModel").getProperty(selectedValue);
			console.log("Inside press order number");
			this.getView().byId("reversalQuanId").setEnabled(true);
			// this.getView().byId("consumptionQuantityId").setEnabled(true);
			// this.getView().byId("remainingQuantityId").setEnabled(true);
			var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("consumptionModel");
		

		var manuOrder =  tableValue.MfgOrder;
			var quanProd =  tableValue.Lgnum;
			//var handlingUnit = "112345678000012066";
			var handlingUnit = tableValue.Huident;
			sap.ui.core.BusyIndicator.show();

			oModel.read("/HandlUnitStockSet(Lgnum='" + quanProd + "',Huident='" + handlingUnit + "',MfgOrder='" + manuOrder + "')", {

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
					oView.byId("addlConsumedQuantityId").setText(oData.AdiReqQuanGi);
                    oView.byId("addlConsumedQuantityUnitId").setText(oData.AdiReqUomGi);
					oView.byId("addlConsumedProgressId").setPercentValue(oData.AdiConsProg);
					oView.byId("addlConsumedProgressId").setDisplayValue(oData.AdiConsProg);
					oView.byId("addlOperationActivityId").setText(oData.AdiOperation);
					oView.byId("addlItemNoOfReservationId").setText(oData.AdiRspos);
					oView.byId("addlrequiredQuantityBuomId").setText(oData.AdiReqQuan);
					oView.byId("addlrequiredQuantityUnitId").setText(oData.AdiReqUom);

					sap.ui.core.BusyIndicator.hide();

				},

				error: function (oData, Response, oError) {
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Error function");
				}

			});

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
		
			//Reversal table search
		
			onSearchReversal: function (oEvent) {
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
				// var typeFilter = new Filter("ShipCity", FilterOperator.EQ, sQuery);
				// var salesOrderFilter = new Filter("ShipCity", FilterOperator.EQ, sQuery);
				// var salesOrdItemFilter = new Filter("ShipCity", FilterOperator.EQ, sQuery);
				
				var baseUOMFilter = new Filter("Unit", FilterOperator.EQ, sQuery);
				var operatioActFilter = new Filter("Operation", FilterOperator.EQ, sQuery);
				var warehouseFilter = new Filter("Lgnum", FilterOperator.EQ, sQuery);
				var partyEntitledFilter = new Filter("Entitled", FilterOperator.EQ, sQuery);
				var stockIdenFilter = new Filter("Idplate", FilterOperator.EQ, sQuery);
				
				var consumedQuanFilter = new Filter("Quan", FilterOperator.EQ, sQuery);
				var manuOrderFilter = new Filter("MfgOrder", FilterOperator.EQ, sQuery);
			
					var oFilter = new Filter([handlingUnitFilter,prodConsumptionFilter,stockProdSupFilter,auomFilter,descriptionFilter,
				batchFilter,shelfLifeFilter,countryOriginFilter,restrictedUseFilter,stockTypeFilter,stockTypeDescFilter,
				prodSupAreaFilter,storageBinFilter,ownerFilter,valuationQuanFilter,valuationUnitFilter,valuationMeasFilter,
			baseUOMFilter,operatioActFilter,warehouseFilter,partyEntitledFilter,
				stockIdenFilter,consumedQuanFilter,manuOrderFilter]);
				
			}

			// update list binding
			var oList = this.byId("reversalPostingTable");
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