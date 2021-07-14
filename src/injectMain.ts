import { getElementsByTextInclusion, addLinkButton } from "./functions";

console.log("Running main!");

// use an observer to detect when the body style changes
// when it does call function to add embed link button if 
// a post is in focus
const target = document.getElementsByTagName('body')[0];
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
        if (target.style.overflow == "hidden") {
            // a post is in focus, add link button
            postInFocus();
        }
    });
});
observer.observe(target, { attributes: true, attributeFilter: ['style'] });

console.log(target)

function postInFocus() {
    // console.log("Post in focus!");

    // check every 200ms for an upvoted % span element
    let candidates = [];
    function spanCheck() {
        candidates = getElementsByTextInclusion('% Upvoted');
        if (candidates.length > 0) {
            // span is created, continue to next step
            try {
                clearInterval(check);   // clear timer if it exists
            } finally {
                addLinkButton();
            }
        }
    }

    let check = setInterval(spanCheck, 200);
}

