function solution(relation) {
    var answer = 0;
    const tuple = { group_by_row: [], group_by_col: [], };
    const unique = function (arr) {
        return arr.filter(function (val, i, self) {
            return self.indexOf(val) === i;
        });  
    };
    const limitation = {
        _isMultiDimesionalSringsArray: function (arr) {
            if (Array.isArray(arr)) {
                for (var values of arr) {
                    if (Array.isArray(values)) {
                        const findNotStr = values.filter(function (item) {
                            return typeof item !== 'string';
                        })
                        
                        if (findNotStr.length >= 1) {
                            return false
                        }
                    } else {
                        return false;
                    }
                }
                
                return true;
            }

            return false;
        },
        _isColValid: function (arr) {
            const firstLength = arr[0].length;
            
            for (var col of arr) {
                if (
                    firstLength !== col.length &&
                    (col.length < 1 || col.length > 8)
                ) {
                    return false;
                }
            }
            
            return true;
        },
        _isRowValid: function (arr) {
            return arr.length >= 1 && arr.length <= 20;
        },
        _isUniqueTuplesName: function (arr) {
            for (var col of arr) {
                if (!unique(col).length === col.length) {
                    return false;
                }
            }
            
            return true;
        },
        validated: function () {
            return this._isMultiDimesionalSringsArray(relation)
                && this._isColValid(relation)
                && this._isRowValid(relation)
                && this._isUniqueTuplesName(relation);
        }
    };
    
    if (!limitation.validated()) {
        throw new Exception('Invalid relation given!');
    }
    
    for (var r = 0; r < relation.length; r++) {
        const col = relation[r];
        for (var c = 0; c < col.length; c++) {
            const temp = [];
            for (var cc = (c+1); cc < col.length; cc++) {
                const val = col[cc];
                if (val) {
                    const val =`${col[c]}|${col[cc]}`; 
                    temp.push(val);
                }
            }
            
            if (Boolean(temp.length)) {
                tuple.group_by_col.push({
                    count: temp.length,
                    values: temp
                });
            }
            
            if (tuple.group_by_row.length !== col.length) {
                tuple.group_by_row.push([])
                for (var i = 0; i < relation.length; i++) {
                    tuple.group_by_row[c].push(relation[i][c]);
                }
            }
        }
    }
    
    // Count unique group of relation by row
    for (var row of tuple.group_by_row) {
        if (row.length === unique(row).length) {
            answer += 1;
        }
    }
    
    tuple.group_by_col = tuple.group_by_col.sort(function (a, b) {
        return b.values.length - a.values.length;
    }).reduce(function(rev, item) {
        if (rev[item.count]) {
            rev[item.count].push(item.values);
        } else {
            rev[item.count] = [];
            rev[item.count].push(item.values);
        }
        
        return rev;
     }, {});
     
     for (const key in tuple.group_by_col) {
         const values = tuple.group_by_col[key];
         
         if (values[0].length > 1) {
            const compares = []
            for (var i = 0; i < values[0].length; i++) {
                const val = values.map(function (item) {
                    return item[i]
                });
                compares.push(`${val.length}-${unique(val).length}`);
            }
            answer += (compares.length === unique(compares).length)
                ? 1
                : 0;
         } else {
            const val = values.map(function (item) {
                return item[0];
            });
            answer += (val.length === unique(val).length)
                ? 1
                : 0;
         }
     }
    
    return answer;
}
