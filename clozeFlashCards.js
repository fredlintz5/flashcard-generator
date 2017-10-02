
const colors = require('colors');
const inquirer = require('inquirer');
const cards = require('./cards.js');
const fs = require('fs');

let adminCards = [{"text":"George Washington was the first president of the United States","cloze":"George"},{"text":"Abraham Lincoln was the 16 th president of the United States","cloze":"16"},{"text":"Fred Lintz is the coolest","cloze":"Fred"}];
let playerCards = [];
let correct = 0;
let wrong = 0;


gameStart();



function gameStart() {
	inquirer.prompt([{
		name: 'play',
		message: 'Would you like to play the flashCard game?',
		type: 'confirm'
	}]).then((ans) => {
		if (ans.play) {
			howMany();
		} else {
			console.log('\nWhy did you start this program anyway? Good bye!\n'.red);
			return;
		}
	})
}


function howMany() {
	inquirer.prompt([{
		name: 'would',
		message: 'Would you like to create your own questions?',
		type: 'confirm'
	}]).then((ans) => {
		if (ans.would) {
			inquirer.prompt([
			{
				name: 'number',
				message: "How many questions are we creating? (Please input a number...I dont have any validation here...)"
			}]).then((ans) => {
				createQuestions(ans.number);
			})
		} else {
			console.log('\nGreat! That means we can use our premade questions to play.\n'.cyan);
			gamePlay(adminCards);
		}
	})
}


function createQuestions(num) {
	var counter = num;

	inquirer.prompt([
	{
		name: 'text',
		message: "Enter the full Cloze Question text here."
	},
	{
		name: 'cloze',
		message: "Enter text to remove from the Cloze question."
	}
	]).then((answers) => {
		let newCard = new cards.ClozeCard(answers.text, answers.cloze);
		playerCards.push(newCard);
		counter--;
		if (counter === 0) {
			console.log("\nAll done making questions, let's play!\n".cyan);
			gamePlay(playerCards);
		} else {
			createQuestions(counter);
		}
	})
}


function gamePlay(array) {
	console.log('\nFill in the blank to answer each question\n'.green);
	promptQuestions(array, array.length, 0);
}


function promptQuestions(array, num, i) {

	let number = num;
	let index = i;

	if (number !== 0) {
		inquirer.prompt([
		{
			name: 'answer',
			message: `${array[index].text.replace(array[index].cloze, '...')}`
		}
		]).then((ans) => {
			if (ans.answer === array[index].cloze) {
				console.log(`\nHooray! ${array[index].text}\n`.green);
				number--;
				index++;
				correct++;
				promptQuestions(array, number, index);
			} else {
				console.log(`\nSorry, ${array[index].text}\n`.red);
				number--;
				index++;
				wrong++;
				promptQuestions(array, number, index);
			}
		})
	} else {
		console.log(`\n         End of Questions`.cyan);
		console.log('----------------------------------'.cyan);
		console.log(`   You got ${correct} questions correct!`.cyan);
		console.log(`    You got ${wrong} questions wrong!\n`.cyan);
		return;
	}
}


// cards.ClozeCard.prototype.makeFront = function() {
// 	let front = this.text.replace(`${this.cloze}`, `...`);
// 	console.log(front);
// }

// cards.ClozeCard.prototype.makeBack = function() {
// 	console.log(this.text);
// }


// Initial cli prompt: 
// Would you like to play a flash card game? y/n?
// *yes: Would you like to create your own questions/answers? y/n
// 		*yes: How many questions do you want to create? (no more than 5)
// 			*createQuestions(5);
// 			Are you ready to play your new game? y/n
// 				yes: gamePlay(userFile);
// 				*no: 'That was a lot of hard work for nothing...see you later!'
// 		*no: 'Great, we'll use our premade database of questions!'
// 			gamePlay(premadeFile);
// *no: 'Why did you start this prompt anyway? Good bye!'











