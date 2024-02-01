import { updateRoleUser } from "../../api/apiUsers.js";

export default async function handleUpdateRole(idUser, updateRole) {
    await updateRoleUser(idUser, updateRole);
}