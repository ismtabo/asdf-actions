import * as fs from 'node:fs/promises';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {pluginsAdd} from '~/plugins-add/index.ts';

async function toolsInstall(): Promise<void> {
	await pluginsAdd();

	const before = core.getInput('before_install', {required: false});
	if (before) {
		await exec.exec('bash', ['-c', before]);
	}

	const order = core.getInput('order', {required: false}) ?? 'default';

	if (order === 'appearance') {
		core.debug('Installing tools in appearance order');
		const toolsVersions = await fs.readFile('.tool-versions', 'utf8');

		const tools = toolsVersions
			.split('\n')
			.filter(Boolean)
			.map(tool => tool.split(' ', 2)[0]);

		for (const tool of tools) {
			core.debug(`Installing ${tool}...`);
			await exec.exec('asdf', ['install', tool]); // eslint-disable-line no-await-in-loop
		}

		return;
	}

	await exec.exec('asdf', ['install']);
}

export {toolsInstall};
