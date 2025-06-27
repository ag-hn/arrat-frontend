import { type transformUnitsGrouping, type transformUnitsGroupingList, type transformSessionEntry, type transformSessionEntryList, type transformUnitEntry, type transformUnitEntryList } from "../api/transformers/transformer.session"

export type TransformedSessionEntry = ReturnType<typeof transformSessionEntry>
export type TransformedSessionEntryList = ReturnType<typeof transformSessionEntryList>
export type TransformedUnitEntry = ReturnType<typeof transformUnitEntry>
export type TransformedUnitEntryList = ReturnType<typeof transformUnitEntryList>
export type TransformedUnitsGrouping = ReturnType<typeof transformUnitsGrouping>
export type TransformedUnitsGroupingList = ReturnType<typeof transformUnitsGroupingList>
