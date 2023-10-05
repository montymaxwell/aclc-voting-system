// not the best implementation but it will work hehe
const xlsx = require('xlsx');

const base_obj = {
    USN: '',
    firstname: '',
    lastname: '',
    middleInitial: '',
}

function getShortStrand(strand) {
    return strand.split(" ")[0]
}

export default function excel(path) {
    try {
        const file = xlsx.readFile(path);
        
        const Collection = [];
        file.SheetNames.forEach(SheetName => {
            const sheet = {};
            let worksheet = file.Sheets[SheetName];
    
            sheet[SheetName] = [];
            let obj = {}
            Object.keys(worksheet).forEach((key, i) => {
                if(key.startsWith('B')) {
                    obj.lastname = worksheet[key].v;
                }
                else if(key.startsWith('C')) {
                    obj.firstname = worksheet[key].v;
                }
                else if(key.startsWith('D')) {
                    obj.middleInitial = worksheet[key].v;
                }
                else if(key.startsWith('F')) {
                    obj.USN = worksheet[key].v;
                }
                else if(Object.keys(obj).length === Object.keys(base_obj).length) {
                    obj.strandFull = SheetName;
                    obj.strand = getShortStrand(SheetName);
                    sheet[SheetName].push({...obj});
                    obj = {};
                }
            });
    
            Collection.push(sheet);
        })
    
    
        return Collection;
    
    } catch (error) {
        console.log(error);
    }

}
