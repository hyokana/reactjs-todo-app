import chalk from 'chalk';
import todos from '../model/todos';


export async function listTask(){
    console.log('On Process: Fetching Task...');

    console.log(todos);


    console.log("%s Fetching process finished...", chalk.green.bold('DONE: '));
}

export async function syncTask(){
    console.log('On Process: Syncronizing Task...');
    console.log("%s Syncronizing process finished...", chalk.green.bold('DONE: '));
}

export async function finishTask(){
    console.log('On Process: Finishing finishTask...');
    console.log("%s Finishing process finished...", chalk.green.bold('DONE: '));
}

