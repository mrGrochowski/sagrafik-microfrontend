export const getLatLonFromCityName = async (cityName) => {

    const request = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${cityName}&format=json&apiKey=1b48259b810e48ddb151889f9ea58db0`);
    
    const parse = await request.json();
    const {lat,lon} = parse.results[0]
    return {lat,lon}
}