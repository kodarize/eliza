(function() {
var pubnub = new PubNub({
    publishKey: 'pub-c-f2898733-e2c1-477e-8aa1-eec49788713c',
    subscribeKey: 'sub-c-b5254976-9a07-449d-978b-09c02aef0109',
    userId: 'TheCollective'
});
function $(id) {
    return document.getElementById(id);
}
var box = $('box'),
input = $('input'),
channel = '00';
pubnub.addListener({
    message: function(obj) {
        box.innerHTML = box.innerHTML + ('' + obj.message).replace(/[<>]/g, '') + '<br>';
        box.scrollTop = box.scrollHeight;
    }
});
pubnub.subscribe({
    channels: [channel]
});
input.addEventListener('keyup', function(e) {
    if ((e.keyCode || e.charCode) === 13) {
        pubnub.publish({
            channel: channel,
            message: input.value,
            x: (input.value = '')
        });
    }
});
})();