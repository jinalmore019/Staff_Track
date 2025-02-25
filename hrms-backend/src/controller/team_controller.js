const ApiError = require("../utils/error");
const TeamModel = require("../model/team_model");
const { EMPLOYEE_ROLE } = require("../config/string");
// const { teamValidation } = require("../config/joi.validation")

async function addTeam(req, res, next) {
  try {
    req.body.companyId = req.id;

        // const teamValid = teamValidation.validate(req.body)
        // if (teamValid.error) {
        //     return next(new ApiError(403, teamValid.error.details[0].message))
        // }

        const team = new TeamModel(req.body)
        await team.save()
        res.status(201).json({ statusCode: 201, success: true, data: team, message: "team created successfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function getTeam(req, res, next) {
    try {
        debugger;
        if (req.role === EMPLOYEE_ROLE) {
            const team = await TeamModel.find({
                $or: [
                    { members: req.id },
                    { leaderId: req.id }
                ],
                isWorking: true
            })
            .populate("project")
            .populate({
                path: "leaderId",
                populate: [
                    { path: "designation" },
                    { path: "department" }
                ]
            })
            .populate({
                path: "members",
                populate: [
                    { path: "designation" },
                    { path: "department" }
                ]
            })
            .sort({ createdAt: -1 });
            
            // const responseData = {
            //     success: true,
            //     data: team.map(team => ({
            //         leader: {
            //             project: team.project,
            //             children: [{
            //                 ...team.leaderId.toObject(),
            //                 children: team.members.map(member => member.toObject())
            //             }]
            //         },
            //         companyId: team.companyId,
            //         startDate: team.startDate,
            //         endDate: team.endDate,
            //         isWorking: team.isWorking,
            //         createdAt: team.createdAt,
            //         updatedAt: team.updatedAt,
            //         id: team.id
            //     }))
            // };

            // res.status(200).json(responseData);
            res.status(200).json({ success: true, data: team });

        }
        else {
            const teams = await TeamModel.find({ companyId: req.id,isWorking:true })
                .populate("project")
                .populate({
                    path: "leaderId",
                    populate:[ { path: "designation" } ,  { path: "department" }]
                })
                .populate({
                    path: "members",
                    populate:[ { path: "designation" } ,  { path: "department" }]
                })
                .sort({ createdAt: -1 });
            
            res.status(200).json({ success: true, data: teams });
        }
    } catch (e) {
        next(new ApiError(400, e.message));
    }
}

async function updateTeam(req, res, next) {
    try {
        const team = await TeamModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json({ statusCode: 200, success: true, data: team, message: "team details updated successfully" });
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

async function deleteTeam(req, res, next) {
    try {
        await TeamModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { isWorking: false } }, { new: true })
        res.status(200).json({ statusCode: 200, success: true, message: "team delete sucessfully" })
    } catch (e) {
        next(new ApiError(400, e.message))
    }
}

module.exports = { addTeam, getTeam, updateTeam, deleteTeam };
