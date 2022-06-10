var theme = {
   strings: {
      addToCart: "Add to cart",
      select_options: "Choose options",
      soldOut: "Sold out",
      unavailable: "Unavailable",
      regularPrice: "Regular price",
      sale: "Sale",
      showMore: "Read More",
      showLess: "Read Less",
      addressError: "Error looking up that address",
      addressNoResults: "No results for that address",
      addressQueryLimit: "You have exceeded the Google API usage limit. Consider upgrading to a \u003ca href=\"https:\/\/developers.google.com\/maps\/premium\/usage-limits\"\u003ePremium Plan\u003c\/a\u003e.",
      authError: "There was a problem authenticating your Google Maps account.",
      newWindow: "Opens in a new window.",
      external: "Opens external website.",
      newWindowExternal: "Opens external website in a new window.",
      quantityMinimumMessage: "Quantity must be 1 or more",
      unitPrice: "Unit price",
      unitPriceSeparator: "per",
      remove: "Remove",
      oneCartCount: "1 item",
      otherCartCount: "[count] items",
      quantityLabel: "Quantity: [count]",
      in_stock: "In stock",
      out_of_stock: "Out of stock",
      previous: "Prev",
      next: "Next",
      added_to_cart: "is added to your shopping cart."
   },

   moneyFormat: "${{amount}}"
}

window.shop_currency = "USD";
window.multi_lang = true;
window.show_multiple_currencies = true;
window.show_auto_currency = false;
window.money_format = "${{amount}}";
window.router = "";
document.documentElement.className = document.documentElement.className.replace('no-js', 'js');


var Shopify = Shopify || {};
Shopify.shop = "the-collective-supplies.myshopify.com";
Shopify.locale = "en";
Shopify.currency = {
   "active": "USD",
   "rate": "1.0"
};
Shopify.country = "US";
Shopify.theme = {
   "name": "The Collective Supplies",
   "id": 126525276321,
   "theme_store_id": null,
   "role": "main"
};
Shopify.theme.handle = "null";
Shopify.theme.style = {
   "id": null,
   "handle": null
};
Shopify.cdnHost = "cdn.shopify.com";
Shopify.routes = Shopify.routes || {};
Shopify.routes.root = "/";

var ACDiscountApp = ACDiscountApp || {};
ACDiscountApp.Common = ACDiscountApp.Common || {};
ACDiscountApp.CartPage = ACDiscountApp.CartPage || {};
ACDiscountApp.PDPage = ACDiscountApp.PDPage || {};
ACDiscountApp.Common.GlobalFields = function () {
   this.isCustomer = false;
   this.customerTag = '';
   this.currency = 'USD';
   this.currencySymbol = (document.getElementById("ac-money-format").textContent).trim();
   this.currencySymbol = this.currencySymbol.split("{");
   this.currencySymbol = this.currencySymbol[0];
   var calcTime = function (offset_) {
      d_ = new Date();
      utc_ = d_.getTime() + (d_.getTimezoneOffset() * 60000);
      nd_ = new Date(utc_ + (3600000 * offset_));
      return Date.parse(nd_.getMonth() + 1 + "/" + nd_.getDate() + "/" + nd_.getFullYear() + " " + nd_.getHours() + ":" + nd_.getMinutes());
   }
   this.StartEndDateValid = function (startDate, endDate) {
      var isStrtDtVald_ = false;
      var isEndDtVald_ = false;
      var todayDate_ = calcTime(globalFields.settings.timezone);
      if (startDate != null) {
         var startDate_ = Date.parse(startDate);
         isStrtDtVald_ = todayDate_ >= startDate_;
      } else {
         isStrtDtVald_ = true;
      }
      if (endDate != null) {
         var endDate_ = Date.parse(endDate);
         isEndDtVald_ = todayDate_ <= endDate_;
      } else {
         isEndDtVald_ = true;
      }
      if (isStrtDtVald_ && isEndDtVald_) {
         return true;
      } else {
         return false;
      }
   }

   this.GetTierObject = function (metafieldArray, variantId) {
      var obj = metafieldArray.tier !== undefined ? metafieldArray.tier : metafieldArray;
      if (obj.entity_type === "variants") {
         var variantIndex = obj.variant_ids.indexOf(variantId.toString());
         if (variantIndex !== -1) {
            var objToReturn = {
               entity_type: "variants",
               discount_type: obj.discount_type[variantIndex],
               status: obj.status[variantIndex],
               tier_min: obj.tier_min[variantIndex],
               tier_max: obj.tier_max[variantIndex],
               tier_values: obj.tier_values[variantIndex],
               start_date: obj.start_date[variantIndex],
               end_date: obj.end_date[variantIndex]
            };
            return objToReturn;
         } else {
            return undefined;
         }
      } else {
         return obj;
      }
   }

   this.ConvertToFixedDecimalString = function (amount) {
      return amount.toFixed(2);
   }

   this.ConvertToFixedDecimalNumber = function (amount) {
      return Number(amount.toFixed(2));
   }
   this.isCartPage = false;
   this.isProductPage = false;
   this.settings = {
      "selected_table": "table1",
      "theme_installed": [126525276321],
      "table_headers": {
         "header1_value": "Minimum Quantity",
         "header2_value": "Discount",
         "header3_value": "Discount"
      },
      "synced_theme": 126525276321,
      "table_body": {
         "body1_value": "Buy",
         "body2_value": "body2Text"
      },
      "checkout_type": "normal",
      "create_discount_on_subtotal": false,
      "timezone": "-5",
      "is_cart_saving_message": true,
      "cart_saving_message": "You saved {{discount_amount}}."
   };
}

ACDiscountApp.PDPage.Global = function () {
   this.variantsPriceArray_PD = [];
   this.productMetafield = "[]";
}

ACDiscountApp.CartPage.Global = function () {
   this.cartObj = {
      "note": null,
      "attributes": {},
      "original_total_price": 0,
      "total_price": 0,
      "total_discount": 0,
      "total_weight": 0.0,
      "item_count": 0,
      "items": [],
      "requires_shipping": false,
      "currency": "USD",
      "items_subtotal_price": 0,
      "cart_level_discount_applications": []
   };
   this.cartTiersArray = []
}
var globalFields = new ACDiscountApp.Common.GlobalFields();