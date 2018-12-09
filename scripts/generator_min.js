console.log('hello');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./source/data.json', 'utf8'));

let { divisions, districts, upazilas } = obj;

console.log(divisions.length, districts.length, upazilas.length);

let divObj = [];
for (let i = 0; i < divisions.length; i++) {
  let d = divisions[i];
  divObj.push({
    id: d.id,
    name: d.name,
    districts: [],
  });
}

let divObj_nameOnly = [];
for (let i = 0; i < divisions.length; i++) {
  let d = divisions[i];
  divObj_nameOnly.push({
    name: d.name,
  });
}

let disObj = [];
for (let i = 0; i < districts.length; i++) {
  let d = districts[i];
  disObj.push({
    id: d.id,
    name: d.name,
    upazilas: [],
  });
}

let disObj_nameOnly = [];
for (let i = 0; i < districts.length; i++) {
  let d = districts[i];
  disObj_nameOnly.push({
    name: d.name,
  });
}

let upaObj = [];
for (let i = 0; i < upazilas.length; i++) {
  let d = upazilas[i];
  upaObj.push({
    name: d.name,
  });
}

for (let i = 0; i < districts.length; i++) {
  let d = districts[i];
  for (let j = 0; j < divObj.length; j++) {
    if (d.division_id == divObj[j].id)
      divObj[j].districts.push({
        name: d.name,
      });
  }
}

for (let i = 0; i < upazilas.length; i++) {
  let d = upazilas[i];
  for (let j = 0; j < disObj.length; j++) {
    if (d.district_id == disObj[j].id)
      disObj[j].upazilas.push({
        name: d.name,
      });
  }
}

for (let i = 0; i < divObj.length; i++) delete divObj[i].id;
for (let i = 0; i < disObj.length; i++) delete disObj[i].id;

fs.writeFileSync('./out/divisions_min.json', JSON.stringify(divObj), 'utf-8');
fs.writeFileSync(
  './out/divisions_name_only.json',
  JSON.stringify(divObj_nameOnly),
  'utf-8',
);

fs.writeFileSync('./out/districts_min.json', JSON.stringify(disObj), 'utf-8');
fs.writeFileSync(
  './out/districts_name_only.json',
  JSON.stringify(disObj_nameOnly),
  'utf-8',
);

fs.writeFileSync('./out/upazilas_min.json', JSON.stringify(upaObj), 'utf-8');
