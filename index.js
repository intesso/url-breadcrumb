module.exports = function breadcrumb(url, opts) {

  // options
  opts = opts || {};
  opts.home = opts.home || '⌂';
  opts.endingSlash = opts.endingSlash || false;
  opts.beautify = opts.beautify || function(str) {
    return str.replace(/[-_]/g, ' ');
  }

  // extract url path (without querystring and without hash)
  var urlPath = url.split(/[?#]/)[0];
  // split segments by slash and filter empty elements
  var segments = urlPath.split('/').filter(Boolean);
  // add first element for `home` element
  segments.unshift('');

  // enhance segments array
  return segments.map(function(crumb, i, arr) {
    // join the segments array up to the actual element with slash
    var p = arr.slice(0, i + 1).join('/');
    if (opts.endingSlash) {
      // the last element must get the ending slash back, if it was there originally (lost during split)
      // every higher path segment must get an ending slash.
      if (i < arr.length - 1 || urlPath.endsWith('/')) p += '/';
    } else {
      // the first element must always be a slash
      if (i == 0) p = '/';
    }
    // the first element must get the `home` name, every other element must be uri decoded
    crumb = (i == 0) ? opts.home : decodeURIComponent(crumb);
    return {
      name: crumb,
      NAME: opts.beautify(crumb),
      url: p
    }
  });

}