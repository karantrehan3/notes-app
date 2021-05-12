const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// yargs.version("1.1.0");

yargs.command({
    command:'add',
    describe: 'Add a new Note!',
    builder: {
        title: {
            describe: 'Note\'s Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note\'s Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(chalk.bold.rgb(50, 255, 0)('Adding Note!'));
        console.log(chalk.bold.white('Title: ') + argv.title);
        console.log(chalk.bold.yellow('Body: ') + argv.body);
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command({
    command:'remove',
    describe: 'Remove a Note!',
    builder: {
        title: {
            describe: 'Note\'s Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(chalk.bold.rgb(255, 136, 0)('Removing Note!'));
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command:'list',
    describe: 'List the Notes!',
    handler(){
        console.log(chalk.bold.rgb(0, 175, 255)('Listing Notes!'));
        notes.listNotes();
    }
});

yargs.command({
    command:'read',
    describe: 'Read a Note!',
    builder: {
        title: {
            describe: 'Note\'s Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(chalk.bold.rgb(0, 136, 255)('Reading a Note!'));
        notes.readNotes(argv.title);
    }
});

yargs.parse();