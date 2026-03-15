async function getFromCanvas(apikey, canvasURL) {
    try {
    response = await fetch(`${canvasURL}/api/v1/courses?access_token=${apikey}`);
    if (!response.ok) {throw new Error(`Response Status ${response.status}`); }

    result = await response.json();
    console.log(result);
    } catch (error) { console.error(`Error fetching data. Error: ${error}`);}
}