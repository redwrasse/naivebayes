
function setDoc(source, elementId) {
    fetch(source)
        .then(response => response.text())
        .then((data) => {
            document.getElementById(elementId).value = data;
        });
}

setDoc('./docA.txt', 'docA');
setDoc('./docB.txt', 'docB');
setDoc('./docC.txt', 'docC');

var likelihoodsElement = document.getElementById("likelihoods");
clearChildren(likelihoodsElement);

const docs = ["docA", "docB", "docC"];
const names = {
    "docA": "Document A",
    "docB": "Document B",
    "docC": "Document C",
};

for (var i = 0; i < docs.length; i++) {
    var tr = likelihoodsElement.appendChild(document.createElement("tr"));
    var td = tr.appendChild(document.createElement("td"));
    td.textContent = names[docs[i]];

    td = tr.appendChild(document.createElement("td"));
    var p = Math.random();
    td.textContent = `${p}`;

    td = tr.appendChild(document.createElement("td"));
    var div = td.appendChild((document.createElement("div")));
    div.classList.add("bar");
    div.style.width = `${Math.floor(p*40)}em`;
}


function clearChildren(node) {
    while (node.firstChild !== null)
        node.removeChild(node.firstChild);
}

