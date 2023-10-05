const xlsx = require('xlsx');
const path = require('path');

const file = xlsx.readFile(path.join(__dirname, './data/candidates.csv'));
const prisma = require('@prisma/client')

const db = new prisma.PrismaClient({
    datasourceUrl: "db_url"
});

const Collection = [];
file.SheetNames.forEach(SheetName => {
    let worksheet = file.Sheets[SheetName];

    let obj = {}
    Object.keys(worksheet).forEach((key, i) => {
        if(key.startsWith('B')) {
            obj.firstname = worksheet[key].v;
        }
        else if(key.startsWith('C')) {
            obj.lastname = worksheet[key].v;
        }
        else if(key.startsWith('D')) {
            obj.middleInitial = worksheet[key].v;
        }
        else if(key.startsWith('E')) {
            obj.icon = worksheet[key].v;
        }
        else if(key.startsWith('F')) {
             obj.party = worksheet[key].v;
        }
        else if(key.startsWith('G')) {
            obj.position = worksheet[key].v;
        }
        else if(key.startsWith('H')) {
            obj.votes = Number(worksheet[key].v);
        }
        
        if(Object.keys(obj).length > 6) {
            obj.id = `${obj.firstname} ${obj.middleInitial} ${obj.lastname}`
            console.log(obj.id);
            Collection.push(obj);
            obj = {}
        }
        // if(key !== 'A1' || 'B1' || 'C1' || 'D1' || 'E1' || 'F1' || 'G1' || 'H1') {

        // };
    });

    Collection.splice(0, 1);

})

db.candidates.createMany({ data: Collection }).then(res => {
    console.log(res);
})