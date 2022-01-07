import type { NextApiRequest, NextApiResponse } from 'next'
import {doc, getDoc} from "firebase/firestore/lite";
import {firebaseDb} from "../../firebase";

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
    const id = req.query.c as string;
    if (!id) return;

    getDoc(doc(firebaseDb, 'new-year-gifts', id))
        .then(doc => { res.json(doc.data()); })
        .catch((error) => { res.json({ error }); });
}
