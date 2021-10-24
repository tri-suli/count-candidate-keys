function solution(relation) {
    var answer = 0;
    const tuple = { group_by_row: [], group_by_col: [], };
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
            const unique = function (arr) {
                return arr.filter(function (val, i, self) {
                    return self.indexOf(val) === i;
                }).length === arr.length
            };
            
            for (var col of arr) {
                if (!unique(col)) {
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
                    temp.push(val)
                }
            }
            
            if (Boolean(temp.length)) {
                tuple.group_by_col.push(temp)
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
        const unique = row.filter(function (val, i, self) {
            return self.indexOf(val) === i;
        });
        
        if (row.length === unique.length) {
            answer += 1;
        }
    }
    
    // Count unique group of relation by col
    tuple.group_by_col.sort(function (a, b) {
        return b.length - a.length;
    })
    nextLoop: for (var r = 0; r < tuple.group_by_col.length; r++) {
        const next = tuple.group_by_col[r+1];
        const cols = tuple.group_by_col.filter(function (item) {
            return item.length === tuple.group_by_col[r].length;
        });
        
        if (!next && (tuple.group_by_col[tuple.group_by_col.length-1] !== cols[0].length)) {
            const unique = cols.filter(function (val, i, self) {
                return self.indexOf(val) === i;
            }).length;
            answer += (cols.length === unique.length) ? 1 : 0;
        } else if (next.length !== cols[0].length) {
            for (var i = 0; i < cols.length; i++) {
                const col = cols[i]
                console.log(col);
                // for (var i = 0; i < col.length; i++) {
                // }
            }
        }
        
        continue nextLoop;
    }
    
    return answer;
}

console.log(
    solution([
        ["100","spiderman","music", "2"],
        ["200","ironman","math","2",],
        ["300","superman","computer","3"],
        ["400","batman","computer","4"],
        ["500","hulk","music","3"],
        ["600","ironman","music","2"],
    ])
);

// console.log(
//     solution([
//         ["100", "ironman", "music", "2"],
//         ["100", "ironman", "math", "2"],
//         ["300", "superman", "computer", "3"],
//         ["300", "superman", "computer", "4"],
//         ["500", "hulk", "music", "3"],
//         ["600", "ironman", "music", "2"]
//     ])
// );
