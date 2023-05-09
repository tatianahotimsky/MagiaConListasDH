function getData(){
    return document.getElementById("source").value;
}

function cleanData(toClean) {
    toClean = JSON.parse(toClean)
    console.log(toClean);
    return toClean.data.enrollments.map(e => { 
        const {first_name, last_name, email} = e.user;
        return {first_name, last_name, email}
    })
}

function jsonToCsv(items) {
    console.log("items", items)
    const header = Object.keys(items[0]);
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
  
    return csv;
  }

function downloadCSVFile(csv_data) {

    console.log("csv", csv_data)
    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = `data-${new Date().getTime()}.csv`;
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}

function generateDestination(data) {
    //data = data.replace("\"", "");
    document.getElementById("destination").innerText = data;
}

function doMagic(){
    generateDestination(jsonToCsv(cleanData(getData())));
}