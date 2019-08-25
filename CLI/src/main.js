import chalk from 'chalk';
import moment from 'moment';
import inquirer from 'inquirer';

export function listTask(todos){
    console.log("On Process: Fetching Task...\n");

    for(var t of todos.data)
        if(t.status < 0){
            console.log(chalk.blue.bold(t.todo))
            console.log(chalk.grey(t._id + " | " + moment(t.createdAt).format('YYYY-MM-DD HH:mm')) + "\n")
        }
    console.log("\n%s Fetching process finished...", chalk.green.bold('DONE: '));
    return 
}

export async function syncTask(todos){
    console.log('On Process: Syncronizing Task...');
    console.log("%s Syncronizing process finished...", chalk.green.bold('DONE: '));
}

export async function finishTask(todos, done){
    console.log("On Process: Finishing Task...\n");

    await todos.editItem(done, {
        status: 1
    });
    await todos.upload();

    console.log("\n%s Finishing process finished...", chalk.green.bold('DONE: '));
}

export async function promptComplete(todos){
    var selArray = ['Cancel'];
    for(var t of todos.data)
        if(t.status < 0)
            selArray.push(t._id + "|" + t.todo);

    if(selArray.length < 2)
        return {status: 'notask'};

    var questions = [];
    questions.push({
        type   : 'list',
        name   : 'id',
        message: 'Please choose which task to complete',
        choices: selArray,
    });

    const answers = await inquirer.prompt(questions);
    if(answers.id === 'Cancel')
        return {status: 'cancel'};
    
    var id = answers.id.split('|')[0];

    return {status: 'OK', id};
}
