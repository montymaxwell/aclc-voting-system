// not the best implementation but it will work hehe
const xlsx = require('xlsx');

const base_obj = {
    USN: '',
    name: '',
    strand: '',
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
                if(key.startsWith('A') && !key.startsWith('A1')) {
                    if(typeof worksheet[key].v === 'string') {
                        obj.name = worksheet[key].v;
                    }
                    if(worksheet[key].v !== 'NAME OF STUDENT') {
                    }
                }
                else if(key.startsWith('B') && !key.startsWith('B1')) {
                    if(typeof worksheet[key].v === 'string') {
                        obj.strand = worksheet[key].v;
                    }
                    if(worksheet[key].v !== 'STRAND') {
                    }
                }
                else if(key.startsWith('C') && !key.startsWith('C1')) {
                    // console.log(`${key} :  ${typeof worksheet[key].v} : ${worksheet[key].v}`)
                    if(typeof worksheet[key].v === 'number') {
                        obj.USN = String(worksheet[key].v);
                        // console.log(Object.values(sheet[SheetName]).find((v: any) => v.USN === String(worksheet[key].v)))
                    }
                    else if(typeof worksheet[key].v === 'string') {
                        const USN = worksheet[key].v.replace('\n', '').trim();
                        obj.USN = USN;

                        // Object.values(sheet[SheetName]).find((v: any) => v.USN === USN)
                    }


                    obj.role = 'user';
                    obj.password = '123456'
                    // console.log(obj);
                    sheet[SheetName].push({...obj});
                    obj = {};
                    if(worksheet[key].v !== 'USN') {
                        // console.log(typeof worksheet[key].v)

                    }
                }
                // else if(Object.keys(obj).length > 0) {
                //     obj.role = 'user';
                //     obj.password = '123456'
                //     console.log(obj);
                //     sheet[SheetName].push({...obj});
                //     obj = {};
                // }
            });

        })
    
        // console.log(sheet)
    
        return sheet;
    
    } catch (error) {
        console.log(error);
    }

}
