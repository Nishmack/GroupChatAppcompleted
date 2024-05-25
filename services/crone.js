const { CronJob } = require('cron');
const Sequelize = require('sequelize');


const Content = require('../models/content');
const Archived = require('../models/archivedchat');
const GroupChat = require('../models/groupchat');
const GroupMember = require('../models/groupmember');



//create new instance of cron job
exports.job = new CronJob(
	'0 0 * * *', // cronTime. the schedule for the CronJob.is a cron expression that means "at 00:00 (midnight) every day".
	function () {
        archivedFunction()
	}, // onTick parameter.function that is executed each time the cron job triggers (i.e., at midnight every day).onTick function calls
    
	null, // onComplete parameter, a function that is executed when the cron job stops.null means no function is provided, so nothing will happen when the job stops.
	true, // start.the cron job will start running as soon as it is created.
	'Asia/Kolkata' // timeZone. parameter, specifying the time zone in which the cron job's schedule should be interpreted.
);



async function archivedFunction(){
    try{
        //date calc
        const date = new Date();//Creates a new Date object representing the current date and time and assigns it to the variable date
        let _5daysBefore = new Date();//Creates another Date object representing the current date and time and assigns it to the variable _5daysBefore
        _5daysBefore.setDate(date.getDate() - 5);//Modifies the _5daysBefore date to be 5 days before the current date by using the setDate method.

        //fetch content record
        const Contents = await Content.findAll({//Uses await to wait for the result of the findAll method from the Content model..Fetches all Content records where the createdAt date is less than (lt) 5 days before the current date.store resultent records in content arr
            where: {
                createdAt: {
                    [Sequelize.Op.lt]:_5daysBefore
                } 
            }
        })

        //fetching grp chat records
        for(let i=0;i<Contents.length;i++){ //looping through contents
            const GroupChats = await GroupChat.findOne({//For the current Content record, uses await to wait for the result of the findOne method from the GroupChat model.
                where: {
                    contentId: Contents[i].id//Fetches a single GroupChat record where the contentId matches the id of the current Content record.
                }
            });
            if(GroupChats == null){
                continue;
            }
            const GroupMembers = await GroupMember.findOne({//fetch grp m/m records.Fetches a single GroupMember record where the id matches the groupmemberId of the current GroupChats record.
                where: {
                    id: GroupChats.groupmemberId
                }
            });
            await Archived.create({//create record.wait for the creation of a new Archived record.with properties
                chatcontent: Contents[i].chatcontent,//chatcontent from the current Content record.
                groupId: GroupChats.groupId,//groupId from the current GroupChats record.
                groupmemberId:  GroupChats.groupmemberId,
                userId: GroupMembers.userId
            })
        }
    }catch(err){
        console.log(err)
    }
}




