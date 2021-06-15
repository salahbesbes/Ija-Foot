let data = [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}, {uid: '5'}];

const res = data.filter(el => el.uid != '3' && el);
console.log(res);
