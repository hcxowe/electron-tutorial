const electron = require('electron')
const $ = require('jquery')
const _ = require('lodash')

$(function() {
    $(document).on('mousemove', _.throttle(function(e) {
        let {x, y} = electron.screen.getCursorScreenPoint()
        $('#mouseLabel').text(`x: ${x}, y: ${y}`)
    }, 100))
})