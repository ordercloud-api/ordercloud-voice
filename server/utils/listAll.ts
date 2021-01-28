/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { batchOperations } from './batchOperations'
import { Meta, ListPage, RequiredDeep } from 'ordercloud-javascript-sdk'
import { flatten } from 'lodash'

/**
 * @description returns all items from all pages for an ordercloud list function
 *
 * @param listFn the ordercloud function that will be called repeatedly
 * until all items have been retrieved (not invoked)
 * @param listArgs any arguments to the function should be passed in
 * as separate parameters
 *
 * @example
 * listAll(OrderCloudSDk.Products.List, {filters: {'xp.Color': 'Red'}});
 */
export async function listAll<T = any>(
  this: any,
  listFn: (...args: any) => Promise<RequiredDeep<ListPage<T>>>,
  ...listArgs: any[]
): Promise<T[]> {
  // get or create filters obj if it doesnt exist
  const hasFiltersObj = typeof listArgs[listArgs.length - 1] === 'object'
  const filtersObj = hasFiltersObj ? listArgs.pop() : {}

  // set page and pageSize
  filtersObj.page = 1
  filtersObj.pageSize = 100

  const result1 = await listFn.apply(this, [
    ...listArgs,
    JSON.parse(JSON.stringify(filtersObj)),
  ])
  const additionalPages = getAdditionalPages(result1.Meta)

  const results = await batchOperations<number, ListPage<T>>(
    additionalPages,
    async (page: number) => {
      return await listFn.apply(this, [
        ...listArgs,
        { ...JSON.parse(JSON.stringify(filtersObj)), page: page },
      ])
    }
  )

  // combine and flatten items for all list calls
  return flatten([result1, ...results].map((r) => r.Items)) as T[]

  function getAdditionalPages(meta: Required<Meta>) {
    let page = meta.Page + 1
    let additionalPages: number[] = []
    while (page <= meta.TotalPages) {
      additionalPages = [...additionalPages, page]
      page++
    }
    return additionalPages
  }
}
