import { getData } from "./apiData.js";

const ROLE_URL = 'roles';

export async function getRole(id = '') {
    const roles = await getData(`${ROLE_URL}/${id}`);

    return roles;
}