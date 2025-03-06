import express from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = express.Router();

const fileName = './data/list.txt';

router.post('/createContact', async (req, res) => {
    const { name } = req.body;
    console.log(`Informado nome, ${name} na createContact`);

    if (!name || name.lenght < 2) {
        res.json({error: "Você deve informar pelo menos dois caracteres."});
        return;
    }

    let list: string[] = [];

    try {
        const data = await readFile(fileName, 'utf8');
        list = data.split('\n');
    } catch (error) {
        res.json({error: "Ocorreu um erro, contate o administrador."});
        return;
    }

    list.push(name);
    try {
        await writeFile(fileName, list.join('\n'));
        res.status(200).json({sucess: `Contato ${name} criado com sucesso.`});
    } catch {
        res.json({error: "Ocorreu um erro durante o salvamento."});
        return;
    }

});

router.get('/getContact', async (req, res) => {
    let getList: string[] = [];

    try {
        const getContact = await readFile(fileName, 'utf8');
        getList = getContact.split('\n');
        res.json(getList);
    } catch (error) {
        res.json({error: "Ocorreu um erro na busca."});
        return;
    }
});

router.delete('/deleteContact', async (req, res) => {
    const { name } = req.query;
    console.log(name)

    let getList: string[] = [];

    if(!name) {
        res.json("A query não contém um nome.");
        return;
    }

    try {
        const getContact = await readFile(fileName, 'utf8');
        getList = getContact.trim().split('\n');
        console.log(getList)
    } catch {
        res.json({error: "Ocorreu um erro em ler a lista de contatos."})
        return;
    }

    const deleteContact = getList.filter(line => line.toLowerCase() !== (name as string).toLowerCase());


    if (getList.length === deleteContact.length) {
        res.json({error: "Contato não encontrado"});
        return;
    }

    try {
        const newList = deleteContact.join('\n');
        await writeFile(fileName, newList);
        res.json({sucess: "Contato foi deletado com sucesso."});
    } catch (error) {
        res.json({error: "Contato não foi deletado, houve um erro."});
        return;
    }
});

export default router;