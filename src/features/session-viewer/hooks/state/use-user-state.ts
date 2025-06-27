import { useLocalStorage } from '@uidotdev/usehooks'

const USER_STATE_KEY_PREFIX = "ARRAT_USER_STATE"
const USER_STATE_KEY = `${USER_STATE_KEY_PREFIX}_PUBLIC_DATA`

export const tilesetOptions = ["map", "satellite"] as const
export type TileSetOption = (typeof tilesetOptions)[number]

export const DEFAULT_USER_STATE = {
  tile: "satellite",
} as const satisfies PublicUserState

/**
 * All non-safe and insecure state held within.
 * 
 * __Access secret's and state through htmlOnly cookies or directly from server__.
 */
export type PublicUserState = {
  tile: TileSetOption,
}

export function useUserState() {
  return useLocalStorage<PublicUserState>(
    USER_STATE_KEY,
    DEFAULT_USER_STATE,
  )
}
