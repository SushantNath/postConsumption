var collectionSet;
var storedWarehouseValue;
var manufOrderNavigate;
var operationNavigate;
var handlingunitNavigate;
var productNavigate;
var prodSupplyNavigate;
var quanProdNavigate;
var uomNavigate;


sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/m/SearchField',
	'sap/ui/model/type/String',
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/Token',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
		"sap/ui/core/UIComponent",
		'sap/m/MessageToast'
], function (Controller,JSONModel,SearchField,typeString,ColumnListItem,Label,Token,Filter, FilterOperator,UIComponent,MessageToast) {
	"use strict";

	return Controller.extend("sap.com.postconsumption.postConsumption.controller.Settings", {
		onInit: function () {
			
				this.oColModel = new JSONModel(sap.ui.require.toUrl("sap/com/postconsumption/postConsumption/model") + "/columnsModel.json");
	this._oManuOrdInput = this.getView().byId("manuOrderId");
	
	var oModel = this.getView().getModel("revenueModel");
	
	var storagevalue = localStorage.getItem("warehouse");

	if(storagevalue === null){

		console.log("No warehouse value saved");
	}

	else{

var headerText= "Warehouse is :" + storagevalue;

this.getView().byId("page").setTitle(headerText);

this.byId("warehouseId").setValue(storagevalue);


	}
	
/*		oModel.read("/HTvfkSet", {

				success: function (oData, Response) {

					var orderModel = new sap.ui.model.json.JSONModel();
					oView.setModel(orderModel, "stockConsModel");
					oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);
					sap.ui.core.BusyIndicator.hide();
					collectionSet = oData.results;
					console.log("Inside Success function", oData.results);
				},

				error: function (oData, Response, oError) {
					console.log("Inside Error function");
				}

			});  */
	
	
	
		},
		
		
		//value help for Warehouse
				//value help for manufacturing order
			onValueHelpWarehouse: function() {
			
				this.loadWarehouse();
			var oView = this.getView();
			var that = this;

			// create value help dialog
			if (!this._valueHelpDialogWarehouse) {
				this._valueHelpDialogWarehouse = sap.ui.xmlfragment(
					this.getView().getId(), "sap.com.postconsumption.postConsumption.fragments.warehouse",
					this
				);

				this.getView().addDependent(this._valueHelpDialogWarehouse);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogWarehouse.open();	
				
			},
			
					loadWarehouse: function () {
			var oModel = this.getView().getModel("consumptionModel");
			var that = this;
			var oView = this.getView();
			// sap.ui.core.BusyIndicator.show();
			oModel.read("/scwm_shLgnumSet", {

				success: function (oData, Response) {

				

					var warehouseModel = new sap.ui.model.json.JSONModel();
					oView.setModel(warehouseModel, "warehouseModel");
					oView.getModel("warehouseModel").setProperty("/warehouseSet", oData.results);
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside warehouse success function", oData.results);
				},

				error: function (oData, Response, oError) {
					console.log("Inside Error function");
				}

			});

			// console.log("Inside Filter options");

		},
		
			//Code to hadle serach inside revenue invoice value help
		handleSearchWarehouse: function (oEvent) {
			var sValue = oEvent.getParameter("value");

			var filter1 = new Filter("Lgnum", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Lnumt", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			handleCloseWarehouse: function (oEvent) {

			var selectedWarehouse;

			var oMultiInputWarehouse = this.byId("warehouseId");
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				aContexts.forEach(function (oItem) {

					selectedWarehouse= oItem.oModel.getProperty(oItem.sPath).Lgnum;

				});
				
				var headerText= "Warehouse is :" + selectedWarehouse;

this.getView().byId("page").setTitle(headerText);


			}

			oMultiInputWarehouse.setValue(selectedWarehouse);
			this.storedWarehouseValue = selectedWarehouse;
			localStorage.setItem("warehouse", this.storedWarehouseValue);
		},
		
		//value help for manufacturing order
			onValueHelpManufacturing: function() {
				
			var warehouseValue =	this.getView().byId("warehouseId").getValue();

			if (warehouseValue === "") {
						MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("warehouseValueSelect"));
			}

			else{
			
				this.loadManufacturing();
			var oView = this.getView();
			var that = this;

			// create value help dialog
			if (!this._valueHelpDialogManufacturing) {
				this._valueHelpDialogManufacturing = sap.ui.xmlfragment(
					this.getView().getId(), "sap.com.postconsumption.postConsumption.fragments.manufacturingOrder",
					this
				);

				this.getView().addDependent(this._valueHelpDialogManufacturing);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogManufacturing.open();	
			}
			},
			
					loadManufacturing: function () {
		//	var oModel = this.getView().getModel("revenueModel");
			var that = this;
			var oView = this.getView();
			// sap.ui.core.BusyIndicator.show();
			// oModel.read("/DebiaSet", {

			// 	success: function (oData, Response) {

				

			// 		var stockConsModel = new sap.ui.model.json.JSONModel();
			// 		oView.setModel(stockConsModel, "stockConsModel");
			// 		oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		console.log("Inside Success function revenue invoice", oData.results);
			// 	},

			// 	error: function (oData, Response, oError) {
			// 		console.log("Inside Error function");
			// 	}

			// });

			// console.log("Inside Filter options");

		},
		
			//Code to hadle serach inside revenue invoice value help
		handleSearchManufacturing: function (oEvent) {
			var sValue = oEvent.getParameter("value");

			var filter1 = new Filter("Land1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Mcod1", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			handleCloseManufacturing: function (oEvent) {

			var selectedManufacturing;

			var oMultiInputManufacturing = this.byId("manuOrderId");
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				aContexts.forEach(function (oItem) {

				selectedManufacturing= oItem.oModel.getProperty(oItem.sPath).ProductName;

				});

			}

			oMultiInputManufacturing.setValue(selectedManufacturing);
			this.maufOrder=selectedManufacturing;
		},

//Value help for operation
		onValueHelpOperation: function() {
			
				var warehouseValue =	this.getView().byId("warehouseId").getValue();

			if (warehouseValue === "") {
						MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("warehouseValueSelect"));
			}

			else{
			
				this.loadOperation();
			// var oView = this.getView();
			// var that = this;

			// create value help dialog
			if (!this._valueHelpDialogOperation) {
				this._valueHelpDialogOperation = sap.ui.xmlfragment(
					this.getView().getId(), "sap.com.postconsumption.postConsumption.fragments.operation",
					this
				);

				this.getView().addDependent(this._valueHelpDialogOperation);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogOperation.open();	
			
			}
				
			},
			
					loadOperation: function () {
		//	var oModel = this.getView().getModel("revenueModel");
			var that = this;
			var oView = this.getView();
			// sap.ui.core.BusyIndicator.show();
			// oModel.read("/DebiaSet", {

			// 	success: function (oData, Response) {

				

			// 		var stockConsModel = new sap.ui.model.json.JSONModel();
			// 		oView.setModel(stockConsModel, "stockConsModel");
			// 		oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		console.log("Inside Success function revenue invoice", oData.results);
			// 	},

			// 	error: function (oData, Response, oError) {
			// 		console.log("Inside Error function");
			// 	}

			// });

			// console.log("Inside Filter options");

		},
		
			//Code to hadle serach inside revenue invoice value help
		handleSearchOperation: function (oEvent) {
			var sValue = oEvent.getParameter("value");

			var filter1 = new Filter("Land1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Mcod1", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			handleCloseOperation: function (oEvent) {

			var selectedOperation;

			var oMultiInputOperation = this.byId("opForActId");
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				aContexts.forEach(function (oItem) {

					selectedOperation= oItem.oModel.getProperty(oItem.sPath).ProductName;

				});

			}

			oMultiInputOperation.setValue(selectedOperation);
			this.operation=selectedOperation;
		},

		
		//Value help for Product
		onValueHelpProduct: function() {
			
				var warehouseValue =	this.getView().byId("warehouseId").getValue();

			if (warehouseValue === "") {
						MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("warehouseValueSelect"));
			}

			else{
			
				this.loadProduct();
			// var oView = this.getView();
			// var that = this;

			// create value help dialog
			if (!this._valueHelpDialogProduct) {
				this._valueHelpDialogProduct = sap.ui.xmlfragment(
					this.getView().getId(), "sap.com.postconsumption.postConsumption.fragments.product",
					this
				);

				this.getView().addDependent(this._valueHelpDialogProduct);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogProduct.open();	
			
			}
				
			},
			
					loadProduct: function () {
		//	var oModel = this.getView().getModel("revenueModel");
			var that = this;
			var oView = this.getView();
			// sap.ui.core.BusyIndicator.show();
			// oModel.read("/DebiaSet", {

			// 	success: function (oData, Response) {

				

			// 		var stockConsModel = new sap.ui.model.json.JSONModel();
			// 		oView.setModel(stockConsModel, "stockConsModel");
			// 		oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		console.log("Inside Success function revenue invoice", oData.results);
			// 	},

			// 	error: function (oData, Response, oError) {
			// 		console.log("Inside Error function");
			// 	}

			// });

			// console.log("Inside Filter options");

		},
		
			//Code to hadle serach inside revenue invoice value help
		handleSearchProduct: function (oEvent) {
			var sValue = oEvent.getParameter("value");

			var filter1 = new Filter("Land1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Mcod1", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			handleCloseProduct: function (oEvent) {

			var selectedProduct;

			var oMultiInputProduct = this.byId("prodForConsId");
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				aContexts.forEach(function (oItem) {

					selectedProduct= oItem.oModel.getProperty(oItem.sPath).ProductName;

				});

			}

			oMultiInputProduct.setValue(selectedProduct);
				this.productCons=selectedProduct;
		},

		
		
			//Value help for Product for Supply
		onValueHelpProdSup: function() {
			
				var warehouseValue =	this.getView().byId("warehouseId").getValue();

			if (warehouseValue === "") {
						MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("warehouseValueSelect"));
			}

			else{
			
				this.loadProdSup();
			// var oView = this.getView();
			// var that = this;

			// create value help dialog
			if (!this._valueHelpDialogProdSup) {
				this._valueHelpDialogProdSup = sap.ui.xmlfragment(
					this.getView().getId(), "sap.com.postconsumption.postConsumption.fragments.productSupply",
					this
				);

				this.getView().addDependent(this._valueHelpDialogProdSup);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogProdSup.open();	
			
			}
				
			},
			
					loadProdSup: function () {
		//	var oModel = this.getView().getModel("revenueModel");
			var that = this;
			var oView = this.getView();
			// sap.ui.core.BusyIndicator.show();
			// oModel.read("/DebiaSet", {

			// 	success: function (oData, Response) {

				

			// 		var stockConsModel = new sap.ui.model.json.JSONModel();
			// 		oView.setModel(stockConsModel, "stockConsModel");
			// 		oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		console.log("Inside Success function revenue invoice", oData.results);
			// 	},

			// 	error: function (oData, Response, oError) {
			// 		console.log("Inside Error function");
			// 	}

			// });

			// console.log("Inside Filter options");

		},
		
			//Code to hadle serach inside product for supply value help
		handleSearchProdSup: function (oEvent) {
			var sValue = oEvent.getParameter("value");

			var filter1 = new Filter("Land1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Mcod1", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			handleCloseProdSup: function (oEvent) {

			var selectedProdSup;

			var oMultiInputProdSup = this.byId("prodSupAreaId");
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				aContexts.forEach(function (oItem) {

					selectedProdSup= oItem.oModel.getProperty(oItem.sPath).ProductName;

				});

			}

			oMultiInputProdSup.setValue(selectedProdSup);
				this.productSupply= selectedProdSup;
		},



		//Value help for quantity produced
		onValueHelpQuanProd: function() {
			
				var warehouseValue =	this.getView().byId("warehouseId").getValue();

			if (warehouseValue === "") {
						MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("warehouseValueSelect"));
			}

			else{
			
				this.loadQuanProd();
			// var oView = this.getView();
			// var that = this;

			// create value help dialog
			if (!this._valueHelpDialogQuanProd) {
				this._valueHelpDialogQuanProd = sap.ui.xmlfragment(
					this.getView().getId(), "sap.com.postconsumption.postConsumption.fragments.quantityProduced",
					this
				);

				this.getView().addDependent(this._valueHelpDialogQuanProd);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogQuanProd.open();
			}
				
			},
			
					loadQuanProd: function () {
		//	var oModel = this.getView().getModel("revenueModel");
			var that = this;
			var oView = this.getView();
			// sap.ui.core.BusyIndicator.show();
			// oModel.read("/DebiaSet", {

			// 	success: function (oData, Response) {

				

			// 		var stockConsModel = new sap.ui.model.json.JSONModel();
			// 		oView.setModel(stockConsModel, "stockConsModel");
			// 		oView.getModel("stockConsModel").setProperty("/ShipToPartySet", oData.results);
			// 		sap.ui.core.BusyIndicator.hide();
			// 		console.log("Inside Success function revenue invoice", oData.results);
			// 	},

			// 	error: function (oData, Response, oError) {
			// 		console.log("Inside Error function");
			// 	}

			// });

			// console.log("Inside Filter options");

		},
		
			//Code to hadle serach inside product for supply value help
		handleSearchQuanProd: function (oEvent) {
			var sValue = oEvent.getParameter("value");

			var filter1 = new Filter("Land1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Mcod1", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
		},
		
			handleCloseQuanProd: function (oEvent) {

			var selectedQuanProd;

			var oMultiInputQuanProd = this.byId("quantityProducedId");
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				//	MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				aContexts.forEach(function (oItem) {

					selectedQuanProd= oItem.oModel.getProperty(oItem.sPath).ProductName;

				});

			}

			oMultiInputQuanProd.setValue(selectedQuanProd);
				this.quantityProd= selectedQuanProd;
		},

		
				// #region
		onValueHelpRequested: function() {
			var aCols = this.oColModel.getData().cols;
			this._oBasicSearchField = new SearchField({
				showSearchButton: false
			});
			this._oValueHelpDialog = sap.ui.xmlfragment("sap.com.postconsumption.postConsumption.fragments.manufacturingOrder", this);
			this.getView().addDependent(this._oValueHelpDialog);

			this._oValueHelpDialog.setRangeKeyFields([{
				label: "Product",
				key: "ProductId",
				type: "string",
				typeInstance: new typeString({}, {
					maxLength: 7
				})
			}]);

			var oFilterBar = this._oValueHelpDialog.getFilterBar();
			oFilterBar.setFilterBarExpanded(false);
			oFilterBar.setBasicSearch(this._oBasicSearchField);

			this._oValueHelpDialog.getTableAsync().then(function (oTable) {
				oTable.setModel(this.oProductsModel);
			//	oTable.setSelectionMode().mProperties.selectionMode = "Single";
				oTable.setModel(this.oColModel, "columns");

				if (oTable.bindRows) {
					oTable.bindAggregation("rows", "/Products");
				}

				if (oTable.bindItems) {
					oTable.bindAggregation("items", "/Products", function () {
						return new ColumnListItem({
							cells: aCols.map(function (column) {
								return new Label({ text: "{" + column.template + "}" });
							})
						});
					});
				}

			//	this._oValueHelpDialog.update();
			}.bind(this));

		//	this._oValueHelpDialog.setTokens(this._oMultiInput.getTokens());
			var oToken = new Token();
			oToken.setKey(this._oManuOrdInput.getSelectedKey());
			oToken.setText(this._oManuOrdInput.getValue());
			this._oValueHelpDialog.setTokens([oToken]);
			this._oValueHelpDialog.open();
		
			
			
		},

			onValueHelpOkPress: function (oEvent) {
			var aTokens = oEvent.getParameter("tokens");
			this._oManuOrdInput.setValue(aTokens[0].mAggregations.customData[0].mProperties.value.ProductID);
			this._oValueHelpDialog.close();
		},
		
			onValueHelpCancelPress: function () {
			this._oValueHelpDialog.close();
		},

		onValueHelpAfterClose: function () {
			this._oValueHelpDialog.destroy();
		},
			onFilterBarSearch: function (oEvent) {
			var sSearchQuery = this._oBasicSearchField.getValue(),
				aSelectionSet = oEvent.getParameter("selectionSet");
			var aFilters = aSelectionSet.reduce(function (aResult, oControl) {
				if (oControl.getValue()) {
					aResult.push(new Filter({
						path: oControl.getName(),
						operator: FilterOperator.Contains,
						value1: oControl.getValue()
					}));
				}

				return aResult;
			}, []);

			aFilters.push(new Filter({
				filters: [
					new Filter({ path: "ProductID", operator: FilterOperator.Contains, value1: sSearchQuery }),
					new Filter({ path: "Name", operator: FilterOperator.Contains, value1: sSearchQuery })
				
				],
				and: false
			}));

			this._filterTable(new Filter({
				filters: aFilters,
				and: true,
				or: true
			}));
		},
		
			_filterTable: function (oFilter) {
			var oValueHelpDialog = this._oValueHelpDialog;

			oValueHelpDialog.getTableAsync().then(function (oTable) {
				if (oTable.bindRows) {
					oTable.getBinding("rows").filter(oFilter);
				}

				if (oTable.bindItems) {
					oTable.getBinding("items").filter(oFilter);
				}

				oValueHelpDialog.update();
			});
		},
		
		/* code to check validation for filters */
		onClickConsumption: function () {
			
			  	var oView= this.getView();
        	// var manufacturingOrder=this.maufOrder;
        	// var operation= this.operation;
        	// var product= this.productCons;
        	// var prodSupArea = this.productSupply;
        	// var quantityProduced = this.quantityProd;
        		var manufacturingOrder=oView.byId("manuOrderId").getValue();
        	var operation= oView.byId("opForActId").getValue();
        	var product= oView.byId("prodForConsId").getValue();
        	var prodSupArea = oView.byId("prodSupAreaId").getValue();
        	var quantityProduced = oView.byId("quantityProducedId").getValue();
        	 var handlingUnitvalue = oView.byId("handlingUnitId").getValue();
                       var uomValue = oView.byId("unitMeasureId").getValue();
                       var warehouseValue = oView.byId("warehouseId").getValue();
        	
        	if(operation === undefined){
        		
        	operation= "";	
        	}
        	
        		if(product === undefined){
        		
        	product= "";	
        	}
        	
        		if(prodSupArea === undefined){
        		
        	prodSupArea= "";	
        	}
        	
        	if(quantityProduced === undefined){
        		
        	quantityProduced= "";	
        	}
        	
        	
        	
       // json model to pass parameters from one view to other 	
        var	oViewModel = new sap.ui.model.json.JSONModel({
				"handlingUnitvalue" : handlingUnitvalue,
				"uomValue" : uomValue,
				"manufacturingOrder" : manufacturingOrder,
				"operation" : operation,
				"product" : product,
				"prodSupArea" : prodSupArea,
				"quantityProduced" : quantityProduced
						});
					
        	sap.ui.getCore().setModel(oViewModel, "settingsDefaultModel");
        	
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var _self = this;
                var valid = true;
			
			if (manufacturingOrder === "" || manufacturingOrder === undefined || warehouseValue === "" || warehouseValue === undefined) {
                        valid = false;
                       // oView.byId("manuOrderId").setValueState("Error");
                       MessageToast.show("Please fill all mandatory fields");
                    }
                    else {
                      // oView.byId("manuOrderId").setValueState("Success");
                       
                      	oRouter.navTo("postConsumption");
                    }
			
			 //var requiredInputs = this.returnIdListOfRequiredFields();
    //         var passedValidation = this.validateEventFeedbackForm(requiredInputs);
    //         if(passedValidation === false)
    //         {
    //             //show an error message, rest of code will not execute.
    //             return false;
    //         }

		},
		 returnIdListOfRequiredFields: function()
        {
           var requiredInputs = [];
            $('[data-required="true"]').each(function(){
                requiredInputs.push($(this).context.id);
            });
            return requiredInputs;
        },
        validateEventFeedbackForm: function(requiredInputs) {
        	
        	var oView= this.getView();
        	// var manufacturingOrder=this.maufOrder;
        	// var operation= this.operation;
        	// var product= this.productCons;
        	// var prodSupArea = this.productSupply;
        	// var quantityProduced = this.quantityProd;
        		var manufacturingOrder=oView.byId("manuOrderId").getValue();
        	var operation= oView.byId("opForActId").getValue();
        	var product= oView.byId("prodForConsId").getValue();
        	var prodSupArea = oView.byId("prodSupAreaId").getValue();
        	var quantityProduced = oView.byId("quantityProducedId").getValue();
        	 var handlingUnitvalue = oView.byId("handlingUnitId").getValue();
                       var uomValue = oView.byId("unitMeasureId").getValue();
        	
        	if(operation === undefined){
        		
        	operation= "";	
        	}
        	
        		if(product === undefined){
        		
        	product= "";	
        	}
        	
        		if(prodSupArea === undefined){
        		
        	prodSupArea= "";	
        	}
        	
        	if(quantityProduced === undefined){
        		
        	quantityProduced= "";	
        	}
        		if(uomValue === undefined){
        		
        	uomValue= "";	
        	}
        	
        	
        	
       // json model to pass parameters from one view to other 	
        var	oViewModel = new sap.ui.model.json.JSONModel({
				"handlingUnitvalue" : handlingUnitvalue,
				"uomValue" : uomValue,
				"manufacturingOrder" : manufacturingOrder,
				"operation" : operation,
				"product" : product,
				"prodSupArea" : prodSupArea,
				"quantityProduced" : quantityProduced
						});
					
        	sap.ui.getCore().setModel(oViewModel, "settingsDefaultModel");
        	
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var _self = this;
                var valid = true;
                requiredInputs.forEach(function (input) {
                    var sInput = _self.getView().byId(input);
                    if (sInput.getValue() == "" || sInput.getValue() == undefined) {
                        valid = false;
                        sInput.setValueState("Error");
                    }
                    else {
                       sInput.setValueState("Success");
                       
                      	oRouter.navTo("postConsumption");
                  
			// oRouter.navTo("postConsumption",{
			// 	"handlingUnitvalue" : handlingUnitvalue,
			// 	"uomValue" : uomValue,
			// 	"manufacturingOrder" : manufacturingOrder,
			// 	"operation" : operation,
			// 	"product" : product,
			// 	"prodSupArea" : prodSupArea,
			// 	"quantityProduced" : quantityProduced
				
			// });
                    }
                });
                return valid;
        },
        
        	/* code to check validation for filters */
		onClickReversal: function () {
			
						  	var oView= this.getView();
        	// var manufacturingOrder=this.maufOrder;
        	// var operation= this.operation;
        	// var product= this.productCons;
        	// var prodSupArea = this.productSupply;
        	// var quantityProduced = this.quantityProd;
        		var manufacturingOrder=oView.byId("manuOrderId").getValue();
        	var operation= oView.byId("opForActId").getValue();
        	var product= oView.byId("prodForConsId").getValue();
        	var prodSupArea = oView.byId("prodSupAreaId").getValue();
        	var quantityProduced = oView.byId("quantityProducedId").getValue();
        	 var handlingUnitvalue = oView.byId("handlingUnitId").getValue();
             var uomValue = oView.byId("unitMeasureId").getValue();
              var warehouseValue = oView.byId("warehouseId").getValue();
        	
        	if(operation === undefined){
        		
        	operation= "";	
        	}
        	
        		if(product === undefined){
        		
        	product= "";	
        	}
        	
        		if(prodSupArea === undefined){
        		
        	prodSupArea= "";	
        	}
        	
        	if(quantityProduced === undefined){
        		
        	quantityProduced= "";	
        	}
        	
        	
        	
       // json model to pass parameters from one view to other 	
        var	oViewModel = new sap.ui.model.json.JSONModel({
				"handlingUnitvalue" : handlingUnitvalue,
				"uomValue" : uomValue,
				"manufacturingOrder" : manufacturingOrder,
				"operation" : operation,
				"product" : product,
				"prodSupArea" : prodSupArea,
				"quantityProduced" : quantityProduced,
				"warehouse" : warehouseValue
						});
					
        	sap.ui.getCore().setModel(oViewModel, "settingsDefaultModel");
        	
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var _self = this;
                var valid = true;
			
			if (manufacturingOrder === "" || manufacturingOrder === undefined) {
                        valid = false;
                        oView.byId("manuOrderId").setValueState("Error");
                    }
                    else {
                       oView.byId("manuOrderId").setValueState("Success");
                       
                      	oRouter.navTo("reversalPosting");
                    }
			
			 //var requiredInputs = this.returnIdListOfRequiredFields();
    //         var passedValidation = this.validateEventFeedbackFormReversal(requiredInputs);
    //         if(passedValidation === false)
    //         {
    //             //show an error message, rest of code will not execute.
    //             return false;
    //         }

		},
		
		   validateEventFeedbackFormReversal: function(requiredInputs) {
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var _self = this;
                var valid = true;
                requiredInputs.forEach(function (input) {
                    var sInput = _self.getView().byId(input);
                    if (sInput.getValue() == "" || sInput.getValue() == undefined) {
                        valid = false;
                        sInput.setValueState("Error");
                    }
                    else {
                       sInput.setValueState("Success");
                  
			oRouter.navTo("reversalPosting");
                    }
                });
                return valid;
        }
        
  //      onFormatDate : function(vDate) {
		// 	// if (vDate === "Vegie-spread") {
		
		// 	// return true;
			
		// 	// }
		// 	// else{
		// 	// return false;	
				
		// 	// }
		// }

	
		
	});
});