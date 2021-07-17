import { addLinkButton } from "./functions";

console.log("REL: Running post!");

// add button if it isn't there already
if (!document.getElementById('getEmbeddedLinkDiv')) {
  addLinkButton();
}

