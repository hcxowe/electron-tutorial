const electron = require('electron')
const $ = require('jquery')
const _ = require('lodash')
const {
    ipcRenderer
} = electron

$(function() {
    $(document).on('mousemove', _.throttle(function(e) {
        let {x, y} = electron.screen.getCursorScreenPoint()
        $('#mouseLabel').text(`x: ${x}, y: ${y}`)
    }, 100))

    $('#btnLoad').click((evt) => {
        ipcRenderer.sendSync('loadurl', $('#btnLoad').prev().val())
    })
})