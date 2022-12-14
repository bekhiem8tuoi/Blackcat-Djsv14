const path = require('../../commands/path');
const http = require('http');
const https = require('https');
const qs = require('querystring');
const zlib = require('zlib');
const { URL } = require('url');
const { name, version } = require('../../../../package.json');

const CentraResponse = require('./CentraResponse');

module.exports = class CentraRequest {

	constructor(url, method = 'GET') {
		this.url = typeof url === 'string' ? new URL(url) : url;
		this.httpMethod = method;
		this.data = null;
		this.sendDataAs = null;
		this.reqHeaders = {};
		this.streamEnabled = false;
		this.compressionEnabled = false;
		this.ua = `${name}/${version}`;
		this.coreOptions = {};

		return this;
	}

	query(a1, a2) {
		if (typeof a1 === 'object') {
			Object.keys(a1).forEach(queryKey => {
				this.url.searchParams.append(queryKey, a1[queryKey]);
			});
		} else {
			this.url.searchParams.append(a1, a2);
		}

		return this;
	}

	path(relativePath) {
		this.url.pathname = path.join(this.url.pathname, relativePath);

		return this;
	}

	body(data, sendAs) {
		this.sendDataAs = typeof data === 'object' && !sendAs && !Buffer.isBuffer(data) ? 'json' : sendAs ? sendAs.toLowerCase() : 'buffer';
		this.data = this.sendDataAs === 'form' ? qs.stringify(data) : this.sendDataAs === 'json' ? JSON.stringify(data) : data;

		return this;
	}

	header(a1, a2) {
		if (typeof a1 === 'object') {
			Object.keys(a1).forEach(headerName => {
				this.reqHeaders[headerName.toLowerCase()] = a1[headerName];
			});
		} else {
			this.reqHeaders[a1.toLowerCase()] = a2;
		}

		return this;
	}

	method(method) {
		this.httpMethod = method;

		return this;
	}

	timeout(timeout) {
		this.coreOptions.timeout = timeout;

		return this;
	}

	agent(ua) {
		this.ua = ua;

		return this;
	}

	async json() {
		const res = await this.send();
		return res.json;
	}

	async raw() {
		const res = await this.send();
		return res.body;
	}

	async text() {
		const res = await this.send();
		return res.text;
	}

	send() {
		return new Promise((resolve, reject) => {
			if (this.data) {
				if (!this.reqHeaders.hasOwnProperty('content-type')) {
					if (this.sendDataAs === 'json') this.reqHeaders['content-type'] = 'application/json';

					else if (this.sendDataAs === 'form') this.reqHeaders['content-type'] = 'application/x-www-form-urlencoded';
				}

				if (!this.reqHeaders.hasOwnProperty('content-length')) this.reqHeaders['content-length'] = Buffer.byteLength(this.data);
			}

			this.header('User-Agent', this.ua);

			const options = {
				protocol: this.url.protocol,
				host: this.url.hostname,
				port: this.url.port,
				path: this.url.pathname + this.url.search,
				method: this.httpMethod,
				headers: this.reqHeaders,
				...this.coreOptions
			};

			let req;

			const resHandler = res => {
				let stream = res;

				if (this.compressionEnabled) {
					if (res.headers['content-encoding'] === 'gzip') stream = res.pipe(zlib.createGunzip());

					else if (res.headers['content-encoding'] === 'deflate') stream = res.pipe(zlib.createInflate());
				}

				let centraRes;

				if (this.streamEnabled) {
					resolve(stream);
				} else {
					centraRes = new CentraResponse(res);

					stream.on('error', err => {
						reject(err);
					});

					stream.on('data', chunk => {
						centraRes._addChunk(chunk);
					});

					stream.on('end', () => {
						resolve(centraRes);
					});
				}
			};

			if (this.url.protocol === 'http:') req = http.request(options, resHandler);

			else if (this.url.protocol === 'https:') req = https.request(options, resHandler);

			else throw new Error(`Bad URL protocol: ${this.url.protocol}`);

			req.on('error', err => {
				reject(err);
			});

			if (this.data) req.write(this.data);

			req.end();
		});
	}
};