// not the best implementation but it will work hehe
const xlsx = require('xlsx');

const base_obj = {
    USN: '',
    firstname: '',
    lastname: '',
    middleInitial: '',
}

declare type Data = {
    USN: string,
    firstname: string,
    lastname: string,
    middleInitial: string,
}

function getShortStrand(strand: string) {
    return strand.split(" ")[0]
}

export default function excel(path: string) {
    const sheet: {[id: string]: any} = {};

    try {
        const file = xlsx.readFile(path);
        
        file.SheetNames.forEach((SheetName: string) => {
            let worksheet = file.Sheets[SheetName];
    
            sheet[SheetName] = [];
            let obj: any = {}
            Object.keys(worksheet).forEach((key, i) => {
                if(key.startsWith('B')) {
                    if(worksheet[key].v !== 'LAST NAME') {
                        if(typeof worksheet[key].v === 'string') {
                            obj.lastname = worksheet[key].v;
                        }
                    }
                }
                else if(key.startsWith('C')) {
                    if(worksheet[key].v !== 'FIRST NAME') {
                        if(typeof worksheet[key].v === 'string') {
                            obj.firstname = worksheet[key].v;
                        }
                    }
                }
                else if(key.startsWith('D')) {
                    if(worksheet[key].v !== 'M.I') {
                        if(typeof worksheet[key].v === 'string') {
                            obj.middleInitial = worksheet[key].v;
                        }
                    }
                }
                else if(key.startsWith('F')) {
                    if(worksheet[key].v !== 'USN') {
                        if(typeof worksheet[key].v === 'number') {
                            obj.USN = String(worksheet[key].v);
                        }
                    }
                }
                else if(Object.keys(obj).length === Object.keys(base_obj).length) {
                    if(SheetName === 'Sheet1') {
                        obj.strand = 'TVL';
                    }
                    else if(SheetName.includes('BSIT')) {
                        obj.strand = SheetName.slice(0, 4);
                    }
                    else if(SheetName.includes('ACT') || SheetName.includes('BSE')) {
                        obj.strand = SheetName.slice(0, 3);
                    }
                    else {
                        obj.strand = getShortStrand(SheetName);
                    }

                    obj.role = 'user';
                    obj.password = '123456'
                    sheet[SheetName].push({...obj});
                    obj = {};
                }
            });

        })
    
    
        return sheet;
    
    } catch (error) {
        console.log(error);
    }

}
