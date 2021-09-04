
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple

const GCD = {



};



GCD.init = function () {

	GCDdivGeocoder.innerHTML = `
	<p>Enter an address or location<br>
		<input type=search id="inpAddress" placeholder="San Francisco CA" oninput="GCD.geocoderAddress();" title="Thank you Google Maps API!">
			<small>Geocoder courtesy of <a href="https://developers.google.com/maps/documentation/geocoding/"
				target="_blank">Google Maps</a></small>
	</p>
	
	<details>
		<summary>Geocoder details</summary>
		<div id="GCDdivGeocoderMessage"></div>
	</details>`;
	
	GCD.geocoder = new google.maps.Geocoder();

	placeAutocomplete = new google.maps.places.Autocomplete( inpAddress );

	placeAutocomplete.addListener( 'place_changed', () => GCD.setGeocoderMessage( placeAutocomplete.getPlace() ) );

};

GCD.geocoderAddress = function () {

	GCD.geocoder.geocode( { "address": inpAddress.value }, ( results, status ) => {

		if ( status !== google.maps.GeocoderStatus.OK ) {

			GCDdivGeocoderMessage.innerHTML = 'Geocode was not successful for the following reason: ' + status;

		}

	} );

};

GCD.setGeocoderMessage = function ( place ) {


	const hash = `"title":"${ inpAddress.value }","latitude":${ place.geometry.location.lat() },"longitude":${ place.geometry.location.lng() },"offsetUTC":${ place.utc_offset_minutes }`;

	location.hash = hash;

	let txt;

	if ( !place.geometry ) {

		txt = `The place returned contains no data`;

	} else {

		txt = `
		<p>
			${ inpAddress.value }
		</p>
		<p>
			Latitude: ${ place.geometry.location.lat().toLocaleString() }<br>
			Longitude: ${ place.geometry.location.lng().toLocaleString() }<br>
			UTC Offset: ${ place.utc_offset_minutes }<br>
		</p>
		<p>
			Address:<br>
			${ place.adr_address }</p>
			${ ( place.vicinity ? '<p>Vicinity:<br>' + place.vicinity + '</p>' : '' ) }
			<p>hash<br> ${ hash }</p>
		`;

		GCDdivGeocoderMessage.innerHTML = txt;

	}

};
