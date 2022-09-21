// console.log('before');
// getUser(1, (user) => {
//     getRepositories(user.githubUserName, (repos) => {
//      getCommits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// });


getUser(1)
    .then(user => getRepositories(user.githubUserName))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('commits', commits))
    .catch(err => console.log(err.message))

console.log('after')



 function getUser(id){
    return new Promise((resolve, reject) => {
        // async work
        setTimeout(() =>{
            console.log('Reading user from db');
            resolve({id :id, githubUserName: 'kp'});
        },2000);
    });
 }


 function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('repo list');
            resolve(['repo1', 'repo2', 'repo3']);
        },2000);
    });
}

function getCommits(repos){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github api');
            resolve(['commit']);
        },2000);
    });
 }