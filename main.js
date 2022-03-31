let button = document.createElement("li");
button.classList = "menu-item icon-only";
button.title = "Copy possible branch name";

let span = button.appendChild(document.createElement("span"));
span.classList = "menu-item-icon bowtie-icon";
span.id = "branch-name-generator";

button.addEventListener("mouseenter", () => {
    button.classList.add("hover");
});
button.addEventListener("mouseleave", () => {
    button.classList.remove("hover");
    button.firstChild.id = "branch-name-generator";
});
button.addEventListener("click", () => {
    let type = "TYPE";
    const id = document.querySelectorAll(".workitemcontrol")[0].innerText;
    let name = document.querySelectorAll(".workitemcontrol input")[0].value
        .toLowerCase()
        .replaceAll(":", "")
        .replaceAll("#", "")
        .replaceAll("\"", "")
        .replaceAll(" ", "-")
        .replaceAll("/", "-")
        .replace(/--+/g, '-');

    const before = "ěščřžýáíéúůóťďňĚŠČŘŽÝÁÍÉÚŮŤĎŇ";
    const after = "escrzyaieuuotdnESCRZYAIEUUTDN";

    let nameNew = "";

    for (i in name) {
        const index = before.indexOf(name[i]);
        if (index > -1)
            nameNew += after[index];
        else
            nameNew += name[i];
    }

    let items = document.querySelectorAll(".la-group-title");

    for (let i = 0; i < items.length; i++) {
        if (items[i].innerText === "Parent") {
            let content = window.getComputedStyle(items[i].parentElement.lastChild.firstChild.firstChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild, ':before').getPropertyValue('content');
            switch (content) {
                case '"\ueac5\"': {
                    type = "feature";
                    break;
                }
                case '"\ueabc\"': {
                    type = "bugfix";
                    break;
                }
            }
        }
    }

    const result = `${type}/${id}-${nameNew}`;
    navigator.clipboard.writeText(result);
    console.log(result);
    document.getElementById("branch-name-generator").id = "branch-copied";
});

let styleElem = document.head.appendChild(document.createElement("style"));
styleElem.innerHTML = '#branch-name-generator:before {content: "\\ea35";}\n#branch-copied:before {content :"\\ea13";}';

function waitFor(condition, callback) {
    if(!condition())
        window.setTimeout(waitFor.bind(null, condition, callback), 100);
    else
        callback();
}

let lastPage = ""

function waitForNewPage() {
    let page = window.location.href;
    if(page && lastPage !== page) {
        lastPage = page;
        waitFor(() => document.querySelector(".menu-bar"), () => {
            menu = document.querySelector(".menu-bar");
            menu.insertBefore(button, menu.firstElementChild);
        });
    }
    window.setTimeout(waitForNewPage.bind(null), 100);
}

waitForNewPage();
