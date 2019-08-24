import arg from 'arg';
import { listTask, syncTask, finishTask } from './main';

function parseArgumentsIntoOptions(rawArgs){

    rawArgs = rawArgs.slice(2);
    if(rawArgs.length < 1)
        return null;

    try{
        const args = arg({
            '--done': String,
            '--sync': Boolean,
            '-d': '--done',
            '-s': '--sync',
        }, {
            argv: rawArgs,
        });

        return {
            done: args['--done'] || null,
            sync: args['--sync'] || false,
        }
    } catch (err) {
        return console.error(err.message);
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    if(!options)
        return await listTask();

    if(options.done)
       return await finishTask(options.done);

    if(options.sync)
        return await syncTask();
}
