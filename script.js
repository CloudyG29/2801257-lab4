async function searchCountry(countryName) {
    try {
        // Show loading spinner
        const spinner = document.getElementById("loading-spinner");
        spinner.classList.remove("hidden");
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();
        const country = data[0];

        console.log(country);

        // Update DOM
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        // Fetch bordering countries
        const borders = country.borders;
        const borderSec=document.getElementById("bordering-countries")
        borderSec.replaceChildren();
        for (const border of borders){

            console.log(border);
            try {
                const response2 = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const data2 = await response2.json();
                const country2 = data2[0];
                console.log(country2);
                const item =  document.createElement('div');
                item.innerHTML=`
                <h2>${country2.name.common}</h2>
                <img src="${country2.flags.svg}" alt="${country2.name.common} flag">
                `;
                
                borderSec.appendChild(item);
                
            } catch (error) {
                console.log(error);
                document.body.classList.add("error")
                alert("No neighbouring countries");
            }    
        }
        // Update bordering countries section

    } catch (error) {
        // Show error message
        console.log(error);
        const country = document.getElementById('country-input');
        country.classList.add("error");
        
        alert("Invalid country");
    } finally {
        // Hide loading spinner
        const spinner = document.getElementById("loading-spinner");
        spinner.classList.add("hidden");
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});