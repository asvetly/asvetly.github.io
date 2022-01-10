import {collection, doc, getDoc, getDocs} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import {firebaseDb} from '../../firebase';

export interface ThreeMonthChallengeData {
    challenge: {
        days: number;
        daysFailed: number[];
        daysPassed: number[];
        startDate: Date;
    };
    gifts: Array<{
        title: string;
        image: string;
        level: number;
        link: string;
    }>;
}

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        const [challenge, prizes] = await Promise.all([
            getDoc(
                doc(
                    firebaseDb,
                    'three-month-challenge',
                    'cw5tG9lxNzCZ6yggmTlW',
                ),
            ),
            getDocs(collection(firebaseDb, 'three-month-challenge-prizes')),
        ]);
        res.json({
            challenge: challenge.data() as ThreeMonthChallengeData['challenge'],
            gifts: prizes.docs.map((doc) =>
                doc.data(),
            ) as ThreeMonthChallengeData['gifts'],
        });
    } catch (error) {
        res.json({error});
    }
};
