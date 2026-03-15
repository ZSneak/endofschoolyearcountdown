async function getFromCanvas(apikey, canvasURL) {
    try {
    response = await puter.net.fetch(`${canvasURL}/api/v1/courses?per_page=200`, {
        headers: {
            'Authorization': `Bearer ${apikey}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {throw new Error(`Response Status ${response.status}`); }

    result = await response.json();
    console.log(result);
    } catch (error) { console.error(`Error fetching data. ${error}`);}
}