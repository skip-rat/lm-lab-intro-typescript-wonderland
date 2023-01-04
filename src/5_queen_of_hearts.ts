import { endAdventure } from '..';
import { wakeUp } from './6_wake_up';
import { askQuestion, clear, print } from '../console';

const verdicts = ['Guilty', 'Not Guilty'] as const;
type Verdict = typeof verdicts[number];

const witnessNames = ['The March Hare', 'The Mad Hatter', 'The White Rabbit', 'The Cheshire Cat'];

interface Witness {
	name: string;
	giveEvidence: () => Verdict;
}

export function meetTheQueen(): void {
	clear(true);
	print('The Queen has put you on trial for stealing tarts.');

	let guilty: boolean = false;

	let witnesses: Witness[] = getWitnesses(witnessNames);

	if (!witnesses || witnesses.length === 0) {
		print(`No witnesses have come forward to defend you.`);
		guilty = true;
	}

	let witnessCount = 0;

	witnesses.forEach((witness) => {
		witnessCount++;
		print(
			`${witness.name} gives their evidence: ${witness.giveEvidence()}`
		);
		if (witness.giveEvidence() === 'Guilty') {
			guilty = true;
		}
	});

	if (witnessCount < 4 || guilty) {
		print(`You have been found guilty! "Off with her head!" 😱`);
		return endAdventure();
	} else {
		print(`You have been found NOT GUILTY! Thank goodness. 🥳`);
		print('Time to wake up...');
		return askQuestion('Press ENTER to continue! ', wakeUp);
	}
}

// NOTE: could also return the type: Witness[]
function getWitnesses(witnessNames: string[]): Array<Witness> {
	/*return [
		{
			name: 'The Mad Hatter',
			giveEvidence: () => 'Not Guilty', // implicit return
		},
		{
			name: 'The March Hare',
			giveEvidence: () => { return 'Not Guilty' }, // explicit return (same result as above!)
		},
		{
			name: 'The Cheshire Cat',
			giveEvidence: () => 'Not Guilty',
		},
		{
			name: 'The White Rabbit',
			giveEvidence: () => 'Guilty',
		},
	];*/

	return witnessNames.map(n => { return { name: n, giveEvidence: () => 'Not Guilty',}});
}
