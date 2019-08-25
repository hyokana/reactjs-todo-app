import PouchyStore from '../temp_package/pouchy-store/PouchyStore';
import config from './config';

class Todos extends PouchyStore {
    get name() {
        return this._name;
    }

    setName(dbname) {
        this._name = dbname;
    }

    get urlRemote() {
        return config.dburl;
    }

    get optionsRemote() {
        return {
            auth: config.dbauth,
        };
    }

    sortData(data) {
        data.sort((one, two) => {
            const statusA = one.status;
            const statusB = one.status;
            const dateA = one.createdAt;
            const dateB = one.createdAt;

            if(statusA === statusB)
                return (dateA > dateB) ? -1 : (dateB < dateA) ? 1 : 0;
            
            return statusA < statusB ? 1 : -1;
        });
    }
}

/**
 * id, text, status[new|read|done], created_at, created_by, deleted_at, deleted_by
 */
export default new Todos();
