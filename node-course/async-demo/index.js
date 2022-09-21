/*CALL BACK HELL
console.log('before');
getUser(1, (user) => {
console.log('users', user)
    getRepositories(user.githubUserName, (repos) => {
        console.log(user.githubUserName, repos)
        getCommits(repos, commits => {
                
        });
        
    });

});

*/


//NAMED FUNCTIONS
function displayCommits(commits){
    console.log(commits);
}

getUser(1,getRepositories);


function getRepositories(user){
    console.log('users', user)
    getRepositories(user.githubUserName, getCommits)
}

function getCommits(repos){
    console.log(user.githubUserName, repos)
        getCommits(repos, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}



console.log('after');

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
    },1000)
 }

 function getCommits(repo, callback)
 {
    callback('abc');
 }