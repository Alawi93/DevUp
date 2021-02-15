const Utils        = require("./models/utils")

Utils.find({},function(err,data){
    if(err){
        console.log(err)
    }
    console.log(data)
})


/*
const test = new Utils({
    skillsets: [
        'Java',
        'HTML',
        'JavaScript',
        'C++',
        'C',
        'C#',
        'MySql',
        'MongoDB'
    ]
})

console.log(test);
test.save()
*/