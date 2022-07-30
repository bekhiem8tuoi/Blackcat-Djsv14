;(function() {
    'use strict';
    
    var slice = Array.prototype.slice
      , toString = Object.prototype.toString
    
    function AsciiTable(name, options) {
      this.options = options || {}
      this.reset(name)
    }
    
    AsciiTable.LEFT = 0
    AsciiTable.CENTER = 1
    AsciiTable.RIGHT = 2
    
    AsciiTable.factory = function(name, options) {
      return new AsciiTable(name, options)
    }
    
    AsciiTable.align = function(dir, str, len, pad) {
      if (dir === AsciiTable.LEFT) return AsciiTable.alignLeft(str, len, pad)
      if (dir === AsciiTable.RIGHT) return AsciiTable.alignRight(str, len, pad)
      if (dir === AsciiTable.CENTER) return AsciiTable.alignCenter(str, len, pad)
      return AsciiTable.alignAuto(str, len, pad)
    }
    
    AsciiTable.alignLeft = function(str, len, pad) {
      if (!len || len < 0) return ''
      if (str === undefined || str === null) str = ''
      if (typeof pad === 'undefined') pad = ' '
      if (typeof str !== 'string') str = str.toString()
      var alen = len + 1 - str.length
      if (alen <= 0) return str
      return str + Array(len + 1 - str.length).join(pad)
    }
    
    AsciiTable.alignCenter = function(str, len, pad) {
      if (!len || len < 0) return ''
      if (str === undefined || str === null) str = ''
      if (typeof pad === 'undefined') pad = ' '
      if (typeof str !== 'string') str = str.toString()
      var nLen = str.length
        , half = Math.floor(len / 2 - nLen / 2)
        , odds = Math.abs((nLen % 2) - (len % 2))
        , len = str.length
    
      return AsciiTable.alignRight('', half, pad) 
        + str
        + AsciiTable.alignLeft('', half + odds, pad)
    }
    
    AsciiTable.alignRight = function(str, len, pad) {
      if (!len || len < 0) return ''
      if (str === undefined || str === null) str = ''
      if (typeof pad === 'undefined') pad = ' '
      if (typeof str !== 'string') str = str.toString()
      var alen = len + 1 - str.length
      if (alen <= 0) return str
      return Array(len + 1 - str.length).join(pad) + str
    }
    
    AsciiTable.alignAuto = function(str, len, pad) {
      if (str === undefined || str === null) str = ''
      var type = toString.call(str)
      pad || (pad = ' ')
      len = +len
      if (type !== '[object String]') {
        str = str.toString()
      }
      if (str.length < len) {
        switch(type) {
          case '[object Number]': return AsciiTable.alignRight(str, len, pad)
          default: return AsciiTable.alignLeft(str, len, pad)
        }
      }
      return str
    }
    
    AsciiTable.arrayFill = function(len, fill) {
      var arr = new Array(len)
      for (var i = 0; i !== len; i++) {
        arr[i] = fill;
      }
      return arr
    }
    
    AsciiTable.prototype.reset = 
    AsciiTable.prototype.clear = function(name) {
      this.__name = ''
      this.__nameAlign = AsciiTable.CENTER
      this.__rows = []
      this.__maxCells = 0
      this.__aligns = []
      this.__colMaxes = []
      this.__spacing = 1
      this.__heading = null
      this.__headingAlign = AsciiTable.CENTER
      this.setBorder()
    
      if (toString.call(name) === '[object String]') {
        this.__name = name
      } else if (toString.call(name) === '[object Object]') {
        this.fromJSON(name)
      }
      return this
    }
    
    AsciiTable.prototype.setBorder = function(edge, fill, top, bottom) {
      this.__border = true
      if (arguments.length === 1) {
        fill = top = bottom = edge
      }
      this.__edge = edge || '|'
      this.__fill = fill || '-'
      this.__top = top || '.'
      this.__bottom = bottom || "'"
      return this
    }
    
    AsciiTable.prototype.removeBorder = function() {
      this.__border = false
      this.__edge = ' '
      this.__fill = ' '
      return this
    }
    
    AsciiTable.prototype.setAlign = function(idx, dir) {
      this.__aligns[idx] = dir
      return this
    }
    
    AsciiTable.prototype.setTitle = function(name) {
      this.__name = name
      return this
    }
    
    AsciiTable.prototype.getTitle = function() {
      return this.__name
    }
    
    AsciiTable.prototype.setTitleAlign = function(dir) {
      this.__nameAlign = dir
      return this
    }
    
    AsciiTable.prototype.sort = function(method) {
      this.__rows.sort(method)
      return this
    }
    
    AsciiTable.prototype.sortColumn = function(idx, method) {
      this.__rows.sort(function(a, b) {
        return method(a[idx], b[idx])
      })
      return this
    }
    
    AsciiTable.prototype.setHeading = function(row) {
      if (arguments.length > 1 || toString.call(row) !== '[object Array]') {
        row = slice.call(arguments)
      }
      this.__heading = row
      return this
    }
    
    AsciiTable.prototype.getHeading = function() {
      return this.__heading.slice()
    }
    
    AsciiTable.prototype.setHeadingAlign = function(dir) {
      this.__headingAlign = dir
      return this
    }
    
    AsciiTable.prototype.addRow = function(row) {
      if (arguments.length > 1 || toString.call(row) !== '[object Array]') {
        row = slice.call(arguments)
      }
      this.__maxCells = Math.max(this.__maxCells, row.length)
      this.__rows.push(row)
      return this
    }
    
    AsciiTable.prototype.getRows = function() {
      return this.__rows.slice().map(function(row) {
        return row.slice()
      })
    }
    
    AsciiTable.prototype.addRowMatrix = function(rows) {
      for (var i = 0; i < rows.length; i++) {
        this.addRow(rows[i])
      }
      return this
    }
    
    AsciiTable.prototype.addData = function(data, rowCallback, asMatrix) {
      if (toString.call(data) !== '[object Array]') {
        return this;
      }
      for (var index = 0, limit = data.length; index < limit; index++) {
        var row = rowCallback(data[index]);
        if(asMatrix) {
          this.addRowMatrix(row);
        } else {
          this.addRow(row);
        }
      }
      return this
    }
    
    AsciiTable.prototype.clearRows = function() {
      this.__rows = []
      this.__maxCells = 0
      this.__colMaxes = []
      return this
    }
    
    AsciiTable.prototype.setJustify = function(val) {
      arguments.length === 0 && (val = true)
      this.__justify = !!val
      return this
    }
    
    AsciiTable.prototype.toJSON = function() {
      return {
        title: this.getTitle()
      , heading: this.getHeading()
      , rows: this.getRows()
      }
    }
    
    AsciiTable.prototype.parse = 
    AsciiTable.prototype.fromJSON = function(obj) {
      return this
        .clear()
        .setTitle(obj.title)
        .setHeading(obj.heading)
        .addRowMatrix(obj.rows)
    }
    
    AsciiTable.prototype.render =
    AsciiTable.prototype.valueOf =
    AsciiTable.prototype.toString = function() {
      var self = this
        , body = []
        , mLen = this.__maxCells
        , max = AsciiTable.arrayFill(mLen, 0)
        , total = mLen * 3
        , rows = this.__rows
        , justify
        , border = this.__border
        , all = this.__heading 
            ? [this.__heading].concat(rows)
            : rows
    
      for (var i = 0; i < all.length; i++) {
        var row = all[i]
        for (var k = 0; k < mLen; k++) {
          var cell = row[k]
          max[k] = Math.max(max[k], cell ? cell.toString().length : 0)
        }
      }
      this.__colMaxes = max
      justify = this.__justify ? Math.max.apply(null, max) : 0
      max.forEach(function(x) {
        total += justify ? justify : x + self.__spacing
      })
      justify && (total += max.length)
      total -= this.__spacing
      border && body.push(this._seperator(total - mLen + 1, this.__top))
      if (this.__name) {
        body.push(this._renderTitle(total - mLen + 1))
        border && body.push(this._seperator(total - mLen + 1))
      }
      if (this.__heading) {
        body.push(this._renderRow(this.__heading, ' ', this.__headingAlign))
        body.push(this._rowSeperator(mLen, this.__fill))
      }
      for (var i = 0; i < this.__rows.length; i++) {
        body.push(this._renderRow(this.__rows[i], ' '))
      }
      border && body.push(this._seperator(total - mLen + 1, this.__bottom))
    
      var prefix = this.options.prefix || ''
      return prefix + body.join('\n' + prefix)
    }
    
    AsciiTable.prototype._seperator = function(len, sep) {
      sep || (sep = this.__edge)
      return sep + AsciiTable.alignRight(sep, len, this.__fill)
    }
    
    AsciiTable.prototype._rowSeperator = function() {
      var blanks = AsciiTable.arrayFill(this.__maxCells, this.__fill)
      return this._renderRow(blanks, this.__fill)
    }
    
    AsciiTable.prototype._renderTitle = function(len) {
      var name = ' ' + this.__name + ' '
        , str = AsciiTable.align(this.__nameAlign, name, len - 1, ' ')
      return this.__edge + str + this.__edge
    }
    
    AsciiTable.prototype._renderRow = function(row, str, align) {
      var tmp = ['']
        , max = this.__colMaxes
    
      for (var k = 0; k < this.__maxCells; k++) {
        var cell = row[k]
          , just = this.__justify ? Math.max.apply(null, max) : max[k]
          , pad = just
          , cAlign = this.__aligns[k]
          , use = align
          , method = 'alignAuto'
      
        if (typeof align === 'undefined') use = cAlign
    
        if (use === AsciiTable.LEFT) method = 'alignLeft'
        if (use === AsciiTable.CENTER) method = 'alignCenter'
        if (use === AsciiTable.RIGHT) method = 'alignRight'
    
        tmp.push(AsciiTable[method](cell, pad, str))
      }
      var front = tmp.join(str + this.__edge + str)
      front = front.substr(1, front.length)
      return front + str + this.__edge
    }
    
    ;['Left', 'Right', 'Center'].forEach(function(dir) {
      var constant = AsciiTable[dir.toUpperCase()]
    
      ;['setAlign', 'setTitleAlign', 'setHeadingAlign'].forEach(function(method) {
        AsciiTable.prototype[method + dir] = function() {
          var args = slice.call(arguments).concat(constant)
          return this[method].apply(this, args)
        }
      })
    })
    
    if (typeof exports !== 'undefined') {
      module.exports = AsciiTable
    } else {
      this.AsciiTable = AsciiTable
    }
    
}).call(this);