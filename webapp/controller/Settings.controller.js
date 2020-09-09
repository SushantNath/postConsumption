sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/m/SearchField',
	'sap/ui/model/type/String',
	'sap/m/ColumnListItem',
	'sap/m/Label',
	'sap/m/Token',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (Controller,JSONModel,SearchField,typeString,ColumnListItem,Label,Token,Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.com.postconsumption.postConsumption.controller.Settings", {
		onInit: function () {
			
				this.oColModel = new JSONModel(sap.ui.require.toUrl("sap/com/postconsumption/postConsumption/model") + "/columnsModel.json");
	this._oManuOrdInput = this.getView().byId("manuOrderId");
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
					oTable.bindAggregation("rows", "/Invoices");
				}

				if (oTable.bindItems) {
					oTable.bindAggregation("items", "/Invoices", function () {
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
					new Filter({ path: "ProductName", operator: FilterOperator.Contains, value1: sSearchQuery }),
					new Filter({ path: "ProductName", operator: FilterOperator.Contains, value1: sSearchQuery })
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
			
			 var requiredInputs = this.returnIdListOfRequiredFields();
            var passedValidation = this.validateEventFeedbackForm(requiredInputs);
            if(passedValidation === false)
            {
                //show an error message, rest of code will not execute.
                return false;
            }

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
        //	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
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
                      // 	_self.getView().byId("dynamicPageId").setShowFooter(true);
                    }
                });
                return valid;
        }

		// #endregion
		
	});
});