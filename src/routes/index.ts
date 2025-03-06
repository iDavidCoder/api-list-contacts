import express from 'express';
import { check, createContacts, deleteContacts, getContacts } from '../services/contact';

const router = express.Router();

router.post('/createContact', async (req, res) => {
    const { name } = req.body;

    if (!name || name.lenght < 2) { res.json({error: "Você deve informar pelo menos dois caracteres."}); return; }

    try {
        await createContacts(name);
        res.status(200).json({sucess: `Contato ${name} criado com sucesso.`});
    } catch {
        res.json({error: "Ocorreu um erro durante o salvamento."});
        return;
    }
});

router.get('/getContact', async (req, res) => {
    try {
        res.json(await getContacts());
    } catch (error) {
        res.json({error: "Ocorreu um erro na busca."});
        return;
    }
});

router.delete('/deleteContact', async (req, res) => {
    const { name } = req.query;

    if(!name) { res.json("A query não contém um nome."); return; }

    let getList = await getContacts();
    let getContact = await check((name as string));

    if (getList.length === getContact.length) { res.json({error: "Contato não encontrado"}); return; }

    console.log(name);

    try {
        await deleteContacts((name as string));
        res.json({sucess: "Contato foi deletado com sucesso."});
    } catch (error) {
        res.json({error: "Contato não foi deletado, houve um erro."});
        return;
    }
});

export default router;