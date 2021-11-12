//配置文件
const config = require('./config');



//请求类
class HTTP {
	request({
		url,
		data = {},
		method = 'GET' //默认为get请求
	}) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method);
		})
	}

	_request(url, resolve, reject, data = {}, method = 'GET') {
			wx.request({
				url: config.baseUrl + url,
				data: data,
				method: method,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					console.log(config.baseUrl + url + ' 请求成功');
						resolve(res.data);
						return;
				},
				fail: () => {
					console.log(config.baseUrl + url + ' 请求失败');
					wx.showToast({
						title: '无法连接到服务器',
						icon : 'none',
						duration : 2000
					})
				}
			})
		
	}

	

}

export {
	HTTP
}