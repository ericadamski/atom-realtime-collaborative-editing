'use babel';
/* eslint-disable no-magic-numbers */

import { allowUnsafeEval } from 'loophole';

const router = allowUnsafeEval(() => require('express')).Router();

router.get('/', (req, res) => res.status(200).json({ status: 'OK' }));

export default router;
