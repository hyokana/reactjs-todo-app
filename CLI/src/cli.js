import arg from 'arg';
import fetch from 'node-fetch';

import { listTask, syncTask, finishTask, promptComplete } from './main';

import todos from '../model/todos';

const urlremote = 'http://13.250.43.79:5984/hg_todos';
const auth = { username: 'admin', password: 'iniadmin' };
const dbname = 'hg_todos';

function parseArgumentsIntoOptions(rawArgs){

    rawArgs = rawArgs.slice(2);
    if(rawArgs.length < 1)
        return null;

    try{
        const args = arg({
            '--done': String,
            '--complete': Boolean,
            '--sync': Boolean,
            '-d': '--done',
            '-c': '--complete',
            '-s': '--sync',
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

function checkInternet(){

    const TIMEOUT_INTERNET_CHECK = 5; // seconds

    const checkInternet = (url) => {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('No internet connection'));
            }, TIMEOUT_INTERNET_CHECK * 1000);

            fetch(url, { method: 'HEAD' }).then(() => {
                clearTimeout(timer);
                resolve(true);
            }).catch(() => {
                clearTimeout(timer);
                reject(new Error('No internet connection'));
            });
        });
    }

    return checkInternet;
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    // // initiate local db using PouchDB
    // var PouchDB = require('pouchdb');
    // var dblocal = new PouchDB(dbname, {
    //     auto_compaction: true,
    //     revs_limit: 2
    // });

    // // initiate remote db using PouchDB
    // var dbremote = new PouchDB(urlremote + dbname, {
    //     auth: auth
    // });

    // // check internet and replicate db remote to db local
    // try {
    //     await checkInternet(urlremote);
    //     await dblocal.replicate.from(dbremote, {
    //         batch_size: 1000,
    //         batches_limit: 2,
    //     });
    // } catch (err) {
    //     console.e(err);
    // }

    // try {
    //     await checkInternet(this.urlRemote);
    //     await this.dbLocal.replicate.from(this.dbRemote, {
    //       batch_size: 1000,
    //       batches_limit: 2,
    //     });
    //   } catch (err) {
    //     console.e(err);
    //   }

    // console.log(db);

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