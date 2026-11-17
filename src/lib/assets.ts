// Asset path helpers. Assets live in /public/uploads and are referenced at the
// app base. Filenames with spaces (the "WTF Games/" cover folder) are URL-encoded
// at runtime, exactly like the original handoff did.
const BASE = import.meta.env.BASE_URL // e.g. "./" or "/"

export function asset(path: string): string {
  return BASE + 'uploads/' + path
}

/** Square game-cover under uploads/WTF Games/. */
export function cover(filename: string): string {
  return BASE + 'uploads/' + encodeURI('WTF Games/' + filename)
}
