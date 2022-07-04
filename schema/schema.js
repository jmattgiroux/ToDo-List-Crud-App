const graphql = require('graphql');
const User = require('../models/user');
const Task = require('../models/task');
const SubTask = require('../models/subTask');
const Manager = require('../models/manager');

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema,
    GraphQLList, GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const SubTaskType = new GraphQLObjectType({
    name: 'SubTask',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        completed: { type: GraphQLInt },
        task: {
            type: TaskType,
            resolve(parent, args) {
                return Task.findById(parent.taskID);
            }
        }
    })
})

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        completed: { type: GraphQLInt },
        creationDate: { type: GraphQLString },
        dueDate: { type: GraphQLString },
        reminderDate: { type: GraphQLString },
        priority: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userID);
            }
        },
        subTask: {
            type: new GraphQLList(SubTaskType),
            resolve(parent, args) {
                return SubTask.find({ subTaskID: parent.id });
            }
        },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        task: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({ userID: parent.id });
            }
        },
        manager: {
            type: ManagerType,
            resolve(parent, args) {
                return Manager.findById(parent.managerID);
            }
        }
    })
})

const ManagerType = new GraphQLObjectType({
    name: 'Manager',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
        email: { type: GraphQLString },
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({ managerID: parent.id });
            }
        }
    })
})



//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular 
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        subTask: {
            type: SubTaskType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument 
                //by the user
                return SubTask.findById(args.id);
            }
        },
        subTasks: {
            type: new GraphQLList(SubTaskType),
            resolve(parent, args) {
                return SubTask.find({});
            }
        },
        task: {
            type: TaskType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument 
                //by the user
                return Task.findById(args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        },
        user: {
            type: UserType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source
                //this will return the book with id passed in argument 
                //by the user
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        manager: {
            type: ManagerType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source
                //this will return the book with id passed in argument 
                //by the user
                return Manager.findById(args.id);
            }
        },
        managers: {
            type: new GraphQLList(ManagerType),
            resolve(parent, args) {
                return Manager.find({});
            }
        }
    }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSubTask: {
            type: SubTaskType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                completed: { type: GraphQLNonNull(GraphQLInt) },
                taskID: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let subTask = new SubTask({
                    title: args.title,
                    completed: args.completed,
                    taskID: args.taskID
                })
                return subTask.save()
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                completed: { type: GraphQLNonNull(GraphQLInt) },
                creationDate: { type: GraphQLNonNull(GraphQLString) },
                dueDate: { type: GraphQLNonNull(GraphQLString) },
                reminderDate: { type: GraphQLNonNull(GraphQLString) },
                priority: { type: GraphQLNonNull(GraphQLInt) },
                userID: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    description: args.description,
                    completed: args.completed,
                    creationDate: args.creationDate,
                    dueDate: args.dueDate,
                    reminderDate: args.reminderDate,
                    priority: args.priority,
                    userID: args.userID
                })
                return task.save()
            }
        },
        addUser: {
            type: UserType,
            args: {
                //GraphQLNonNull make these field required
                userName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                managerID: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let user = new User({
                    userName: args.userName,
                    email: args.email,
                    managerID: args.managerID
                });
                return user.save();
            }
        },
        addManager: {
            type: ManagerType,
            args: {
                //GraphQLNonNull make these field required
                userName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let manager = new Manager({
                    userName: args.userName,
                    email: args.email
                });
                return manager.save();
            }
        },
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});