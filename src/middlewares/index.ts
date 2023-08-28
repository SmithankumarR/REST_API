import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.sendStatus(400);
        }

        if (currentUserId.toString() != id) {
            return res.sendStatus(400);
        }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['CHARLIE-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const exisitingUser = await getUserBySessionToken(sessionToken);

        if (!exisitingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: exisitingUser });

        return next();

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error.message });
    }
} 