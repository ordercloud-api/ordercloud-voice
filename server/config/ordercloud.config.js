require("axios");
const OrderCloudSDK = require("ordercloud-javascript-sdk");

OrderCloudSDK.Configuration.Set({
  baseApiUrl: "https://stagingapi.ordercloud.io",
});

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
if (!clientID || !clientSecret) {
  throw new Error("Missing ordercloud credentials CLIENT_ID and CLIENT_SECRET");
}

module.exports = {
  sdk: OrderCloudSDK,
  clientID,
  clientSecret,
  scope: [
    "AddressAdmin",
    "AddressReader",
    "AdminAddressReader",
    "AdminUserAdmin",
    "ApiClientAdmin",
    "ApiClientReader",
    "ApprovalRuleAdmin",
    "AssetAdmin",
    "BuyerAdmin",
    "BuyerImpersonation",
    "BuyerUserAdmin",
    "CatalogAdmin",
    "CategoryAdmin",
    "CreditCardAdmin",
    "DocumentAdmin",
    "MeAdmin",
    "MeXpAdmin",
    "OrderAdmin",
    "OrderReader",
    "PriceScheduleAdmin",
    "ProductAdmin",
    "ProductAssignmentAdmin",
    "ProductFacetAdmin",
    "ProductReader",
    "PromotionAdmin",
    "SchemaAdmin",
    "ShipmentAdmin",
    "ShipmentReader",
    "SupplierAddressAdmin",
    "SupplierAddressReader",
    "SupplierAdmin",
    "SupplierReader",
    "SupplierUserAdmin",
    "SupplierUserGroupAdmin",
    "UserGroupAdmin",
  ],
};
