export function useVersion() {
  return import.meta.env.VITE_COMMIT_HASH;
}
