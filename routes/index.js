var express = require('express');
var firebase = require('firebase');
var router = express.Router();


/* GET home page. */
router.get('/:lat/:lon', function(req, res, next) {
	res.type('json')
  var errorr;
  try {	
    firebase.initializeApp({
			apiKey: "AIzaSyD0TP7PnIPGS12yE1_plnnsHT7-lNk2gjw",
			authDomain: "smartangkot.firebaseapp.com",
			databaseURL: "https://smartangkot.firebaseio.com",
			projectId: "smartangkot",
			storageBucket: "smartangkot.appspot.com",
			messagingSenderId: "1052207778717",
			appId: "1:1052207778717:web:553fafdd3044fe3f"
		});
	} catch (error) {
		errorr = error;
	}
	
	var patokan = 0;
		async function name() {
			
		var idj;
		let db = firebase.firestore();
		let ref = db.collection("penumpang");

		await ref.get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if(doc.data().naik == false) {
					var lat1 = Number(req.params.lat) * (Math.PI/180);
					var lat2 = doc.data().lat * (Math.PI/180);
					var lon2 = Number(doc.data().lon);
					var lon = Number(req.params.lon) - (doc.data().lon);
					var lon1 = lon * (Math.PI/180);
					
					var jarak = 
						(
							Math.sin(lat1) 
							* Math.sin(lat2)
						)  
							+ 
						(
							Math.cos(lat1) 
							* Math.cos(lat2) 
							* Math.cos(lon1)
						)* 1.609344; 

					if (patokan>jarak) {
						patokan = jarak;
						idj = doc.get().id;
					}
					
					
				}
			});
		}); console.log(patokan);
		res.json({
			jarake: patokan,
			idne: idj
		})
		return patokan;
		
	}
name();

	
  
});

module.exports = router;
