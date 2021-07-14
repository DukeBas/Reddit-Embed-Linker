export function getElementsByTextInclusion(str: string, tag: string = 'span') {
    return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.innerHTML.includes(str));
}

export function addLinkButton(): void {
    console.log("Adding button!");

    const candidates = getElementsByTextInclusion('% Upvoted'); // we get to the right spot using the fact that there is always an upvoted %
    const upvotedSpan = candidates[0];
    const parentDiv = upvotedSpan.parentElement; // holds only upvoted %
    const bottomBar = parentDiv.parentElement;  // holds the sharing buttons and upvoted %
    const buttons = parentDiv.nextElementSibling ? parentDiv.nextElementSibling : parentDiv.previousElementSibling; // holds only the buttons

    console.log(upvotedSpan, parentDiv, bottomBar, buttons);

    // create a div for the new button
    const newDiv = document.createElement('div');
    newDiv.className = 'newDiv';

    // create a button for the new div that copies link to clipboard when clicked
    const linkButton = document.createElement('button');
    linkButton.innerHTML = "Get link";
    linkButton.onclick = buttonClick;
    newDiv.appendChild(linkButton);

    // add created elements to DOM
    buttons.appendChild(newDiv);

    console.log("PARENTTREE", 
    linkButton, 
    linkButton.parentElement, 
    linkButton.parentElement?.parentElement);
    console.log("Siblings:", 
    getSiblings(linkButton),
    linkButton.parentElement ? getSiblings(linkButton.parentElement) : "No parent"
    )

    // TODO check if link is still there, if not place it again and check again soon later

}

// called when the added button is clicked
function buttonClick(e: MouseEvent) {
    console.log("Clicked!", e);

    // find link
    if (e.target) {
        const asElement = (t: MouseEvent) => (t.target as HTMLElement);
        const tag = goUpFindTag(asElement(e), 'img')
        console.log(tag);
    } else {
        // should never happen
        console.warn("No event target found for mouse click");
    }

    const embedLink: string = "www.example.com";

    // copy found link to clipboard
    // copyToClipboard(embedLink);
}

function copyToClipboard(str: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = str;
    // el.style.visibility = "hidden";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// first searches for a tag at the subtree of the starting element
// if it is not found there it will look in subtree of siblings
// if it is not found there, go up a level and look in trees of siblings
//   again repeatedly until it is found
function goUpFindTag(start: HTMLElement, tag: string) {
    let tags: HTMLCollectionOf<Element>;

    // search subtree at start
    tags = start.getElementsByTagName(tag);

    if (tags.length > 0) {
        // return first hit
        return tags[0];
    }

    // go up to siblings

}

function getSiblings(el: HTMLElement) {
    if (el.parentElement) {
        return [...el.parentElement.children].filter(i => i != el); // filter starting point
    } else {
        return [];
    }
}
