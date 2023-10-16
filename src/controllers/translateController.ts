import { Request, Response } from 'express';
import Translation from '../models/translationModel';
import axios from 'axios';
const { Translate } = require('@google-cloud/translate').v2
import * as dotenv from 'dotenv';
dotenv.config();
const CREDENTIALS = require('../../google.json')

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
})

const translateController = {

    async translate(req: Request, res: Response) {
        const { query, source_language, destination_language } = req.query;
        // Check if translation exists in MongoDB
        const trans = await Translation.findOne({
            query,
            source_language,
            destination_language,
        });

        if (trans) {
            return res.json({ translation: trans.translation });
        } else {
            // Use Google Translate API
            try {

                const [translation] = await translate.translate(`${query}`, `${destination_language}`)

                await Translation.create({
                    query,
                    source_language,
                    destination_language,
                    translation,
                });

                return res.json({ translation });
            } catch (error) {
                return res.status(500).json({ error: 'Translation failed' });
            }
        }
    },

};

export default translateController;
