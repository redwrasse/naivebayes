
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


const docs = ["docA", "docB", "docC"];
const names = {
    "docA": "Document A",
    "docB": "Document B",
    "docC": "Document C",
};

function naiveBayes() {

    var likelihoodsElement = document.getElementById("likelihoods");
    clearChildren(likelihoodsElement);
    let results = computeNaiveBayes();

    for (var i = 0; i < docs.length; i++) {
        var tr = likelihoodsElement.appendChild(document.createElement("tr"));
        var td = tr.appendChild(document.createElement("td"));
        td.textContent = names[docs[i]];

        td = tr.appendChild(document.createElement("td"));
        var p = results[docs[i]];
        td.textContent = `${(p * 100).toFixed(1)}%`;

        td = tr.appendChild(document.createElement("td"));
        var div = td.appendChild((document.createElement("div")));
        div.classList.add("bar");
        div.style.width = `${Math.floor(p*40)}em`;
    }

}

// Compute Naive Bayes for given query and documents
function computeNaiveBayes() {
    // todo("implement")
    let results = {
        "docA": Math.random(),
        "docB": Math.random(),
        "docC": Math.random(),
    };
    return results;
}


function clearChildren(node) {
    while (node.firstChild !== null)
        node.removeChild(node.firstChild);
}

