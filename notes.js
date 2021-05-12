const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.JSON');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
};

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=> note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bold.green('Note Added Successfully!\n'));
    }
    else{
        console.log(chalk.bold.red('Cannot Add Notes with same titles!\n'));
    }
};

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.JSON',dataJSON);
};

const removeNote = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>note.title !== title);
    saveNotes(notesToKeep);
    if(notesToKeep.length === notes.length){
        console.log(chalk.bold.red('Note with title: ' + chalk.white.bold.italic.inverse(' '+title+ ' ') + ' not present!\n'));
    } else{
        console.log(chalk.bold.green('Note Deleted Successfully!\n'));
    }
};

const listNotes = () =>{
    const notes = loadNotes();
    notes.forEach((note)=>{
        console.log(chalk.yellow(note.title) + '\t\t' + chalk.white(note.body))
    });
};

const readNotes = (title) =>{
    const notes = loadNotes();
    const noteToDisplay = notes.find((note)=>note.title === title);
    if(noteToDisplay){
        console.log(chalk.yellow(noteToDisplay.title + ': ') + noteToDisplay.body);
    } else{
        console.log(chalk.bold.red('Note not Found!\n'));
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};