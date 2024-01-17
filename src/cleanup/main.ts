import * as core from '@actions/core';
import {cleanup} from '~/cleanup/index.ts';

(async function () {
	try {
		await cleanup();
	} catch (error) {
		core.setFailed(`Action failed with error ${error}`); // eslint-disable-line @typescript-eslint/restrict-template-expressions
	}
})();
