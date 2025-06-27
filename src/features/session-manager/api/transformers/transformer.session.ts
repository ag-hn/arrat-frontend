import type { AppAwsSessionDetails, AppAwsUnit, AppAwsUnitsGrouping } from "@/server/zod/schema.sessions"

export const transformSessionEntry = (entry: AppAwsSessionDetails, groups: AppAwsUnitsGrouping[]) => {
  const mappedUnits = entry.units.map((u) => {
    const matchGroup = groups.find((g) => g.grouping === u.session)
    const match = matchGroup?.units.find((uu) => uu.unit === u.unit)
    if (!match) {
      return undefined;
    }

    return match;
  })

  const filteredMappedUnits = mappedUnits.filter((u) => !!u)

  return {
    id: entry.session,
    description: entry.metadata?.description,
    createdAt: new Date(entry.created_at),
    visibility: entry.metadata?.visibility,
    relatedEntries: filteredMappedUnits ? transformUnitEntryList(filteredMappedUnits) : [],
  };
}

export const transformSessionEntryList = (entries: AppAwsSessionDetails[], units: AppAwsUnitsGrouping[]) => {
  return entries.map((entry) => transformSessionEntry(entry, units))
}

export const transformUnitEntry = (entry: AppAwsUnit) => {
  return {
    id: entry.unit,
    route: entry.route,
    grouping: entry.grouping,
    laneNumber: 0,
    direction: entry.direction,
    milepostRange: [entry.start_mile_marker, entry.end_mile_marker],
    depth: entry.depth ?? false,
    createdAt: new Date(entry.created_at),
    metadata: entry.metadata,
  }
}

export const transformUnitEntryList = (entries: AppAwsUnit[]) => {
  return entries.map((entry) => transformUnitEntry(entry))
}

export const transformUnitsGrouping = (entry: AppAwsUnitsGrouping) => {
  return ({
    id: entry.grouping,
    createdAt: new Date(entry.created_at),
    units: transformUnitEntryList(entry.units)
  })
}
export const transformUnitsGroupingList = (entries: AppAwsUnitsGrouping[]) => {
  return entries.map((entry) => transformUnitsGrouping(entry))
}