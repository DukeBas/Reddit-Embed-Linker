export function getElementsByTextInclusion(str: string, tag: string = 'span') {
    return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.innerHTML.includes(str));
}

export function addLinkButton(): void {
    // console.log("Adding button!");

    const candidates = getElementsByTextInclusion('% Upvoted'); // we get to the right spot using the fact that there is always an upvoted %
    const upvotedSpan = candidates[0];
    const parentDiv = upvotedSpan.parentElement; // holds only upvoted %
    // const bottomBar = parentDiv.parentElement;  // holds the sharing buttons and upvoted %
    const buttons = parentDiv.nextElementSibling ? parentDiv.nextElementSibling : parentDiv.previousElementSibling; // holds only the buttons

    // create a div for the new button
    const newDiv = document.createElement('div');
    newDiv.className = 'getEmbeddedLinkDiv';
    newDiv.id = 'getEmbeddedLinkDiv';

    // create a button for the new div that copies link to clipboard when clicked
    const linkButton = document.createElement('button');
    linkButton.innerHTML = "Get link";
    linkButton.onclick = buttonClick;
    newDiv.appendChild(linkButton);

    // add created elements to DOM
    buttons.appendChild(newDiv);

    // check if link is still there, if not place it again and check again soon later
    setTimeout(() => {
        if (!document.getElementById('getEmbeddedLinkDiv')) {
            // button got removed! call function again
            addLinkButton();
        }
    }, 200);
}



// called when the added button is clicked
// only copies to clipboard if a (valid) link is found
function buttonClick(e: MouseEvent) {
    // console.log("Clicked!", e);

    let tag: Element | undefined = undefined;

    // find link
    if (e.target) {
        // look for image link
        const asElement = (t: MouseEvent) => (t.target as HTMLElement);
        tag = goUpFindTag(asElement(e), 'img', postImageCheck);

        if (tag) {
            // image found
            // get image embed link
            const embedLink = getLinkFromImageElement(tag as HTMLImageElement);

            // copy found link to clipboard, if it is defined
            if (embedLink != undefined) {
                copyToClipboard(embedLink);
            }
        } else {
            // if no image tag is found
            // look for video
            tag = goUpFindTag(asElement(e), 'source');

            if (tag) {
                // if one is found
                const src: string = (tag as any).src;
                console.log(src)
                // check if image is gif
                if (src.includes('.gif')) {
                    copyToClipboard(makeGIFLink(src));
                } else {

                }
            }
        }
    } else {
        // should never happen
        console.warn("No event target found for mouse click");
    }
}


function makeGIFLink(link: string) {
    let output = link.split('?')[0]; // remove irrelevant parts
    output = output.replace('preview', 'i');
    return output;
}


// can only be used with user input
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
function goUpFindTag(start: HTMLElement,
    tagName: string,
    extraRequirement?: Function, // boolean function to check if an element works
    maxSteps = 6) {

    let elements: HTMLCollectionOf<Element>;

    // search subtree at start
    elements = start.getElementsByTagName(tagName);
    let hit: HTMLElement | undefined;
    if (extraRequirement != undefined) {
        hit = checkTagsForExtraRequirements(elements, extraRequirement);
    } else {
        if (elements.length > 0) {
            hit = elements[0] as HTMLElement;
        }
    }
    if (hit) {
        return hit;
    }

    // continually go up and check parent and siblings until given tag is found or we are at body or out of steps
    let currentTag: HTMLElement = start;
    let stepsLeft = maxSteps;
    do {
        // check direct parent
        const currentParent = currentTag.parentElement;
        if (currentParent?.tagName.toUpperCase() === tagName.toUpperCase()) {
            hit = currentParent;
            break;
        }

        // check siblings
        const siblings = getSiblings(currentTag);
        siblings.some((el) => {
            // console.log(elements)
            elements = el.getElementsByTagName(tagName);
            if (extraRequirement != undefined) {
                hit = checkTagsForExtraRequirements(elements, extraRequirement);
            } else {
                if (elements.length > 0) {
                    hit = elements[0] as HTMLElement;
                }
            }
            if (hit != undefined) {
                return true;
            }
        })

        // prepare next iteration
        currentTag = currentTag.parentElement ? currentTag.parentElement : start;
        stepsLeft--;
    } while (currentTag.tagName != "body" && stepsLeft > 0 && hit === undefined);

    return hit;
}

// gets siblings of given html element
function getSiblings(el: HTMLElement) {
    return el.parentElement
        ? [...el.parentElement.children].filter(i => i != el) as HTMLElement[] // filter starting point
        : [];
}

// returns post image if it is in the collection else undefined
function checkTagsForExtraRequirements(elements: HTMLCollection, extraRequirement: Function): HTMLElement | undefined {
    let returnElement: HTMLElement | undefined = undefined;

    [...elements].some((e: any) => {
        if (extraRequirement(e)) {
            returnElement = e as HTMLElement;
            return true;
        }
    });

    return returnElement;
}


function getLinkFromImageElement(imgEl: HTMLImageElement): string {
    // go up to find anchor element with full resolution image link
    const anchor: HTMLAnchorElement | undefined = goUpFindTag(imgEl, 'a') as HTMLAnchorElement;
    return anchor.href;
}


// check element if it is a post image
function postImageCheck(el: HTMLImageElement): boolean {
    const altText: string = el.alt;
    if (altText) {
        if (altText.slice(0, 2) === "r/") {
            return true;
        }
    }
    return false;
}