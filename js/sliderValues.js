function leftPad(length, str) {
  if (this.length >= length) {
    return this;
  }
  str = str || ' ';
  return (new Array(Math.ceil((length - this.length) / str.length) + 1).join(str)).substr(0, (length - this.length)) + this;
}

const sliderValue = {
  range: true,
  min: 0,
  max: 637000,
  slide: function (e, ui) {
    var fromMins = Math.floor(ui.values[0] / 60000);
    var fromSeconds = Math.floor(ui.values[0] / 1000) - (fromMins * 60);
    var fromMilliseconds = ui.values[0] - (fromMins * 60000) - (fromSeconds * 1000);

    if (fromMins.toString().length == 1) fromMins = '0' + fromMins;
    if (fromSeconds.toString().length == 1) fromSeconds = '0' + fromSeconds;
    fromMilliseconds = leftPad.call(String(fromMilliseconds), 3, '0');

    $('#' + this.id + 'From').html(fromMins + ':' + fromSeconds + ':' + fromMilliseconds);

    var toMins = Math.floor(ui.values[1] / 60000);
    var toSeconds = Math.floor(ui.values[1] / 1000) - (toMins * 60);
    var toMilliseconds = ui.values[1] - (toMins * 60000) - (toSeconds * 1000);

    if (toMins.toString().length == 1) toMins = '0' + toMins;
    if (toSeconds.toString().length == 1) toSeconds = '0' + toSeconds;
    toMilliseconds = leftPad.call(String(toMilliseconds), 3, '0');

    $('#' + this.id + 'To').html(toMins + ':' + toSeconds + ':' + toMilliseconds);
  }
};