//Toast提示
export function Toast(msg, duration) {
    duration = isNaN(duration) ? 2000 : duration;
    const m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.7; height:80px; color:#fff; line-height:80px; text-align:center; border-radius:5px;font-size:20px; position:fixed; top:40%; left:20%; z-index:999; font-weight:bold;";
    document.body.appendChild(m);
    setTimeout(function () {
        const d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m)
        }, d * 1000);
    }, duration);
}
export function Toast2(msg, duration) {
    duration = isNaN(duration) ? 2000 : duration;
    const m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "width:60%; min-width:150px; background:#000; opacity:0.7; height:80px; color:#fff; line-height:40px; text-align:center; border-radius:5px;font-size:20px; position:fixed; top:40%; left:20%; z-index:999; font-weight:bold;";
    document.body.appendChild(m);
    setTimeout(function () {
        const d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m)
        }, d * 1000);
    }, duration);
}