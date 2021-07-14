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

    console.log("PARENTTREE", linkButton, linkButton.parentElement, linkButton.parentElement?.parentElement);

    // TODO check if link is still there, if not place it again and check again soon later

}

// called when the added button is clicked
function buttonClick() {
    console.log("Clicked!");

    // find link
    //TODO
    const embedLink: string = "www.example.com";

    // copy found link to clipboard
    copyToClipboard(embedLink);
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