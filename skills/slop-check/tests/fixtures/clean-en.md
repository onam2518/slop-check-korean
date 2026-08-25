# Cache invalidation

The file watcher clears the cache whenever you edit the config. It debounces for 200ms, so saving three files in a row triggers one reload, not three.

We hit a bug here last March: the watcher missed renames on Linux because inotify fires IN_MOVED_FROM and IN_MOVED_TO as separate events. The fix pairs them by cookie. If you rename a watched file and the cache does not clear, check that the two events arrived within the same tick.

One caveat. On network mounts inotify does not fire at all. There you fall back to polling every two seconds, which is slower but works.
