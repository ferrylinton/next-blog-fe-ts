module.exports = {
	apps: [{
		"name": "blogfe",
		"script": "./node_modules/next/dist/bin/next",
		"instances": 1,
		"exec_mode": "fork",
		"args": "start --port=3002 --hostname=0.0.0.0",
		"max_restarts": 4,
		"min_uptime": 60000,
		"restart_delay": 10000
	}]
}
