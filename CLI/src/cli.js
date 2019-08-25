import arg from 'arg';

import { listTask, syncTask, finishTask, promptComplete } from './main';

import todos from '../model/todos';

function parseArgumentsIntoOptions(rawArgs){

    rawArgs = rawArgs.slice(2);
    if(rawArgs.length < 1)
        return null;

    try{
        const args = arg({
            '--done': String,
            '--complete': Boolean,
            '-d': '--done',
            '-c': '--complete',
        }, {
            argv: rawArgs,
        });

        return {
            done: args['--done'] || null,
            complete: args['--complete'] || false,
            sync: args['--sync'] || false,
        }
    } catch (err) {
        return console.error(err.message);
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    if (!todos.isInitialized) {
        todos.setName("hg_todos");
        await todos.initialize();
    }
        
    if(!options)
        listTask(todos);

    if(options && options.done && !options.complete)
        await finishTask(todos, options.done);

    if(options && options.complete){
        const answ = await promptComplete(todos);
        if(answ.status && answ.status === 'notask')
            console.log('All task has been finished.')
        if(answ.status && answ.status === 'cancel')
            console.log('Process canceled by user.')
        if(answ.status === 'OK')
            await finishTask(todos, answ.id);
    }

    if(options && options.sync)
        await syncTask(todos);
    
    if (todos.isInitialized) 
        await todos.deinitialize();
    
    return true;
}