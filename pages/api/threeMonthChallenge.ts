import {getDownloadURL, ref} from '@firebase/storage';
import {collection, doc, getDoc, getDocs} from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';
import type {NextApiRequest, NextApiResponse} from 'next';

import {firebaseApp, firebaseDb} from '../../firebase';

export interface ThreeMonthChallengeData {
    challenge: {
        days: number;
        daysFailed: number[];
        daysPassed: number[];
        startDate: {
            seconds: number;
            nanoseconds: number;
        };
    };
    gifts: Array<{
        title: string;
        image: string;
        level: number;
        link: string;
        winDay?: number;
        winDate?: number;
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
            getDocs(
                collection(firebaseDb, 'three-month-challenge-prizes'),
            ).then((c) => {
                const storage = getStorage(firebaseApp);
                console.log(
                    ref(storage, 'three-month-challenge-prizes/helix.webp'),
                );

                return Promise.all(
                    c.docs.map((doc) => {
                        return getDownloadURL(
                            ref(storage, doc.data().image),
                        ).catch(console.error);
                    }),
                ).then((urls) =>
                    c.docs.map((cc, idx) => ({
                        ...cc.data(),
                        image: urls[idx],
                    })),
                );
            }),
        ]);
        res.json({
            challenge: challenge.data() as ThreeMonthChallengeData['challenge'],
            gifts: prizes as ThreeMonthChallengeData['gifts'],
        });
    } catch (error) {
        res.json({error});
    }
};
