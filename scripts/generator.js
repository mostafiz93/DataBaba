console.log('hello');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let { divisions, districts, upazilas } = obj;

console.log(divisions.length, districts.length, upazilas.length);

let divObj = [];
for (let i = 0; i < divisions.length; i++) {
  let d = divisions[i];
  divObj.push({
    id: d.id,
    name_en: d.name,
    name_bn: d.bn_name,
    districts: [],
  });
}

let disObj = [];
for (let i = 0; i < districts.length; i++) {
  let d = districts[i];
  disObj.push({
    id: d.id,
    name_en: d.name,
    name_bn: d.bn_name,
    lon: d.lon,
    lat: d.lat,
    website: d.website,
    upazilas: [],
  });
}

let upaObj = [];
for (let i = 0; i < districts.length; i++) {
  let d = upazilas[i];
  upaObj.push({
    id: d.id,
    name_en: d.name,
    name_bn: d.bn_name,
    lon: d.lon,
    lat: d.lat,
    website: d.website,
  });
}

for (let i = 0; i < districts.length; i++) {
  let d = districts[i];
  for (let j = 0; j < divObj.length; j++) {
    if (d.division_id == divObj[j].id)
      divObj[j].districts.push({
        id: d.id,
        name_en: d.name,
        name_bn: d.bn_name,
      });
  }
}

for (let i = 0; i < upazilas.length; i++) {
  let d = upazilas[i];
  for (let j = 0; j < disObj.length; j++) {
    if (d.district_id == disObj[j].id)
      disObj[j].upazilas.push({
        id: d.id,
        name_en: d.name,
        name_bn: d.bn_name,
      });
  }
}

console.log(divObj);

fs.writeFileSync('./out_divisions.json', JSON.stringify(divObj), 'utf-8');
fs.writeFileSync('./out_districts.json', JSON.stringify(disObj), 'utf-8');
fs.writeFileSync('./out_upazilas.json', JSON.stringify(upaObj), 'utf-8');
