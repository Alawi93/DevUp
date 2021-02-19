const Utils = require("../models/utils")

function checkSkillSets() {
    Utils.find({}, function (err, data) {
        if (err) {
            console.error(err)

        } else {
            if (data.length == 0) {
                console.log("No skillset records, creates it in DB")
                let test = new Utils({
                    skillsets: [
                        'Java',
                        'HTML',
                        'CSS',
                        'JavaScript',
                        'C++',
                        'C',
                        'C#',
                        'Python',
                        'MySql',
                        'MongoDB'
                    ]
                });
                test.save()
            } else {
                console.log("skillset exist, Accepts")
            }
        }
    })
}

module.exports.checkSkillSets = checkSkillSets;