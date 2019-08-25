

import fetch from 'node-fetch';

const urlremote = 'http://13.250.43.79:5984/hg_todos';
const auth = { username: 'admin', password: 'iniadmin' };
const dbname = 'hg_todos';

function pouchdb(){

    // initiate local db using PouchDB
    var PouchDB = require('pouchdb');
    var dblocal = new PouchDB(dbname, {
        auto_compaction: true,
        revs_limit: 2
    });

    // initiate remote db using PouchDB
    var dbremote = new PouchDB(urlremote + dbname, {
        auth: auth
    });

    // check internet and replicate db remote to db local
    try {
        await checkInternet(urlremote);
        await dblocal.replicate.from(dbremote, {
            batch_size: 1000,
            batches_limit: 2,
        });
    } catch (err) {
        console.e(err);
    }

    try {
        await checkInternet(this.urlRemote);
        await this.dbLocal.replicate.from(this.dbRemote, {
        batch_size: 1000,
        batches_limit: 2,
        });
    } catch (err) {
        console.e(err);
    }

    console.log(db);
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

export default pouchdb;