/* Query String Helper */
const QueryString = (function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  const query_string = {};
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    // If first entry with this name
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === 'string') {
      const arr = [query_string[pair[0]], pair[1]];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
}());

/* Character Counting Helper */
const countChar = function (val) {
  const len = val.value.length;
  if (len > 500) {
    val.value = val.value.substring(0, 500);
  } else {
    $('#charNum').text(len);
  }
};

/* Basic email validation */
const validateEmail = function ($email) {
  if ($email.trim() == '') {
    return false;
  }
  const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailReg.test($email)) {
    return false;
  }
  return true;
};

function WaterMark(box, event, watermark) {
  if (box.value == 0 && event.type == 'blur') {
    box.value = watermark;
  } if (box.value == watermark && event.type == 'focus') {
    box.value = '';
  }
}

function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay) {}
}
