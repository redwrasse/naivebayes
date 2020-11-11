
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

    let query = document.getElementById("query").value;
    let queryWords = query
        .toLowerCase()
        .replace(/[.]/g, '')
        .replace(/[^a-zA-Z ]/g, "")
        .split(/\s/);

    let docA = document.getElementById("docA").value;
    let docB = document.getElementById("docB").value;
    let docC = document.getElementById("docC").value;

    let wcA = wordCounts(docA);
    let wcB = wordCounts(docB);
    let wcC = wordCounts(docC);

    let docs = ["docA", "docB", "docC"];
    let allWc = [wcA, wcB, wcC];
    let docProbs = {"docA": 1.0, "docB": 1.0, "docC": 1.0};
    for (var i = 0; i < queryWords.length; i++) {
        let qword = queryWords[i];
        let qwordCounts = {"docA": 0, "docB": 0, "docC": 0};
        for (var j = 0; j < 3; j++) {
            if (qword in allWc[j]) {
                qwordCounts[docs[j]] = allWc[j][qword];
            }
        }
        let totalQWordCounts = sumValues(qwordCounts);
        for (j = 0; j < 3; j++) {
            if (totalQWordCounts === 0) {
                docProbs[docs[j]] = 0.0;
            } else {
                docProbs[docs[j]] = docProbs[docs[j]] * qwordCounts[docs[j]] / totalQWordCounts;
            }
        }
    }
    let totalProbs = sumValues(docProbs);
    for (j = 0; j < 3; j++) {
        if (totalProbs === 0.0) {
            docProbs[docs[j]] = 0.0;
        } else {
            docProbs[docs[j]] = docProbs[docs[j]] / totalProbs;
        }
    }
    console.log(docProbs);
    return docProbs;

}

function wordCounts(doc) {
    let words = doc.replace(/[.]/g, '').replace(/[^a-zA-Z ]/g, "")
        .split(/\s/);
    let freqMap = {};
    words.forEach(function(w) {
        let wl = w.toLowerCase();
        if (!freqMap[wl]) {
            freqMap[wl] = 0;
        }
        freqMap[wl] += 1;
    });
    return freqMap;
}


function clearChildren(node) {
    while (node.firstChild !== null)
        node.removeChild(node.firstChild);
}

function sumValues( obj ) {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
        }
    }
    return sum;
}
