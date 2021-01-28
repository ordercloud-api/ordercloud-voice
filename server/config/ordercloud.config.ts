import 'axios'
import { ApiRole, Configuration } from 'ordercloud-javascript-sdk'

Configuration.Set({
  baseApiUrl: 'https://stagingapi.ordercloud.io',
})

export const scope = [
  'AddressAdmin',
  'AddressReader',
  'AdminAddressReader',
  'AdminUserAdmin',
  'ApiClientAdmin',
  'ApiClientReader',
  'ApprovalRuleAdmin',
  'AssetAdmin',
  'BuyerAdmin',
  'BuyerImpersonation',
  'BuyerUserAdmin',
  'CatalogAdmin',
  'CategoryAdmin',
  'CreditCardAdmin',
  'DocumentAdmin',
  'MeAdmin',
  'MeXpAdmin',
  'OrderAdmin',
  'OrderReader',
  'PriceScheduleAdmin',
  'ProductAdmin',
  'ProductAssignmentAdmin',
  'ProductFacetAdmin',
  'ProductReader',
  'PromotionAdmin',
  'SchemaAdmin',
  'ShipmentAdmin',
  'ShipmentReader',
  'SupplierAddressAdmin',
  'SupplierAddressReader',
  'SupplierAdmin',
  'SupplierReader',
  'SupplierUserAdmin',
  'SupplierUserGroupAdmin',
  'UserGroupAdmin',
] as ApiRole[]
