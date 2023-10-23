// not the best implementation but it will work hehe
const xlsx = require('xlsx');

export default function excel(path: string) {
    const sheet: {[id: string]: any} = {};

    try {
        const file = xlsx.readFile(path);
        
        file.SheetNames.forEach((SheetName: string) => {
            let worksheet = file.Sheets[SheetName];
    
            sheet[SheetName] = [];
            let obj: any = {}
            Object.keys(worksheet).forEach((key, i) => {
                if(key.startsWith('A') && !key.startsWith('A1')) {
                    if(typeof worksheet[key].v === 'string') {
                        obj.name = worksheet[key].v.replace(/[^a-zA-Z0-9 ]/g, '');
                    }
                }
                else if(key.startsWith('B') && !key.startsWith('B1')) {
                    if(typeof worksheet[key].v === 'string') {
                        obj.strand = worksheet[key].v;
                    }
                }
                else if(key.startsWith('C') && !key.startsWith('C1')) {
                    if(typeof worksheet[key].v === 'number') {
                        obj.USN = String(worksheet[key].v);
                    }
                    else if(typeof worksheet[key].v === 'string') {
                        const USN = worksheet[key].v.replace('\n', '').trim();
                        obj.USN = USN;
                    }

                    obj.role = 'user';
                    obj.password = '123456'
                    sheet[SheetName].push({...obj});
                    obj = {};
                }
            });
        });
    
        return sheet;
    
    } catch (error) {
        console.log(error);
    }

}
