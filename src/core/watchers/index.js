import { startUrlWatcher } from "./urlWatcher.js";
import { startInteractionWatcher } from "./interactionWatcher.js";
import { startVisibilityWatcher } from "./visibilityWatcher.js";
import { startApiWatcher } from "./apiWatcher.js";

export function startEduQuickWatchers() {
    startUrlWatcher();
    startInteractionWatcher();
    startVisibilityWatcher();
    startApiWatcher();
}
