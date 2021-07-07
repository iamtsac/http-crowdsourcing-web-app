var fileLoad = document.getElementById('harFile');
testObject = {};

function remove(obj, itemsToFilter) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (itemsToFilter.includes(property)) {
        delete obj[property];
      }
      else if (typeof obj[property] === "object") {
        remove(obj[property], itemsToFilter);
      }
    }
  }
  return obj;
}

function filterHar() {


  var harFile = document.getElementById("harFile").files[0];
  var reader = new FileReader();
  reader.readAsText(harFile, "UTF-8");

  reader.onload = function () {

    var harContent = JSON.parse(reader.result);

    const itemsToFilter = ["cookies", "content", "postData"];

    var harFiltered = remove(harContent, itemsToFilter);
    console.log(harFiltered); 

    testObject = remove(harContent, itemsToFilter);
    var sensitive = JSON.stringify(testObject, null, 2);
    var blob = new Blob([sensitive], {type: "application/json"});
    var url = URL.createObjectURL(blob); 
    var filteredHar = document.createElement('a');
    filteredHar.download = "sensitive.json"
    filteredHar.href = url;
    filteredHar.textContent = "Download Filtered Har"

    var linkNode = document.getElementById('link')
    if(linkNode.hasChildNodes()){
      linkNode.removeChild(linkNode.childNodes[0]);
    }
    linkNode.appendChild(filteredHar);
    
  } 
}

fileLoad.onchange = filterHar; 
