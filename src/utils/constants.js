export const UserRoleEnum = {
  ADMIN: "adim",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const AvalilableRole = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
  TODO: "toda",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};
export const AvalilableTaskStatus = Object.values(TaskStatusEnum);
