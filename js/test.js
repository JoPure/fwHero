/** 
 * 判断浏览器是否支持某一个CSS3属性
 * @param {String} 属性名称
 * @return {Boolean} true/false
 */

function supportCss3(style) {
	var prefix = ['webkit', 'Moz', 'ms', 'o'],
		i,
		humpString = [],
		htmlStyle = document.documentElement.style,
		_toHumb = function(string) {
			return string.replace(/-(\w)/g, function($0, $1) {
				return $1.toUpperCase();
			});
		};

	for (i in prefix)
		humpString.push(_toHumb(prefix[i] + '-' + style));

	humpString.push(_toHumb(style));

	for (i in humpString)
		if (humpString[i] in htmlStyle) return true;

	return false;
}


