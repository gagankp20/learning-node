// console.log('before');
// getUser(1, (user) => {
//     getRepositories(user.githubUserName, (repos) => {
//      getCommits(repos, (commits) => {

//              });
        
        
//     });
// });
// console.log('after')

console.log('before');
getUser(1, getRepositories);
console.log('after')

//NAMED FUNCTIONS
function getRepositories(user){
    getRepositories(user.githubUserName, getCommits)
}

function getCommits(repos){
    getCommits(repos, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}
//end named function


 function getUser(id, callback){
    setTimeout(() =>{
        console.log('Reading user from db');
        callback({id :id, githubUserName: 'kp'});
    },2000);
 }


 function getRepositories(username, callback){
    setTimeout(() => {
        console.log('repo list');
        callback(['repo1', 'repo2', 'repo3']);
    },2000);
}

function getCommits(repos, callback){
    setTimeout(() => {
        console.log('calling github api');
        callback(['commit']);
    }, 2000);
 }

 displayCommits('first')

