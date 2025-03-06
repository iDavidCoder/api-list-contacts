import { readFile, writeFile } from "fs/promises";

const fileName = './data/list.txt';

export const getContacts = async () => {
    let getList: string[] = [];
    const data = await readFile(fileName, 'utf8');
    getList = data.trim().split('\n');
    return getList;
};

export const createContacts = async (name: string) => {
    let getList = await getContacts();
    getList.push(name);
    await writeFile(fileName, getList.join('\n'));
};

export const check = async (name: string) => {
    let getList = await getContacts();
    const deleteContact = getList.filter(line => line.toLowerCase() !== (name as string).toLowerCase());
    return deleteContact;
}

export const deleteContacts = async (name: string) => {
    let okContact = await check(name);
    const newList = okContact.join('\n');
    await writeFile(fileName, newList);
};