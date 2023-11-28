module.exports = function (data) {
    let interested = [];
    if (data.buyer.isInterestedInAHouse === 'Yes') interested.push('house')
    if (data.buyer.isInterestedInATownhome === 'Yes') interested.push('townhome')
    if (data.buyer.isInterestedInACondo === 'Yes') interested.push('condo')
    if (data.buyer.isInterestedInAMultifamily === 'Yes') interested.push('multifamily')
    if (interested.length === 1) return interested[0]; 
    if (interested.length === 2) return `${interested[0]} or ${interested[1]}`; 
    if (interested.length === 3) return `${interested[0]}, ${interested[1]}, or ${interested[2]}`;
    if (interested.length === 4) return `${interested[0]}, ${interested[1]}, ${interested[2]}, or ${interested[3]}`; 
}
