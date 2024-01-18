import * as fs from 'node:fs';
import * as process from 'node:process';
import * as core from '@actions/core';
import * as io from '@actions/io';

async function cleanup(): Promise<void> {
	const skip = core.getBooleanInput('skip_install', {required: true});
	if (skip) {
		core.debug('Skipping cleanup: skip_install is true');
		return;
	}

	if (!(await io.which('asdf', false))) {
		core.debug('Skipping cleanup: asdf not found');
		return;
	}

	await core.group('Cleanup', async () => {
		const asdfDataDir = process.env.ASDF_DATA_DIR;
		if (asdfDataDir && fs.existsSync(asdfDataDir)) {
			core.debug(`Removing ${asdfDataDir}`);
			await io.rmRF(asdfDataDir);
		}

		const asdfDir = process.env.ASDF_DIR;
		if (asdfDir && fs.existsSync(asdfDir)) {
			core.debug(`Removing ${asdfDir}`);
			await io.rmRF(asdfDir);
		}
	});
}

export {cleanup};
