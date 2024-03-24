async function dodajToken(parametri = {}){
	let zaglavlje = new Headers();
	
	if(parametri.headers!=null)
		zaglavlje = parametri.headers;
		
	let token = await dajToken();
	zaglavlje.set("Authorization",token);
	parametri.headers = zaglavlje;
	console.log(parametri);
	return parametri;		
}

async function dajToken(){
	let odgovor = await fetch("http://localhost:12000/getJWT");
	let tekst = JSON.parse(await odgovor.text());
	if(tekst.ok != null)
		return tekst.ok;
	else 
		return "0000";
}

