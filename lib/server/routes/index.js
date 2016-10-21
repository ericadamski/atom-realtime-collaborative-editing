'use babel';
/* eslint-disable no-magic-numbers */

import { allowUnsafeEval } from 'loophole';
import Document from '../../document';

const router = allowUnsafeEval(() => require('express')).Router();

router.get('/', (req, res) => res.status(200).json({
    status: 'OK',
    data: Document.instance().data,
}));

export default router;
