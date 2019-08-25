# Efishery WebApp and CLI
Todo list offline-first web app using ReactJS and CLI for listing and completing task.

### Intallation
This app use Node.js to run.

#### Webapp
Install dependencies on webapp folder, and 'npm start'.

```sh
$ cd webapp
$ npm i
$ start npm
```

How to use?
- Select tags by clicking select form on header.
- Type what task to do, and press enter.
- To delete task, click on 'trash' icon on the right of the task. If you wanna edit it, click on 'pencil' icon on the right of the task.
- To finish the task, just click on the task and its automatically change status in to finished, to cancel task, click again on the task.

#### CLI App
Intall dependencies on cli folder.

```sh
$ cd cli
$ npm i
```
After installation of dependencies there is several ways to run this app.

#### Direct use
open 'cli/bin' folder, type 'node efishery'
```sh
$ cd cli/bin
$ node efishery
```

#### Intall cli into global
Install cli program into npm global package.
```sh
$ cd cli
$ npm i -g ./
$ efishery
```

### Parameters
| PARAM | FUNCTION | DESCRIPTION
| ------ | ------ | ------ |
| --done | efishery --done [task_id] | Complete task by type task id after parameter |
| --complete | efishery --complete | Complete task by select id from list |
| -d | efishery -d [task_id] | --done alias |
| -c |  efishery -c | --complete alias |

How to use?
- Type 'efishery' on command prompt to list all task.
- Type 'efishery -c' to complete task by selecting task from list.
- Type 'efishery -d [task_id]' to complete task by id.

### ISSUES
- When using 'efishery -c' application not atumatically exit, press 'ctrl + c' to exit.
- Ignore 'Missing' error on test.


License
----

MIT

**Free Software, Hell Yeah!**
