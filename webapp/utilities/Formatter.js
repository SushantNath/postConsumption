sap.ui.define(function () {
	"use strict";

	var Formatter = {

	
		formatterDateAllOrders: function (date) {
			if (date !== "" && date !== null && date !== undefined) {
				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "dd.MM.yyyy",  
					UTC: false
				});
				return oDateFormat.format(new Date(date));

			}
			return date;
		}

	
	
	};
	return Formatter;
}, /* bExport= */ true);