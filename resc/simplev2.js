LIGHTMODE = true;

darkModeConversion = {
    accent: "#663399",
    primary: "#323133",
    secondary: "#364d19",
    Fpri: "#121212",
    Fsec: "#E0E0E0",
    bgcolor: "#121212",
    link: "#E0E0E0"
}

lightModeConversion = {
    accent: "#663399",
    primary: "#D7D3DC",
    secondary: "#D1D346",
    Fpri: "#FFFFFF",
    Fsec: "#000000",
    bgcolor: "#FFFFFF",
    link: "#0070E0"
}

function Policy(type) {
    if (type === "simple")
    {
        simplePolicy.hidden = false;
        complexPolicy.hidden = true;
    }
    else if (type === "complex")
    {
        simplePolicy.hidden = true;
        complexPolicy.hidden = false;
    }
    else {console.error(`Error Changing policy. The type provided was ${type}`)}
}

function onResize(theTable) {
    theTable.setAttribute("width", ((window.innerWidth)*(45/100)));
}

function toggleTheme() {
    Array.from(document.getElementsByClassName('altercolor')).forEach(element => {
        try
        { element.setAttribute((element.hasAttribute('bgcolor') ? 'bgcolor' : 'color'), (LIGHTMODE ? darkModeConversion[element.dataset.colortype] : lightModeConversion[element.dataset.colortype])); }
        catch (e) {console.error(`Error toggling theme: ${e}`);}
        });
    document.body.setAttribute('link', (LIGHTMODE ? darkModeConversion['link'] : lightModeConversion['link']))
    LIGHTMODE = (LIGHTMODE) ? false : true;
    console.log(`Lightmode = ${LIGHTMODE}`)
}

document.addEventListener("DOMContentLoaded", () => {
    // basically makes sure that the policy vars are loaded after entire page has been loaded
    simplePolicy = document.getElementById("simplePolicy");
    complexPolicy = document.getElementById("complexPolicy");
    policyTable = document.getElementById("policytable");
    news = document.getElementById("news");

    onResize(policyTable);

    window.addEventListener("resize", () => onResize(policyTable));

    
    
    
});

fetch("../resc/schools.json")
        .then(Response => {
            if (!Response.ok)
                throw new Error("JSON was not ok");
            return Response.json();
        })
        .then(data => {
            console.log(data);
            try {
                tempNews = "";
                now = new Date().getTime();
                data.forEach(schoolDistrict => {
                    dateofclosing = new Date(schoolDistrict.closing_date);
                    tempNews = tempNews + "      " + `${schoolDistrict.district} (${schoolDistrict.abbreviation}) is closing on ${dateofclosing .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}, which is in ${Math.floor((dateofclosing - now) / (1000 * 60 * 60 * 24))} days.`;
                });
                news.textContent = tempNews;
            } catch (error) {
                console.error(`Invalid json: ${error}`);
            }

        })
        .catch(error => {
            console.error("Error Loading JSON:", error);
        })
