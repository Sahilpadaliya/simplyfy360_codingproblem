// Question 1:

// We have a large and complex workflow, made of tasks. And
// have to decide who does what, when, so it all gets done on time.
// All tasks have dependency on other tasks to complete
// Each task(t) has a
// D[t] = duration of task
// EFT[t] = the earliest finish time for a task
// LFT[t] = the latest finish time for a task
// EST[t] = the earliest start time for a task
// LST[t] = the last start time for a task
// Assume
// that “clock” starts at 0 (project starting time).
// We are given the starting task T_START where the EST[t] = 0 and LST[t] = 0



// time and space complexity of these code is O(n) because of the linear space and linear workflow 





class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.dependencies = [];
        this.earliestStart = 0;
        this.latestFinish = Infinity;
    }

    addDependency(task) {
        this.dependencies.push(task);
    }
}

class Project {
    constructor() {
        this.tasks = new Map();
    }

    addTask(name, duration) {
        const task = new Task(name, duration);
        this.tasks.set(name, task);
        return task;
    }

    addDependency(taskName, dependencyName) {
        const task = this.tasks.get(taskName);
        const dependency = this.tasks.get(dependencyName);
        if (task && dependency) {
            task.addDependency(dependency);
        }
    }

    calculateEFT() {
        const sortedTasks = this.topologicalSort();
        sortedTasks.forEach(task => {
            let earliestFinish = task.earliestStart + task.duration;
            task.dependencies.forEach(dependency => {
                earliestFinish = Math.max(earliestFinish, dependency.earliestStart + dependency.duration);
            });
            task.earliestStart = earliestFinish - task.duration;
        });
    }

    calculateLFT() {
        const sortedTasks = [...this.tasks.values()].reverse();
        sortedTasks.forEach(task => {
            task.latestFinish = task.earliestStart + task.duration;
            task.dependencies.forEach(dependency => {
                task.latestFinish = Math.min(task.latestFinish, dependency.latestFinish - dependency.duration);
            });
        });
    }

    topologicalSort() {
        const inDegree = new Map();
        this.tasks.forEach(task => inDegree.set(task.name, 0));
        
        this.tasks.forEach(task => {
            task.dependencies.forEach(dependency => {
                inDegree.set(dependency.name, inDegree.get(dependency.name) + 1);
            });
        });

        const queue = [];
        inDegree.forEach((degree, taskName) => {
            if (degree === 0) {
                queue.push(this.tasks.get(taskName));
            }
        });

        const sortedTasks = [];
        while (queue.length) {
            const current = queue.shift();
            sortedTasks.push(current);

            current.dependencies.forEach(dependency => {
                inDegree.set(dependency.name, inDegree.get(dependency.name) - 1);
                if (inDegree.get(dependency.name) === 0) {
                    queue.push(dependency);
                }
            });
        }

        return sortedTasks;
    }

    getEarliestCompletionTime() {
        const allTasks = [...this.tasks.values()];
        return Math.max(...allTasks.map(task => task.earliestStart + task.duration));
    }

    getLatestCompletionTime() {
        const allTasks = [...this.tasks.values()];
        return Math.max(...allTasks.map(task => task.latestFinish));
    }
}


