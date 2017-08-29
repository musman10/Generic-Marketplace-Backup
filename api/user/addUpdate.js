module.exports = function(user,id){
    /*
        Add/Update Code
    */
    console.log(id);
    console.log(user);
    var msg;
    if(id == 0)
        msg = "User added successfully";
    else if(id > 0)
        msg = "User updated Successfully";
    return {
        message:msg,
        status:'success',
        errors:[]
    }
}