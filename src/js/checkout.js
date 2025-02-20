import { getParam, loadHeaderFooter } from './utils.mjs';

import {checkoutProcess} from './checkoutProcess.mjs';

const checkoutProcess = getParam('checkoutProcess');

loadHeaderFooter();

checkoutProcess.init();

