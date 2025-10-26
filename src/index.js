import { initEduQuick } from "./startup.js";
import { setEduQuickTitle, setEduQuickContent } from "./ui/sidebar.js";
import { setEduQuickStatus } from "./ui/bottombar.js";

initEduQuick();

setEduQuickStatus("No active quizzes.");
setEduQuickTitle("How it works?");
setEduQuickContent("Test");
