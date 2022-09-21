console.log('before');
getUser(1, (user) => {
    console.log("user",user);

    getRepositories(user.githubUserName, (repos) => {
        console.log('repos',repos);
    });
});

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