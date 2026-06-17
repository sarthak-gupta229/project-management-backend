import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const addMembersToProject = asyncHandler(async (req, res) => {});
const createProject = asyncHandler(async (req, res) => {
  let { name, discription } = req.body;
  const project = await Project.create({
    name,
    discription,
    createdBy: mongoose.Types.ObjectId(req._id),
  });
  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created Successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, discription } = req.body;
  const { projectId } = req.params;
  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      discription,
    },
    {
      new: true,
    },
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

const deleteMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project deleted successfully"));
});
const getProjects = asyncHandler(async (req, res) => {});
const getProjectById = asyncHandler(async (req, res) => {});
const getProjectMembers = asyncHandler(async (req, res) => {});
const deleteProject = asyncHandler(async (req, res) => {});
const updateMemberRole = asyncHandler(async (req, res) => {});

export {
  addMembersToProject,
  createProject,
  deleteMember,
  getProjects,
  getProjectById,
  getProjectMembers,
  updateProject,
  deleteProject,
  updateMemberRole,
};
