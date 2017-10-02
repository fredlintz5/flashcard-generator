
function ClozeCard(text, cloze) {
	let text2 = text.toLowerCase();
	let cloze2 = cloze.toLowerCase();

	if (text2.search(cloze2) < 0) {
		console.log("\n2nd parameter must be in Cloze question...you failed at making questions. Start over.\n".red);
		process.exit(0);
	} else {
		this.text = text;
		this.cloze = cloze;
	}
}


function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}


module.exports = {
	Basicard: BasicCard,
	ClozeCard: ClozeCard
}

